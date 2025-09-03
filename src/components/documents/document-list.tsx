"use client"

import { useState } from "react"
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
import { FileText, Download, Trash2 } from "lucide-react"
import DocumentUploader from "./document-uploader"

interface Document {
  id: string
  name: string
  size: string
  type: string
  uploadedAt: Date
}

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Sales Report Q4",
      size: "2.3 MB",
      type: "PDF",
      uploadedAt: new Date("2024-01-15")
    },
    {
      id: "2",
      name: "Product Specification",
      size: "1.8 MB",
      type: "DOCX",
      uploadedAt: new Date("2024-01-10")
    },
    {
      id: "3",
      name: "Meeting Notes",
      size: "0.5 MB",
      type: "TXT",
      uploadedAt: new Date("2024-01-08")
    }
  ])

  const handleUpload = (file: File, name: string) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      name,
      size: `${Math.round(file.size / 1024 / 1024 * 10) / 10} MB`,
      type: file.name.split('.').pop()?.toUpperCase() || "Unknown",
      uploadedAt: new Date()
    }
    setDocuments(prev => [newDocument, ...prev])
  }

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
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
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell className="font-medium">{document.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium">
                    {document.type}
                  </span>
                </TableCell>
                <TableCell>{document.size}</TableCell>
                <TableCell>{document.uploadedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(document.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {documents.length === 0 && (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No documents</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by uploading your first document.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}