export async function getSections() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/sections`, {
      next: { revalidate: 60 } // 缓存60秒
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }

    const data = await response.json();
    return data.sections || [];
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

export async function getSection(sectionId) {
  const sections = await getSections();
  return sections.find(section => section.id === sectionId);
}
