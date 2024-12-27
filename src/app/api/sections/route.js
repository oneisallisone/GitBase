import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const sectionsPath = path.join(process.cwd(), 'data', 'json', 'sections.json');

export async function GET() {
  try {
    const data = await fs.readFile(sectionsPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error in GET /api/sections:', error);
    if (error.code === 'ENOENT') {
      // If file doesn't exist, create it with default data
      const defaultData = {
        sections: [
          {
            id: "physiological-health",
            type: "resource-section",
            title: "生理健康计算器",
            layout: {
              columns: { sm: 1, md: 2, lg: 3, xl: 3 },
              gap: 6
            },
            showMoreLink: false,
            styles: {
              background: "white",
              padding: "py-12",
              titleSize: "text-3xl"
            },
            resources: [
              {
                id: "menstrual-cycle",
                name: "月经周期预测计算器",
                description: "帮助追踪和预测月经周期，提供下一次月经的预计日期",
                url: "/calculators/menstrual-cycle"
              },
              {
                id: "ovulation-safe-period",
                name: "排卵期和安全期计算器",
                description: "基于月经周期计算排卵期和安全期，帮助进行生理期规划",
                url: "/calculators/ovulation-safe-period"
              },
              {
                id: "bmr",
                name: "基础代谢率(BMR)计算器",
                description: "计算每日基础代谢消耗的热量，帮助制定合理的饮食计划",
                url: "/calculators/bmr"
              },
              {
                id: "bmi",
                name: "BMI身体质量指数计算器",
                description: "计算身体质量指数，评估健康状况",
                url: "/calculators/bmi"
              },
              {
                id: "menstrual-symptoms",
                name: "生理期症状追踪记录器",
                description: "记录和追踪生理期症状，帮助了解身体状况",
                url: "/calculators/menstrual-symptoms"
              },
              {
                id: "menstrual-flow",
                name: "经期流量计算器",
                description: "评估经期流量，帮助选择合适的卫生用品",
                url: "/calculators/menstrual-flow"
              },
              {
                id: "basal-temperature",
                name: "体温基础值计算器",
                description: "计算和追踪基础体温，帮助了解排卵周期",
                url: "/calculators/basal-temperature"
              },
              {
                id: "pregnancy-weight",
                name: "孕期体重增长计算器",
                description: "计算孕期合理的体重增长范围",
                url: "/calculators/pregnancy-weight"
              }
            ]
          },
          {
            id: "body-management",
            type: "resource-section",
            title: "身材管理计算器",
            layout: {
              columns: { sm: 1, md: 2, lg: 3, xl: 3 },
              gap: 6
            },
            showMoreLink: false,
            styles: {
              background: "bg-gray-50",
              padding: "py-12",
              titleSize: "text-3xl"
            },
            resources: [
              {
                id: "bust-size",
                name: "最佳胸围计算器",
                description: "根据身高体重计算理想胸围范围",
                url: "/calculators/bust-size"
              },
              {
                id: "hip-size",
                name: "最佳臀围计算器",
                description: "计算适合体型的理想臀围数值",
                url: "/calculators/hip-size"
              },
              {
                id: "arm-circumference",
                name: "最佳上臂围计算器",
                description: "计算健康匀称的上臂围尺寸",
                url: "/calculators/arm-circumference"
              },
              {
                id: "waist-health",
                name: "腰围健康指数计算器",
                description: "评估腰围与健康的关系",
                url: "/calculators/waist-health"
              },
              {
                id: "body-fat",
                name: "体脂率计算器",
                description: "计算体脂率，评估身体脂肪水平",
                url: "/calculators/body-fat"
              },
              {
                id: "weight-goal",
                name: "减重目标计算器",
                description: "设定健康合理的减重目标",
                url: "/calculators/weight-goal"
              },
              {
                id: "daily-calories",
                name: "每日所需热量计算器",
                description: "计算每日所需的热量摄入",
                url: "/calculators/daily-calories"
              }
            ]
          },
          {
            id: "fertility",
            type: "resource-section",
            title: "生育相关计算器",
            layout: {
              columns: { sm: 1, md: 2, lg: 3, xl: 3 },
              gap: 6
            },
            showMoreLink: false,
            styles: {
              background: "white",
              padding: "py-12",
              titleSize: "text-3xl"
            },
            resources: [
              {
                id: "conception-time",
                name: "受孕最佳时间计算器",
                description: "计算最佳受孕时间窗口",
                url: "/calculators/conception-time"
              },
              {
                id: "due-date",
                name: "预产期计算器",
                description: "根据末次月经计算预产期",
                url: "/calculators/due-date"
              },
              {
                id: "fetal-development",
                name: "胎儿发育指标计算器",
                description: "计算胎儿发育关键指标",
                url: "/calculators/fetal-development"
              },
              {
                id: "pregnancy-nutrition",
                name: "孕期营养需求计算器",
                description: "计算孕期所需的营养摄入量",
                url: "/calculators/pregnancy-nutrition"
              },
              {
                id: "breastfeeding-calories",
                name: "母乳喂养卡路里计算器",
                description: "计算哺乳期所需的额外热量",
                url: "/calculators/breastfeeding-calories"
              }
            ]
          },
          {
            id: "health-management",
            type: "resource-section",
            title: "健康管理计算器",
            layout: {
              columns: { sm: 1, md: 2, lg: 3, xl: 3 },
              gap: 6
            },
            showMoreLink: false,
            styles: {
              background: "bg-gray-50",
              padding: "py-12",
              titleSize: "text-3xl"
            },
            resources: [
              {
                id: "water-intake",
                name: "饮水量计算器",
                description: "计算每日所需饮水量",
                url: "/calculators/water-intake"
              },
              {
                id: "sleep-duration",
                name: "睡眠时长计算器",
                description: "计算最佳睡眠时间",
                url: "/calculators/sleep-duration"
              },
              {
                id: "exercise-intensity",
                name: "运动强度计算器",
                description: "计算适合的运动强度",
                url: "/calculators/exercise-intensity"
              },
              {
                id: "medication-reminder",
                name: "服药提醒计算器",
                description: "计算药物服用时间间隔",
                url: "/calculators/medication-reminder"
              },
              {
                id: "vitamin-supplement",
                name: "维生素补充计算器",
                description: "计算维生素补充需求",
                url: "/calculators/vitamin-supplement"
              }
            ]
          },
          {
            id: "life-management",
            type: "resource-section",
            title: "生活管理计算器",
            layout: {
              columns: { sm: 1, md: 2, lg: 3, xl: 3 },
              gap: 6
            },
            showMoreLink: false,
            styles: {
              background: "white",
              padding: "py-12",
              titleSize: "text-3xl"
            },
            resources: [
              {
                id: "skincare-cycle",
                name: "护肤品使用周期计算器",
                description: "计算护肤品的使用和更换周期",
                url: "/calculators/skincare-cycle"
              },
              {
                id: "beauty-care-time",
                name: "美容护理时间计算器",
                description: "计算美容护理的最佳时间",
                url: "/calculators/beauty-care-time"
              },
              {
                id: "menstrual-supplies",
                name: "经期用品消耗计算器",
                description: "计算经期用品的使用量",
                url: "/calculators/menstrual-supplies"
              },
              {
                id: "supplement-cycle",
                name: "女性保健品使用周期计算器",
                description: "计算保健品的使用周期",
                url: "/calculators/supplement-cycle"
              },
              {
                id: "menstrual-exercise",
                name: "生理期运动强度计算器",
                description: "计算生理期适宜的运动强度",
                url: "/calculators/menstrual-exercise"
              }
            ]
          }
        ]
      };
      
      await fs.writeFile(sectionsPath, JSON.stringify(defaultData, null, 2));
      return NextResponse.json(defaultData);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await fs.writeFile(sectionsPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/sections:', error);
    return NextResponse.json(
      { error: 'Failed to update sections' },
      { status: 500 }
    );
  }
}
