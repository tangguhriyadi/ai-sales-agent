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
  onUpload: (file: File, name: string) => void
}

export default function DocumentUploader({ onUpload }: DocumentUploaderProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name.split('.')[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile && fileName.trim()) {
      onUpload(selectedFile, fileName)
      setSelectedFile(null)
      setFileName("")
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setFileName("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
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
                accept=".pdf,.doc,.docx,.txt,.md"
                className="flex-1"
              />
              {selectedFile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium">Document Name</label>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter document name"
              className="mt-2"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || !fileName.trim()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}