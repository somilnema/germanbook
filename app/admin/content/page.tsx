"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Trash2, Edit, Eye, Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Template {
  _id: string
  name: string
  title: string
  position: string
  description: string
  url: string
  thumbnail?: string
}

interface Video {
  _id: string
  title: string
  category: string
  description: string
  url: string
  thumbnail?: string
}

export default function ContentManagerPage() {
  const [uploading, setUploading] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    title: '',
    position: '',
    description: ''
  })
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: '',
    description: ''
  })
  const { toast } = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'template' | 'video') => {
    if (!e.target.files?.length) return
    
    setUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    // Add metadata based on type
    if (type === 'template') {
      formData.append('metadata', JSON.stringify(newTemplate))
    } else {
      formData.append('metadata', JSON.stringify(newVideo))
    }

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'adminToken': localStorage.getItem('adminToken') || ''
        }
      })
      const data = await res.json()
      
      if (res.ok) {
        if (type === 'template') {
          setTemplates(prev => [...prev, data])
          setNewTemplate({ name: '', title: '', position: '', description: '' })
        } else {
          setVideos(prev => [...prev, data])
          setNewVideo({ title: '', category: '', description: '' })
        }
        toast({
          title: 'Upload successful',
          description: `${type === 'template' ? 'Resume template' : 'Video'} has been uploaded.`,
          variant: 'default'
        })
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred during upload',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Content Manager</h1>
      
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Resume Templates</TabsTrigger>
          <TabsTrigger value="videos">Tutorial Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Resume Templates</span>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'template')}
                    className="hidden"
                    id="template-upload"
                  />
                  <Button asChild disabled={uploading}>
                    <label htmlFor="template-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Template
                    </label>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Template Name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Resume Title"
                    value={newTemplate.title}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    placeholder="Position/Role"
                    value={newTemplate.position}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, position: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Template Description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    className="md:col-span-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template: Template) => (
                  <Card key={template._id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded mb-2">
                        {/* Template preview */}
                      </div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm font-medium text-green-600">{template.position}</p>
                      <p className="text-sm text-gray-600 mb-1">{template.title}</p>
                      <p className="text-sm text-gray-500">{template.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" /> Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Tutorial Videos</span>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button asChild disabled={uploading}>
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Video
                    </label>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Video</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Video Title"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    placeholder="Category"
                    value={newVideo.category}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Video Description"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                    className="md:col-span-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video: Video) => (
                  <Card key={video._id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded mb-2">
                        {/* Video thumbnail */}
                      </div>
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm font-medium text-blue-600">{video.category}</p>
                      <p className="text-sm text-gray-500">{video.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" /> Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 