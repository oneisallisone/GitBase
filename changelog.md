# Changelog 更新日志

All notable changes to this project will be documented in this file.
本项目的所有重要更改都将记录在此文件中。

## [2024-12-26] - Resource Section Management 资源区块管理

### Dependencies Added 新增依赖
- @radix-ui/react-select: UI组件库的Select组件
- @radix-ui/react-switch: UI组件库的Switch组件
- @radix-ui/react-label: UI组件库的Label组件
- class-variance-authority: 用于管理组件样式变体

### Added 新增功能
- Created initial changelog file to track project changes
  创建初始更新日志文件以跟踪项目更改
- Implementing resource section management functionality
  实现资源区块管理功能
- Added Select component from shadcn/ui
  添加来自shadcn/ui的Select组件
  - Created select.tsx component
    创建select.tsx组件
  - Installed @radix-ui/react-select dependency
    安装@radix-ui/react-select依赖
- Added 9 predefined section layouts
  添加9种预设区块布局
  - Modern Grid (4 columns) 现代网格（4列）
  - Compact List 紧凑列表
  - Featured Cards (3 columns) 特色卡片（3列）
  - Responsive Masonry 响应式瀑布流
  - Hero Section 大型展示区
  - Modern Carousel 现代轮播
  - Sidebar with Content 侧边栏布局
  - Vertical Timeline 垂直时间线
  - Gallery Grid 图片网格
- Added section visibility toggle
  添加区块显示/隐藏切换
  - Eye icon indicator for visibility status
    使用眼睛图标指示可见状态
  - Instant toggle without entering edit mode
    无需进入编辑模式即可切换
  - Automatic update in homepage view
    主页视图自动更新
- Added dynamic navigation menu
  添加动态导航菜单
  - Auto-updates with visible sections
    自动更新显示中的区块
  - Smooth scroll to section anchors
    平滑滚动到区块锚点
  - Section titles in navigation
    导航中显示区块标题
- Improved resource management UI
  改进资源管理界面
  - Added section selector for resource management
    添加区块选择器用于资源管理
  - Separated resource management into dedicated card
    将资源管理分离到独立卡片中
  - Enhanced UI organization and clarity
    增强界面组织和清晰度
- Added calculator sections and pages
  添加计算器区块和页面
  - Created 5 main calculator categories
    创建5个主要计算器类别
  - Added calculator pages with dynamic routing
    添加带动态路由的计算器页面
  - Prepared placeholder pages for all calculators
    为所有计算器准备占位页面

### Implemented Changes 实现的更改
1. Created `data/json/sections.json` for storing section configurations
   创建`data/json/sections.json`用于存储区块配置
   - Added initial resource section configuration
     添加初始资源区块配置
   - Defined structure for section layout, styles, and behavior
     定义区块布局、样式和行为的结构

2. Created `SectionManager` component (`src/components/SectionManager.js`)
   创建`SectionManager`组件
   - Added support for editing section title, layout, and styles
     添加编辑区块标题、布局和样式的支持
   - Implemented section duplication functionality
     实现区块复制功能
   - Added section deletion with confirmation
     添加带确认的区块删除功能
   - Created intuitive UI for section configuration
     创建直观的区块配置界面
   - Added layout preset selection
     添加布局预设选择
   - Added visibility toggle switch
     添加可见性切换开关

3. Created `section-layouts.json` for predefined layouts
   创建`section-layouts.json`用于预设布局
   - Added 9 different layout presets
     添加9种不同的布局预设
   - Each preset includes complete styling and layout configuration
     每个预设包含完整的样式和布局配置
   - Added descriptive names and explanations for each layout
     为每个布局添加描述性名称和说明

4. Created layouts API (`src/app/api/layouts/route.js`)
   创建布局API
   - Endpoint for fetching predefined layouts
     用于获取预设布局的端点
   - Error handling for missing configuration
     处理缺失配置的错误

5. Updated `ResourceList` component (`src/components/ResourceList.js`)
   更新`ResourceList`组件
   - Added support for dynamic configuration
     添加动态配置支持
   - Implemented responsive layout based on section config
     根据区块配置实现响应式布局
   - Added customizable styles and title
     添加可自定义的样式和标题
   - Enhanced grid system with configurable columns
     增强可配置列数的网格系统

6. Enhanced admin page (`src/app/admin/page.js`)
   增强管理页面
   - Added section management interface
     添加区块管理界面
   - Implemented section CRUD operations
     实现区块的CRUD操作
   - Added error handling and loading states
     添加错误处理和加载状态
   - Integrated with sections API
     集成区块API
   - Added per-section resource management
     添加每个区块的资源管理
   - Moved resource management into section context
     将资源管理移至区块上下文

7. Updated Home page (`src/app/page.tsx`)
   更新主页
   - Added support for multiple resource sections
     添加多个资源区块支持
   - Integrated section configuration with ResourceList
     集成区块配置与ResourceList
   - Maintained backward compatibility with existing resources
     保持与现有资源的向后兼容性
   - Added filtering for hidden sections
     添加隐藏区块的过滤

### Bug Fixes 错误修复
- Fixed Node.js `fs` module usage in Next.js
  修复Next.js中Node.js `fs`模块的使用
  - Removed direct fs imports from client components
    从客户端组件中移除直接的fs导入
  - Updated API routes to use correct fs import method
    更新API路由以使用正确的fs导入方法
  - Added proper error handling for file operations
    为文件操作添加适当的错误处理
- Fixed section resource management
  修复区块资源管理
  - Added resource management UI for each section
    为每个区块添加资源管理UI
  - Fixed resource duplication for new sections
    修复新区块的资源复制
  - Added section-specific resource editing
    添加区块特定的资源编辑
- Fixed section resource persistence
  修复区块资源持久化
  - Resources now stored within each section
    资源现在存储在每个区块内
  - Section deletion removes associated resources
    删除区块时同时删除关联的资源
  - Resource operations scoped to parent section
    资源操作限定在父区块范围内
- Fixed section resource data structure
  修复区块资源数据结构
  - Moved resources into section objects
    将资源移动到区块对象内
  - Removed standalone resources.json
    移除独立的resources.json
  - Updated homepage to use section resources
    更新主页以使用区块内的资源
  - Added default resources in section template
    在区块模板中添加默认资源

### Technical Details 技术细节
- Section configuration includes:
  区块配置包括：
  - Layout: Predefined layout presets
    布局：预定义布局预设
  - Visibility: Show/hide toggle
    可见性：显示/隐藏切换
  - Behavior: Show/hide more link
    行为：显示/隐藏更多链接

### Next Steps 下一步计划
- Add validation for section configuration
  添加区块配置验证
- Implement drag-and-drop section reordering
  实现拖放区块重新排序
- Add preview mode for section changes
  添加区块更改预览模式
- Enhance error handling and user feedback
  增强错误处理和用户反馈
- Add section-specific resource filtering
  添加区块特定的资源过滤
- Implement resource sorting within sections
  实现区块内的资源排序

### Checkpoint [2024-12-26-01] 检查点
- All section management features implemented
  所有区块管理功能已实现
- Layout presets and visibility toggle added
  添加布局预设和可见性切换
- Resource management integrated into sections
  资源管理已集成到区块中
