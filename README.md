# CompanyPortal

> **完善的双语企业官网** —— 中英双语路由、SSG 静态渲染 + CDN 加速、CMS 可视化内容管理,基于 Next.js 16 + Tailwind CSS v4 的现代化全栈实现。

## 主要功能

- **前台 6 组页面**:首页 / 项目(列表 + 详情 + 图集灯箱)/ 服务(列表 + 详情)/ 新闻(列表 + 详情)/ 关于 / 联系(表单 UI)
- **中英双语**:`/[locale]` 路由 + 浏览器语言协商自动跳转,文案字典化(`content/dictionaries/`)
- **SEO 完备**:逐页 `generateMetadata`、`sitemap.ts`(含 hreflang 多语言互链)、`robots.ts`、OpenGraph
- **GSAP 动效**:Hero 入场时间轴、精选项目 ScrollTrigger 滚动逐张浮现、灯箱键盘导航
- **响应式多端适配**:PC / 平板 / 移动断点,移动端抽屉导航
- **图片加载策略**:LCP 图 `preload`、首屏 `eager`、折叠线以下自动懒加载,AVIF/WebP 就绪
- **Strapi 集成**： CMS后台，依赖于Strapi，避免二次开发
- **内容管理预留**:统一数据抽象层,当前由 mock 驱动,关闭开关即切换到 Strapi 契约实现

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js **16.3.6**(App Router + Turbopack)、React 19 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS v4 |
| 动效 | GSAP 3.15 + `@gsap/react`(useGSAP / ScrollTrigger) |
| i18n | `@formatjs/intl-localematcher` + `negotiator` |
| 规范 | ESLint 9 + eslint-config-next |
| 包管理 | pnpm 12 |
| CMS 规划 | Strapi v5 + PostgreSQL|

## 实现亮点

1. **契约先行的数据抽象层(`lib/api`)**
   前端不依赖任何 CMS 即可完整开发:`types.ts` 定义全量内容契约(HOME/项目/新闻/媒体/表单),`mock.ts` 与 `strapi.ts` 双实现,`NEXT_PUBLIC_USE_MOCK` 一个开关切换。构建期校验:关闭 mock 却缺 `NEXT_PUBLIC_STRAPI_URL` / `STRAPI_TOKEN` 直接报错,**把集成事故消灭在 build 阶段**。

2. **按 Next 16 真实 API 开发,而不是按训练数据**
   v16 有大量 breaking change,逐条对照版本内置文档落地:废弃的 `priority` 迁移为 `preload`/`eager`、`PageProps`/`LayoutProps` 类型化路由与 Promise params、SVG 自动 unoptimized 因此移除硬编码 `unoptimized`(为将来光栅图优化扫清潜在 bug)。

3. **修复了 SSG 注水下的 GSAP 隐性 bug**
   `gsap.from()` 在静态渲染注水时会把"已隐藏"状态记录为动画终态,导致卡片永久不可见;改用显式 `fromTo()` 并以 `useGSAP({ scope, dependencies, revert })` 管理生命周期,同时尊重 `prefers-reduced-motion`。

4. **多语言 SEO 闭环**
   sitemap 为每个 URL 输出全部 locale 的 `hreflang` 互链 alternate,`htmlLang` 映射(zh→zh-CN)贯穿 metadata 与日期格式化(`Intl.DateTimeFormat`)。

5. **可重复的验证流水线**
   每个 PR 走 `pnpm build` + ESLint + 无头 Chromium(Playwright)实开页面:截图核对渲染、断言 preload link / 懒加载策略 / 动效终态、console 零错误作为硬性验收;动效 bug 正是这样被发现和证实修复的。

## 快速开始

```bash
pnpm install
pnpm dev            # http://localhost:3000,默认 mock 数据
pnpm build && pnpm start
```

无需任何环境变量即可跑通;接入 Strapi 时设置:

```bash
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_STRAPI_URL=https://cms.example.com
STRAPI_TOKEN=<只读 token,仅服务端>
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

## 项目结构

```
app/[locale]/          6 组页面 + layout(双语路由)
app/sitemap.ts         含 hreflang 的站点地图
components/sections/   页面区块(hero / 卡片 / 图集灯箱 / 表单…)
components/layout/     Header / Footer / 语言切换 / 移动导航
lib/api/               数据抽象:types / mock / strapi
lib/i18n.ts            locale 定义与协商
content/dictionaries/  双语文案字典
docs/                  项目文档(见下)
```

## 文档

- **[docs/todo.md](docs/todo.md)** —— 项目进度、剩余工作、里程碑依赖与待决策事项
- `docs/archive/` —— 历史文档:原始需求(`original-req.md`)、需求分析与里程碑设计(`design.md`)
