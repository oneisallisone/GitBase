import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { headers } from 'next/headers';

async function getSection(sectionId) {
  try {
    // 获取当前请求的host
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    const response = await fetch(`${protocol}://${host}/api/sections`, {
      cache: 'no-store' // 禁用缓存以获取最新数据
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }
    const data = await response.json();
    return data.sections.find(s => s.id === sectionId);
  } catch (error) {
    console.error('Error fetching section:', error);
    return null;
  }
}

export default async function CalculatorSectionPage({ params }) {
  const { sectionId } = params;
  const section = await getSection(sectionId);

  if (!section) {
    return <div className="container mx-auto p-4">Section not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{section.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.resources.map((calculator) => (
          <Link key={calculator.id} href={calculator.url}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{calculator.name}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-600">点击使用计算器 →</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
