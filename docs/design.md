# 设计公司官网 · 需求分析（含 Strapi 内置标注 + Milestone / Issues）

> 
> 标注约定：
> 🟢 **Strapi 自带 / 纯后台配置**（不用写代码，后台点选即可）
> 🟡 **少量配置 + 极少量代码**（模型建好后写个 controller 或钩子）
> 🔴 **需要开发**（前端页面 / 后端自定义逻辑 / 部署脚本）

---

## 原始需求
# 设计公司企业网站 · 需求汇总（一页版）

## 一句话定位
为一家设计公司开发**高端、双语、自适应的现代化企业官网**，前端 SSG 静态渲染 + CDN 加速，后台基于 Strapi 可视化维护内容。

---

## 项目背景
- 面向设计公司（品牌/空间/数字类业务）
- 已有参考类型网站，**视觉与结构可参照开发**
- 系统架构按既定技术栈执行

## 核心功能（4 项）
1. **前台 6 个页面**：首页、项目（案例）、服务、新闻、关于、联系
2. **后台管理系统**：内容管理 + 角色权限
3. **交互与数据**：联系表单提交 + 数据统计
4. **多端适配**：PC / 移动端响应式

## 技术架构（硬约束）
| 项 | 选型 |
|---|---|
| 渲染方式 | 现代化静态渲染（SSG） |
| 前端 | Next.js + TailwindCSS，高端自适应 UI |
| CMS | Strapi（自托管后台，可视化改内容） |
| 数据库 | PostgreSQL |
| 部署 | CDN 静态加速 + 轻量服务器跑后台 |
| 语言 | 中英双语 |

---

## 第 1 步：基本架构

### 1.1 技术栈与职责

| 层 | 技术 | 职责 | 编码量 |
| --- | --- | --- | --- |
| 前端渲染 | Next.js（App Router, SSG） | 页面、路由、双语、SEO | 🔴 主要工作 |
| 样式 | TailwindCSS | 自适应高端 UI | 🔴 |
| 内容 API | Strapi v5 自托管 | 内容模型、后台编辑、RBAC、媒体库 | 🟢 后台配置为主 |
| 数据库 | PostgreSQL | Strapi ORM 自动建表 | 🟢 仅部署连接 |
| 部署 | 前端 → CDN；Strapi+PG → 轻量服务器 | 前后端分离 | 🔴 运维配置 |
| 访问统计 | 第三方脚本（Plausible / 百度统计） | UV/PV/来源/转化 | 🟢 贴一段脚本 |

### 1.2 哪些是 Strapi 直接白给的（不用开发）🟢

- 后台管理面板 `/admin`（登录、菜单、编辑器界面）
- 富文本编辑器、Markdown、媒体库（上传/裁剪/元信息）
- 自动 CRUD REST API（建好模型就有）
- RBAC 角色权限（管理员 / 编辑 / 公开）
- 内容版本历史与回滚
- i18n 多语言内容录入
- 字段类型（文本/数字/布尔/日期/媒体/组件/动态区）
- 关联关系（一对多、多对多）
- 数据分页、排序、过滤（内置查询参数）
- Webhook、生命周期钩子（**钩子可写代码，但也可不写**）

### 1.3 前端目录结构（建议）🔴

```
src/
├── app/[locale]/{works,services,news,about,contact}/
├── components/{ui,layout,sections}/
├── lib/api/
│   ├── types.ts      # 统一类型
│   ├── index.ts      # 切换 mock / real 入口
│   ├── mock.ts       # 第2步假数据
│   └── strapi.ts     # 第3步真实请求
└── content/          # 中英静态文案字典
```

---

## 第 2 步：主要功能实现（mock 阶段）

### 2.1 页面与功能清单

| 页面 | 路由 | 数据方法 | 编码 |
| --- | --- | --- | --- |
| 首页 | `/[locale]` | `getHomePage` | 🔴 |
| 项目列表 / 详情 | `/[locale]/works` | `listProjects / getProject` | 🔴 |
| 服务列表 / 详情 | `/[locale]/services` | `listServices / getService` | 🔴 |
| 新闻列表 / 详情 | `/[locale]/news` | `listNews / getNews` | 🔴 |
| 关于 | `/[locale]/about` | `getAboutPage` | 🔴 |
| 联系 | `/[locale]/contact` | `getContactPage` + 表单 | 🔴 表单 UI + 校验 |
| Header / Footer / 语言切换 | 全局 | `getSiteSettings` | 🔴 |
| 响应式 PC/移动端 | 全部 | — | 🔴 Tailwind 断点 |
| SEO title/meta | 每页 | `generateMetadata` | 🔴 |
| 第三方统计脚本 | layout | — | 🟢 贴一段 |

### 2.2 Mock API 形状（对齐 Strapi v5 响应）

统一类型（`lib/api/types.ts`）：

```
export interface Project {
  slug: string; title: string; category: string;
  year: string; client: string;
  cover: { url: string; width: number; height: number; alternativeText?: string };
  gallery: { url: string; width: number; height: number }[];
  description: string;
}
export interface Service  { slug: string; title: string; summary: string; detail: string; icon?: string }
export interface NewsArticle { slug: string; title: string; date: string; cover: Project['cover']; excerpt: string; content: string }
export interface SiteSettings { siteName: string; logo: Project['cover']; nav: {label:string;href:string}[]; footer: {...} }
export interface HomePage { hero: {...}; featuredProjects: Project[]; servicePreview: Service[]; aboutPreview: string }
export interface ContactFormInput { name: string; email: string; phone?: string; company?: string; message: string; sourcePage?: string }
```

出口（`lib/api/index.ts`）：

```
import * as mock from './mock';
import * as strapi from './strapi';
export const api = process.env.NEXT_PUBLIC_USE_MOCK === 'false' ? strapi : mock;
```

> 
> 页面只调 `api.xxx()`，第 3 步切实现即可，页面零改动。

### 2.3 第 2 步验收

- 所有页面 mock 跑通，PC/移动端正常
- `/cn` `/en` 双语路由都能渲染
- 表单提交有成功/失败提示
- `NEXT_PUBLIC_USE_MOCK=false` 时编译通过

---

## 第 3 步：Strapi 集成

### 3.1 内容模型清单（🟢 后台点选，不用写代码）

| 模型 | 类型 | 主要字段 | 谁做 |
| --- | --- | --- | --- |
| `home-page` | Single | hero 组件、featuredProjects 关联、servicePreview 关联、aboutPreview richtext | 🟢 |
| `project` | Collection | title, slug, category, year, client, cover(media), gallery(media), description(richtext) | 🟢 |
| `service` | Collection | title, slug, summary, detail(richtext), icon | 🟢 |
| `article` | Collection | title, slug, date, cover(media), excerpt, content(richtext) | 🟢 |
| `about-page` | Single | title, intro(richtext), team 组件, timeline 组件 | 🟢 |
| `contact-page` | Single | title, info 组件, formConfig 组件 | 🟢 |
| `site-setting` | Single | siteName, logo, nav 组件, footer 组件, SEO | 🟢 |
| `form-submission` | Collection | name, email, phone, company, message, sourcePage, status(enum new/processing/done) | 🟢 模型本身 |

- 全部模型开启 i18n（🟢 后台开关）
- RBAC 角色与权限（🟢 后台点选）
- 媒体库、版本历史、审计（🟢 自带）

### 3.2 需要写代码的部分（🔴/🟡）

| 项 | 类型 | 说明 |
| --- | --- | --- |
| `lib/api/strapi.ts` | 🔴 | fetch + populate 参数 + 图片 URL 拼接 + richtext 解析 + locale 透传 |
| Next Route Handler `/contact/submit` | 🟡 | 服务端带 token 转发到 Strapi，前端不暴露 token |
| 表单防刷/人机验证 | 🟡 | hCaptcha 校验 + IP 限流（中间件或 controller） |
| 提交成功邮件通知 | 🟡（可选） | Strapi lifecycle `afterCreate` 钩子 + nodemailer |
| 留言导出 CSV | 🟡（可选） | Strapi 自定义 controller |
| 部署 Dockerfile + nginx + 备份脚本 | 🔴 | Strapi+PG 容器化、定时 pg_dump |
| Next 静态产物发布到 CDN | 🔴 | build + 上传 + 缓存刷新策略 |

> 
> 📌 重点：**业务内容模型、后台界面、CRUD API、RBAC、i18n 录入，全部是 🟢 零代码**。Strapi 侧真正写代码的只有「表单接收增强」和「部署运维」。

### 3.3 环境变量

前端 `.env.local`：

```
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_STRAPI_URL=[https://api.xxx.com](https://api.xxx.com)
STRAPI_TOKEN=只读token（仅服务端使用）
```

### 3.4 集成上线顺序

1. Strapi 连 PostgreSQL，建 3.1 全部模型、开 i18n、配权限 🟢
2. 前端补 `strapi.ts` 字段映射 🔴
3. 逐页联调：首页 → 项目 → 服务 → 新闻 → 关于 → 联系表单 🔴
4. 表单 Route Handler + 人机验证 🟡
5. `next build` 产物上 CDN；Strapi Docker 部署 + Nginx + HTTPS 🔴
6. 改一条内容重新 build / ISR，确认线上生效 🔴
7. 配 PostgreSQL 每日备份、`public/uploads` 挂卷 🔴

---

## Milestone 建议

> 
> 假设 1 名前端 + 1 名后端/运维（可由同一人兼任），按 6 个里程碑排。

| M | 里程碑 | 主要交付 | 预估工作量 | 验收 |
| --- | --- | --- | --- | --- |
| **M1 架构与脚手架** | 项目骨架跑通 | Next 初始化、Tailwind、i18n 双语路由、Header/Footer、`lib/api` 抽象层、mock 数据结构 | 2–3 天 | 双语首页能跑，所有页面路由 404 但不报错 |
| **M2 前端页面（mock）** | 全部 UI 完成 | 6 个页面 + 列表/详情 + 表单 UI + 响应式 + SEO | 8–12 天 | mock 数据下 PC/移动端所有页面可点可看，中英切换正常 |
| **M3 Strapi 后台搭建** | 内容可录入 | 本地 Strapi+PG、8 个模型、i18n、RBAC、媒体库、示例内容 | 2–3 天 | 后台能登录、能录入中英双语项目/新闻/服务 |
| **M4 前后端联调** | 真实数据上线前端 | `strapi.ts` 字段映射、逐页接真实 API、图片优化、表单 Route Handler | 4–6 天 | `USE_MOCK=false` 下所有页面数据来自 Strapi，表单可提交入库 |
| **M5 部署上线** | 公网可访问 | Docker 化 Strapi+PG、Nginx、HTTPS、CDN 静态发布、备份脚本、第三方统计 | 2–3 天 | 域名可访问，HTTPS 正常，改 Strapi 内容可生效，数据库每日备份 |
| **M6 验收与交付** | 客户验收 | 走查清单、使用文档（如何在 Strapi 改内容）、培训 | 1–2 天 | 客户能独立在后台更新项目/新闻/服务，前台正确显示 |

**总工期估算：约 19–29 个工作日（单人）；2 人并行可压到 15–20 天。**

---

## Issues 创建建议

> 
> 按模块拆成可独立领取的工单，建议在 GitHub Issues / 飞书任务中按此建。标签：`front / backend / strapi / deploy / bug / enhancement`。

### Epic 1 · 脚手架（对应 M1）

- `E1-1` 初始化 Next.js App Router + TypeScript + ESLint + Tailwind
- `E1-2` 接入 next-intl（或原生 i18n），配置 `/cn` `/en` 双语路由与语言切换
- `E1-3` 全局布局：Header（移动端汉堡菜单）、Footer、返回顶部
- `E1-4` 建立 `lib/api` 抽象层：`types.ts` / `index.ts` / `mock.ts` / `strapi.ts` 空实现
- `E1-5` 配置 `next.config.js`：图片 remotePatterns、环境变量、SEO 默认值

### Epic 2 · 前端页面（对应 M2）

- `E2-1` 首页：Hero、精选项目、服务预览、关于预览、CTA
- `E2-2` 项目列表：网格布局、分页/筛选、hover 效果
- `E2-3` 项目详情：封面、Gallery 灯箱、项目元信息（client/year/category）
- `E2-4` 服务列表 + 详情
- `E2-5` 新闻列表 + 详情（富文本渲染）
- `E2-6` 关于我们：简介、团队、时间线
- `E2-7` 联系我们：信息栏 + 表单 UI（必填/邮箱/手机号校验、loading、成功失败态）
- `E2-8` 全站响应式走查：移动端 / 平板 / 桌面断点
- `E2-9` 每页 `generateMetadata`（title/description/OG）

### Epic 3 · Strapi 后台（对应 M3，🟢 配置为主）

- `E3-1` 本地 Strapi v5 + PostgreSQL 跑通
- `E3-2` 创建 8 个内容模型与字段（home/project/service/article/about/contact/site-setting/form-submission）
- `E3-3` 开启 i18n（zh-Hans / en），录入 3 条示例项目 + 2 条新闻 + 4 项服务
- `E3-4` RBAC：管理员 / 编辑 / 只读 Token 权限配置
- `E3-5` 媒体库上传配置（本地路径，后续可切 OSS）

### Epic 4 · 前后端联调（对应 M4）

- `E4-1` 实现 `strapi.ts`：fetch 封装、populate、locale、图片 URL 拼接、richtext 渲染
- `E4-2` 逐页替换 mock：首页 → 项目 → 服务 → 新闻 → 关于 → 联系
- `E4-3` 表单提交 Route Handler：服务端带 token 转发 + 人机验证 + 简单限流
- `E4-4` Next `<Image>` 接 Strapi 图片，配置 CDN 图片域名
- `E4-5` 修联调 bug：字段缺失、多语言回退、404、分页

### Epic 5 · 部署上线（对应 M5）

- `E5-1` Strapi + PostgreSQL 写 docker-compose
- `E5-2` Nginx 反代：`api.xxx.com` → 1337，`www.xxx.com` 静态回源
- `E5-3` HTTPS 证书（Let's Encrypt / 云厂商）
- `E5-4` Next 静态产物构建脚本 + CDN 上传 + 缓存刷新
- `E5-5` CORS 白名单、Strapi 后台 IP 限制
- `E5-6` PostgreSQL 每日 pg_dump 定时任务 + uploads 卷备份
- `E5-7` 接入第三方统计脚本（Plausible / 百度统计）

### Epic 6 · 验收交付（对应 M6）

- `E6-1` 验收走查清单（双语、表单、响应式、SEO、HTTPS、404）
- `E6-2` 编写 Strapi 使用文档（如何发项目/新闻/改首页）
- `E6-3` 客户培训 + 交付账号密码
- `E6-4` 上线后 1 周 bug 回归

### 可插拔 / 可选（不进 MVP，客户加钱再做）

- `O-1` 表单提交成功邮件通知（nodemailer 钩子）
- `O-2` 留言 CSV 导出
- `O-3` Strapi 媒体迁移到阿里云 OSS / S3
- `O-4` ISR 增量再生成（改 Strapi 不用重新 build）
- `O-5` GSAP 滚动动效（首页 Hero + 项目入场）
- `O-6` 后台简易统计看板（每日提交量折线图）

---

## 一句话总结

- **Strapi 侧**：内容模型、后台界面、CRUD、RBAC、i18n、媒体库全是 🟢 零代码；真正写代码的只有表单增强和部署。
- **前端侧**：6 个页面 + 双语 + 响应式 + 表单是 🔴 主工作量。
- **节奏**：M1 脚手架 → M2 mock 全 UI → M3 Strapi 搭后台 → M4 联调 → M5 上线 → M6 交付，单人约 4–6 周。

需要的话，我可以把这份分析直接生成为一份 Markdown / 飞书文档，或者把 Issues 模板（含 label、checklist 格式）直接写出来给你导入 GitHub。