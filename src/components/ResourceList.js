// components/ResourceList.js
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ResourceList({ 
  resources, 
  config = {
    id: '',
    title: "Resources",
    showMoreLink: true,
    layout: {
      columns: { sm: 1, md: 2, lg: 3, xl: 4 },
      gap: 6
    },
    styles: {
      background: "bg-white",
      padding: "py-8",
      titleSize: "text-2xl"
    }
  }
}) {
  const { id, title, showMoreLink, layout, styles } = config;
  
  return (
    <section 
      id={id}
      className={cn(
        "py-8",
        styles?.background,
        styles?.padding
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={cn(styles?.titleSize, "font-bold tracking-tighter")}>
          {title}
        </h2>
        {showMoreLink && (
          <Link href="/resources" className="text-blue-600 hover:text-blue-800 transition-colors">
            More resources →
          </Link>
        )}
      </div>
      <div className={cn(
        "grid gap-6",
        {
          'grid-cols-1': true,
          'sm:grid-cols-1': layout?.columns?.sm === 1,
          'sm:grid-cols-2': layout?.columns?.sm === 2,
          'md:grid-cols-2': layout?.columns?.md === 2,
          'md:grid-cols-3': layout?.columns?.md === 3,
          'lg:grid-cols-3': layout?.columns?.lg === 3,
          'lg:grid-cols-4': layout?.columns?.lg === 4,
          'xl:grid-cols-4': layout?.columns?.xl === 4,
          'xl:grid-cols-5': layout?.columns?.xl === 5
        }
      )}>
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle>{resource.name}</CardTitle>
                <ExternalLink size={16} />
              </a>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}