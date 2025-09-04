"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { FileText, Download, Trash2 } from "lucide-react"
import DocumentUploader from "./document-uploader"
import { supabase, type Database } from "@/lib/supabase"

type Document = Database['public']['Tables']['media']['Row']

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; document: Document | null }>({ open: false, document: null })

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching documents:', error)
        return
      }

      setDocuments(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (file: File) => {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      if (!fileExtension || !['pdf', 'xlsx'].includes(fileExtension)) {
        alert('Only PDF and XLSX files are allowed')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      const formData = new FormData()
      formData.append('data', file)

      const uploadResponse = await fetch('https://n8n.inventrackbetest.site/webhook/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      fetchDocuments()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to upload file')
    }
  }

  const handleDeleteClick = (document: Document) => {
    setDeleteDialog({ open: true, document })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.document) return

    try {
      const deleteResponse = await fetch(`https://n8n.inventrackbetest.site/webhook/b1142f0c-71eb-4e79-9ee6-f66e0f80e107/delete/${deleteDialog.document.id}`, {
        method: 'POST'
      })

      if (!deleteResponse.ok) {
        throw new Error('Delete API call failed')
      }

      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', deleteDialog.document.id)

      if (error) {
        console.error('Delete error:', error)
        alert('Failed to delete document from database')
        return
      }

      setDeleteDialog({ open: false, document: null })
      fetchDocuments()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to delete document')
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, document: null })
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = fileName
    a.click()
  }

  return (
    <div className="p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage your uploaded documents</p>
        </div>
        <DocumentUploader onUpload={handleUpload} />
      </div>

      <Card className="bg-card/70 backdrop-blur-sm border-border/30 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading documents...
                </TableCell>
              </TableRow>
            ) : (
              documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium">{document.file_name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {document.file_type}
                    </span>
                  </TableCell>
                  <TableCell>{document.file_size}</TableCell>
                  <TableCell>{new Date(document.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(document.file_url, document.file_name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClick(document)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {!loading && documents.length === 0 && (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No documents</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by uploading your first document. Only PDF and XLSX files up to 10MB are allowed.
            </p>
          </div>
        )}
      </Card>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteDialog.document?.file_name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}