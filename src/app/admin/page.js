'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionManager } from '@/components/SectionManager';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const [sections, setSections] = useState([]);
  const [newResource, setNewResource] = useState({ name: '', description: '', url: '' });
  const [editingResource, setEditingResource] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      if (!data.isLoggedIn) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setError('Failed to authenticate. Please try again.');
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
    fetchSections();
  }, [checkAuth]);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/sections');
      if (!response.ok) {
        throw new Error('Failed to fetch sections');
      }
      const data = await response.json();
      setSections(data.sections.map(section => ({
        ...section,
        resources: section.resources || []
      })));
    } catch (error) {
      console.error('Error fetching sections:', error);
      setError('Failed to fetch sections. Please try again.');
    }
  };

  const handleInputChange = (e, sectionId = null) => {
    const { name, value } = e.target;
    if (editingResource) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          const updatedResources = section.resources.map(resource => {
            if (resource.id === editingResource.id) {
              return { ...resource, [name]: value };
            }
            return resource;
          });
          return { ...section, resources: updatedResources };
        }
        return section;
      });
      setSections(updatedSections);
    } else {
      setNewResource({ ...newResource, [name]: value });
    }
  };

  const handleEdit = (resource, sectionId) => {
    setEditingResource({ ...resource, sectionId });
  };

  const handleSave = async (sectionId) => {
    try {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          if (editingResource) {
            // 更新现有资源
            const updatedResources = section.resources.map(resource =>
              resource.id === editingResource.id ? { ...editingResource } : resource
            );
            return { ...section, resources: updatedResources };
          } else {
            // 添加新资源
            const newResourceWithId = {
              ...newResource,
              id: `resource-${Date.now()}`
            };
            return {
              ...section,
              resources: [...section.resources, newResourceWithId]
            };
          }
        }
        return section;
      });

      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });

      if (!response.ok) {
        throw new Error('Failed to save resources');
      }

      setSections(updatedSections);
      setEditingResource(null);
      setNewResource({ name: '', description: '', url: '' });
    } catch (error) {
      console.error('Error saving resources:', error);
      setError('Failed to save resources. Please try again.');
    }
  };

  const handleDeleteResource = async (resourceId, sectionId) => {
    try {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            resources: section.resources.filter(r => r.id !== resourceId)
          };
        }
        return section;
      });

      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }

      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting resource:', error);
      setError('Failed to delete resource. Please try again.');
    }
  };

  const handleSectionUpdate = async (updatedSection) => {
    try {
      const updatedSections = sections.map(s => 
        s.id === updatedSection.id ? { ...updatedSection, resources: s.resources } : s
      );
      
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update sections');
      }
      
      setSections(updatedSections);
    } catch (error) {
      console.error('Error updating sections:', error);
      setError('Failed to update sections. Please try again.');
    }
  };

  const handleSectionDuplicate = async (section) => {
    try {
      const newSection = {
        ...section,
        id: `${section.id}-copy-${Date.now()}`,
        title: `${section.title} (Copy)`,
        resources: section.resources ? [...section.resources] : []
      };
      
      const updatedSections = [...sections, newSection];
      
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to duplicate section');
      }
      
      setSections(updatedSections);
    } catch (error) {
      console.error('Error duplicating section:', error);
      setError('Failed to duplicate section. Please try again.');
    }
  };

  const handleSectionDelete = async (sectionId) => {
    try {
      const updatedSections = sections.filter(s => s.id !== sectionId);
      
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete section');
      }
      
      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting section:', error);
      setError('Failed to delete section. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Section Management</h2>
        {sections.map(section => (
          <div key={section.id} className="mb-8">
            <SectionManager
              section={section}
              onUpdate={handleSectionUpdate}
              onDuplicate={handleSectionDuplicate}
              onDelete={handleSectionDelete}
            />
          </div>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resource Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Section</label>
            <Select
              value={selectedSectionId || ''}
              onValueChange={setSelectedSectionId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a section to manage resources" />
              </SelectTrigger>
              <SelectContent>
                {sections.map(section => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSectionId && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections
                    .find(s => s.id === selectedSectionId)
                    ?.resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          {editingResource?.id === resource.id ? (
                            <Input 
                              name="name" 
                              value={editingResource.name} 
                              onChange={(e) => handleInputChange(e, selectedSectionId)} 
                            />
                          ) : (
                            resource.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingResource?.id === resource.id ? (
                            <Input 
                              name="description" 
                              value={editingResource.description} 
                              onChange={(e) => handleInputChange(e, selectedSectionId)} 
                            />
                          ) : (
                            resource.description
                          )}
                        </TableCell>
                        <TableCell>
                          {editingResource?.id === resource.id ? (
                            <Input 
                              name="url" 
                              value={editingResource.url} 
                              onChange={(e) => handleInputChange(e, selectedSectionId)} 
                            />
                          ) : (
                            resource.url
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {editingResource?.id === resource.id ? (
                              <>
                                <Button onClick={() => handleSave(selectedSectionId)}>Save</Button>
                                <Button variant="outline" onClick={() => setEditingResource(null)}>Cancel</Button>
                              </>
                            ) : (
                              <>
                                <Button onClick={() => handleEdit(resource, selectedSectionId)}>Edit</Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDeleteResource(resource.id, selectedSectionId)}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell>
                      <Input 
                        name="name" 
                        value={newResource.name} 
                        onChange={(e) => handleInputChange(e)} 
                        placeholder="New resource name" 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        name="description" 
                        value={newResource.description} 
                        onChange={(e) => handleInputChange(e)} 
                        placeholder="New resource description" 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        name="url" 
                        value={newResource.url} 
                        onChange={(e) => handleInputChange(e)} 
                        placeholder="New resource URL" 
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleSave(selectedSectionId)}>Add New</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-4">
        <Link href="/admin/articles">
          <Button>Manage Articles</Button>
        </Link>
      </div>
    </div>
  );
}