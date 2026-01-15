'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Plus, X } from 'lucide-react'

interface Section {
  name: string
  required: boolean
  order: number
}

export default function NewTemplatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Professional')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [content, setContent] = useState('')
  const [sections, setSections] = useState<Section[]>([])
  const [isPremium, setIsPremium] = useState(false)
  const [price, setPrice] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        required: true,
        order: sections.length + 1,
      },
    ])
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleSectionChange = (index: number, field: keyof Section, value: string | boolean) => {
    const newSections = [...sections]
    newSections[index] = {
      ...newSections[index],
      [field]: value,
    }
    setSections(newSections)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Not authenticated')
      }

      // First, upload the thumbnail
      const thumbnailFormData = new FormData()
      if (thumbnail) {
        thumbnailFormData.append('file', thumbnail)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: thumbnailFormData,
        })
        const uploadData = await uploadResponse.json()
        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || 'Failed to upload thumbnail')
        }
        const thumbnailUrl = uploadData.url

        // Then create the template
        const response = await fetch('/api/admin/templates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            category,
            thumbnail: thumbnailUrl,
            content,
            sections,
            isPremium,
            price: parseFloat(price),
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create template')
        }

        toast({
          title: 'Success',
          description: 'Template created successfully',
        })

        router.push('/admin/dashboard')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create template',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Create New Template</CardTitle>
          <CardDescription className="text-gray-400">
            Add a new resume template to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Template Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Simple">Simple</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail" className="text-gray-300">Thumbnail</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {thumbnail && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setThumbnail(null)}
                    className="border-gray-600 text-gray-300"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-300">Template Content (HTML)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white min-h-[200px] font-mono"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Template Sections</Label>
                <Button
                  type="button"
                  onClick={handleAddSection}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
              {sections.map((section, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Input
                    value={section.name}
                    onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
                    placeholder="Section name"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={section.required}
                      onChange={(e) => handleSectionChange(index, 'required', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500"
                    />
                    <Label className="text-gray-300">Required</Label>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRemoveSection(index)}
                    className="border-gray-600 text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500"
                />
                <Label htmlFor="isPremium" className="text-gray-300">Premium Template</Label>
              </div>
              {isPremium && (
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-300">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Template'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 