'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalculatorPage() {
  const params = useParams();
  const calculatorId = params.calculator;

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>计算器页面</CardTitle>
        </CardHeader>
        <CardContent>
          <p>这是 {calculatorId} 计算器的页面</p>
          <p>即将添加计算功能...</p>
        </CardContent>
      </Card>
    </div>
  );
}
