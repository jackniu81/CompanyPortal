import type { Localized } from "@/lib/content";

export type SiteCopy = Localized<{
  name: string;
  tagline: string;
  summary: string;
}>;

export const siteCopy: SiteCopy = {
  zh: {
    name: "设计公司官网",
    tagline: "高端 · 双语 · 自适应",
    summary: "Next.js 静态渲染前台 + Strapi 可视化内容后台的企业门户。",
  },
  en: {
    name: "Design Studio Portal",
    tagline: "Premium · Bilingual · Responsive",
    summary: "A corporate portal: statically rendered Next.js front end with a Strapi CMS back office.",
  },
};

export type ChecklistItem = {
  label: Localized;
  detail: Localized;
  done: boolean;
};

export const scaffoldChecklist: ChecklistItem[] = [
  {
    label: { zh: "应用与工具链", en: "App & toolchain" },
    detail: {
      zh: "App Router + TypeScript + ESLint，包管理 pnpm",
      en: "App Router + TypeScript + ESLint, managed by pnpm",
    },
    done: true,
  },
  {
    label: { zh: "样式与设计令牌", en: "Styling & design tokens" },
    detail: {
      zh: "TailwindCSS v4 `@theme`：色板、字阶、断点、圆角、阴影",
      en: "TailwindCSS v4 `@theme`: palette, type scale, breakpoints, radii, shadows",
    },
    done: true,
  },
  {
    label: { zh: "目录结构", en: "Directory layout" },
    detail: {
      zh: "app / components / lib / content 四层就位",
      en: "app / components / lib / content are in place",
    },
    done: true,
  },
  {
    label: { zh: "开发服务器", en: "Dev server" },
    detail: {
      zh: "pnpm dev 启动并渲染本页",
      en: "pnpm dev boots and renders this page",
    },
    done: true,
  },
];

export const tokenSwatches: { className: string; name: Localized }[] = [
  { className: "bg-brand-700", name: { zh: "主色", en: "Primary" } },
  { className: "bg-brand-200", name: { zh: "主色浅", en: "Primary soft" } },
  { className: "bg-accent-500", name: { zh: "强调色", en: "Accent" } },
  { className: "bg-surface-strong", name: { zh: "面", en: "Surface" } },
  { className: "bg-line", name: { zh: "描边", en: "Line" } },
  { className: "bg-ink", name: { zh: "文字", en: "Ink" } },
];
