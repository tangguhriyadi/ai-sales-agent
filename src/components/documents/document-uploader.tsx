"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Upload, X } from "lucide-react"

interface DocumentUploaderProps {
  onUpload: (file: File) => void
}

export default function DocumentUploader({ onUpload }: DocumentUploaderProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      if (!fileExtension || !['pdf', 'xlsx'].includes(fileExtension)) {
        alert('Only PDF and XLSX files are allowed')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true)
      await onUpload(selectedFile)
      setSelectedFile(null)
      setUploading(false)
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer hover:cursor-pointer">
          <Plus className="h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select File</label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.xlsx"
                className="flex-1"
                disabled={uploading}
              />
              {selectedFile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer hover:cursor-pointer"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Only PDF and XLSX files up to 10MB are allowed
            </p>
          </div>
          
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="cursor-pointer hover:cursor-pointer" onClick={handleCancel} disabled={uploading}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="flex items-center gap-2 cursor-pointer hover:cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}