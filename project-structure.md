# GitBase 项目结构

```
GitBase/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js 应用主目录
│   │   ├── admin/               # 管理后台相关页面
│   │   │   ├── articles/        # 文章管理页面
│   │   │   └── page.js          # 管理后台主页面，包含section和资源管理
│   │   ├── api/                 # API 路由目录
│   │   │   ├── auth/            # 认证相关API
│   │   │   │   ├── login.js     # 登录API
│   │   │   │   └── logout.js    # 登出API
│   │   │   └── sections/        # Sections相关API
│   │   │       └── route.js     # Sections CRUD操作
│   │   ├── calculators/         # 计算器相关页面
│   │   │   └── section/         # 计算器分类页面
│   │   │       └── [sectionId]/ # 动态路由的计算器分类页面
│   │   │           └── page.js  # 显示特定分类下的所有计算器
│   │   └── page.tsx             # 网站首页
│   ├── components/              # 可复用组件目录
│   │   ├── ui/                  # UI组件库
│   │   │   ├── button.tsx      # 按钮组件
│   │   │   ├── card.tsx        # 卡片组件
│   │   │   └── ...             # 其他UI组件
│   │   ├── ArticleEditor.js     # 文章编辑器组件
│   │   ├── ArticleList.js       # 文章列表组件
│   │   ├── Footer.js           # 页面底部组件
│   │   ├── Layout.js           # 页面布局组件
│   │   ├── LoginModal.js       # 登录模态框组件
│   │   ├── Navigation.js       # 导航栏组件
│   │   ├── ResourceList.js     # 资源列表组件
│   │   └── SectionManager.js   # Section管理组件
│   └── lib/                    # 工具库和辅助函数
│       ├── api.js              # API调用函数
│       └── utils.js            # 通用工具函数
├── data/                       # 数据文件目录
│   └── json/                   # JSON数据文件
│       ├── sections.json       # 区块配置数据
│       └── section-layouts.json # 区块布局配置
├── public/                     # 静态资源目录
│   └── images/                 # 图片资源
├── styles/                     # 样式文件目录
│   └── globals.css            # 全局样式
├── package.json               # 项目依赖配置
├── next.config.js            # Next.js配置文件
├── tailwind.config.js        # Tailwind CSS配置
├── tsconfig.json             # TypeScript配置
├── README.md                 # 项目说明文档
├── changelog.md              # 更新日志
└── project-structure.md      # 本文件：项目结构说明

```

## 主要目录和文件说明

### /src/app
Next.js 13+ 的应用主目录，采用新的 App Router 架构。所有页面和API路由都在这里定义。

### /src/app/admin
管理后台相关页面，包含：
- 区块管理功能
- 资源管理功能
- 文章管理功能

### /src/app/calculators
计算器功能相关页面：
- 按分类展示各类计算器
- 提供计算器的具体功能实现

### /src/components
可复用的React组件：
- UI/: shadcn/ui组件库的自定义实现
- 业务组件：如导航栏、文章编辑器等

### /src/lib
工具函数和API：
- api.js: 封装了所有的API调用
- utils.js: 提供通用工具函数

### /data/json
JSON格式的数据文件：
- sections.json: 存储所有区块的配置信息
- section-layouts.json: 存储区块布局的配置信息

## 主要功能模块

### 1. 认证系统
- 登录/登出功能
- 身份验证
- 权限控制

### 2. 内容管理
- 文章管理
- 区块管理
- 资源管理

### 3. 计算器功能
- 生理健康计算器
- 身材管理计算器
- 生育相关计算器
- 健康管理计算器
- 生活管理计算器

### 4. 用户界面
- 响应式设计
- 主题定制
- 现代化UI组件

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Node.js
