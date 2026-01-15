"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Trash2, Edit, Eye, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

interface Resume {
  _id: string
  title: string
  position: string
  description: string
  fileUrl: string
  thumbnail?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ResumeManagerPage() {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [newResume, setNewResume] = useState({
    title: '',
    position: '',
    description: ''
  })
  const { toast } = useToast()
  const { authFetch } = useAuth()

  // Fetch resumes on mount
  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await authFetch('/api/admin/resumes')
      const data = await res.json()
      setResumes(data)
    } catch (error) {
      console.error('Failed to fetch resumes:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch resumes',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    setUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'resume')

    try {
      // First upload the file
      const uploadRes = await authFetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || 'Failed to upload file')
      }

      // Then create the resume record
      const createRes = await authFetch('/api/admin/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newResume,
          fileUrl: uploadData.url
        })
      })
      const createData = await createRes.json()

      if (!createRes.ok) {
        throw new Error(createData.error || 'Failed to create resume')
      }

      setResumes(prev => [createData, ...prev])
      setNewResume({ title: '', position: '', description: '' })
      toast({
        title: 'Success',
        description: 'Resume uploaded successfully',
        variant: 'default'
      })
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await authFetch(`/api/admin/resumes/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Failed to delete resume')
      }

      setResumes(prev => prev.filter(resume => resume._id !== id))
      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
        variant: 'default'
      })
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete resume',
        variant: 'destructive'
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resume Manager</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Resume Templates</span>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <Button asChild disabled={uploading}>
                <label htmlFor="resume-upload" className="cursor-pointer">
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </>
                  )}
                </label>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Resume Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Resume Title"
                value={newResume.title}
                onChange={(e) => setNewResume(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="Position/Role"
                value={newResume.position}
                onChange={(e) => setNewResume(prev => ({ ...prev, position: e.target.value }))}
              />
              <Textarea
                placeholder="Description"
                value={newResume.description}
                onChange={(e) => setNewResume(prev => ({ ...prev, description: e.target.value }))}
                className="md:col-span-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <Card key={resume._id}>
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded mb-2">
                    {resume.thumbnail && (
                      <img
                        src={resume.thumbnail}
                        alt={resume.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold">{resume.title}</h3>
                  <p className="text-sm font-medium text-green-600">{resume.position}</p>
                  <p className="text-sm text-gray-500 mt-1">{resume.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" asChild>
                      <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" /> Preview
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() => handleDelete(resume._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 