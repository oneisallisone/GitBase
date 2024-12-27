'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

export function SectionManager({ section, onUpdate, onDuplicate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [config, setConfig] = useState(section);
  const [layouts, setLayouts] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('');

  useEffect(() => {
    // 加载预设布局
    fetch('/api/layouts')
      .then(res => res.json())
      .then(data => {
        setLayouts(data.layouts);
        if (section.layoutId) {
          setSelectedLayout(section.layoutId);
        }
      })
      .catch(error => console.error('Error loading layouts:', error));
  }, [section.layoutId]);

  const handleSave = () => {
    onUpdate(config);
    setIsEditing(false);
  };

  const handleLayoutChange = (layoutId) => {
    const selectedLayout = layouts.find(l => l.id === layoutId);
    if (selectedLayout) {
      setConfig({
        ...config,
        layoutId: layoutId,
        ...selectedLayout.config
      });
      setSelectedLayout(layoutId);
    }
  };

  const toggleVisibility = () => {
    setConfig({
      ...config,
      isHidden: !config.isHidden
    });
    onUpdate({
      ...config,
      isHidden: !config.isHidden
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Section: {section.title}</h3>
            <div className="flex items-center gap-2">
              <Switch
                checked={!config.isHidden}
                onCheckedChange={() => toggleVisibility()}
                aria-label="Toggle section visibility"
              />
              <Label>{config.isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Label>
            </div>
          </div>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                <Button onClick={() => onDuplicate(section)}>Duplicate</Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this section?')) {
                      onDelete(section.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      {isEditing && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                value={config.title}
                onChange={(e) => setConfig({...config, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Layout Style</label>
              <Select
                value={selectedLayout}
                onValueChange={handleLayoutChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a layout style" />
                </SelectTrigger>
                <SelectContent>
                  {layouts.map(layout => (
                    <SelectItem key={layout.id} value={layout.id}>
                      <div>
                        <div className="font-medium">{layout.name}</div>
                        <div className="text-sm text-gray-500">{layout.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Show More Link</label>
              <Select
                defaultValue={config.showMoreLink.toString()}
                onValueChange={(value) => setConfig({...config, showMoreLink: value === 'true'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
