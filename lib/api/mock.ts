import { pick, type Locale } from "@/lib/content";
import type {
  AboutPage,
  Api,
  ContactPage,
  HomePage,
  ListParams,
  LocalizedData,
  NewsArticle,
  Paged,
  Project,
  Service,
  SiteSettings,
} from "./types";

function loc<T>(value: LocalizedData<T>, locale: Locale): Promise<T> {
  return Promise.resolve(pick(value, locale));
}

const media = (url: string, w = 1600, h = 900, alt = "") => ({
  url,
  width: w,
  height: h,
  alternativeText: alt || undefined,
});

const projects: LocalizedData<Project[]> = {
  zh: [
    {
      slug: "azure-residence",
      title: "Azure 山居住宅",
      category: "空间设计",
      year: "2025",
      client: "私人业主",
      cover: media("/mock/covers/azure-residence.svg", 1600, 1000, "Azure 山居住宅"),
      gallery: [media("/mock/gallery/azure-1.svg"), media("/mock/gallery/azure-2.svg")],
      description:
        "以「借景」为核心的山地住宅改造：将大面积落地窗朝向谷地，室内以微水泥与原木构成安静底色。",
    },
    {
      slug: "mono-coffee-brand",
      title: "MONO 咖啡品牌识别",
      category: "品牌设计",
      year: "2025",
      client: "MONO Coffee",
      cover: media("/mock/covers/mono-coffee.svg", 1600, 1000, "MONO 咖啡品牌"),
      gallery: [media("/mock/gallery/mono-1.svg")],
      description:
        "从字体到包装的整套识别系统，以单色印刷与留白传达「一杯黑咖啡的秩序感」。",
    },
    {
      slug: "flux-museum-wayfinding",
      title: "FLUX 美术馆导视系统",
      category: "数字体验",
      year: "2024",
      client: "FLUX 美术馆",
      cover: media("/mock/covers/flux-museum.svg", 1600, 1000, "FLUX 美术馆导视"),
      gallery: [media("/mock/gallery/flux-1.svg"), media("/mock/gallery/flux-2.svg")],
      description:
        "结合实体导视与小程序室内导航的双通道方案，展讯更新经 CMS 即时同步到终端。",
    },
  ],
  en: [
    {
      slug: "azure-residence",
      title: "Azure Mountain Residence",
      category: "Spatial Design",
      year: "2025",
      client: "Private Client",
      cover: media("/mock/covers/azure-residence.svg", 1600, 1000, "Azure Mountain Residence"),
      gallery: [media("/mock/gallery/azure-1.svg"), media("/mock/gallery/azure-2.svg")],
      description:
        "A mountain-house renovation built around borrowed scenery: floor-to-ceiling glazing faces the valley while micro-cement and raw oak set a quiet tone.",
    },
    {
      slug: "mono-coffee-brand",
      title: "MONO Coffee Identity",
      category: "Brand Design",
      year: "2025",
      client: "MONO Coffee",
      cover: media("/mock/covers/mono-coffee.svg", 1600, 1000, "MONO Coffee identity"),
      gallery: [media("/mock/gallery/mono-1.svg")],
      description:
        "A full identity system from typeface to packaging, using monochrome printing and negative space to express the order of a black coffee.",
    },
    {
      slug: "flux-museum-wayfinding",
      title: "FLUX Museum Wayfinding",
      category: "Digital Experience",
      year: "2024",
      client: "FLUX Museum",
      cover: media("/mock/covers/flux-museum.svg", 1600, 1000, "FLUX Museum wayfinding"),
      gallery: [media("/mock/gallery/flux-1.svg"), media("/mock/gallery/flux-2.svg")],
      description:
        "A dual-channel system pairing physical signage with an in-app indoor guide; exhibition updates sync from the CMS to every terminal.",
    },
  ],
};

const services: LocalizedData<Service[]> = {
  zh: [
    {
      slug: "brand-identity",
      title: "品牌识别",
      summary: "策略、命名、视觉系统与落地规范。",
      detail: "从市场定位出发建立品牌叙事，交付标志、字体、色彩、版式与应用规范，并提供首发物料支持。",
      icon: "palette",
    },
    {
      slug: "spatial-design",
      title: "空间设计",
      summary: "商业空间、办公与住宅的一体化设计。",
      detail: "覆盖概念、方案、施工图与现场配合，兼顾动线、材料、灯光与成本控制。",
      icon: "ruler",
    },
    {
      slug: "digital-experience",
      title: "数字体验",
      summary: "官网、小程序与展陈交互界面。",
      detail: "以内容系统为中心设计前后端，交付可维护的组件库与 CMS 工作流。",
      icon: "monitor",
    },
    {
      slug: "content-strategy",
      title: "内容策略",
      summary: "双语内容规划与视觉传达顾问。",
      detail: "梳理信息架构与语气规范，制定跨渠道内容日历与素材体系。",
      icon: "book",
    },
  ],
  en: [
    {
      slug: "brand-identity",
      title: "Brand Identity",
      summary: "Strategy, naming, visual systems and guidelines.",
      detail: "We build the brand narrative from market positioning, delivering logo, type, color, layout and application guidelines with launch support.",
      icon: "palette",
    },
    {
      slug: "spatial-design",
      title: "Spatial Design",
      summary: "Integrated retail, workplace and residential design.",
      detail: "From concept to construction documents and site supervision, balancing circulation, materials, lighting and cost control.",
      icon: "ruler",
    },
    {
      slug: "digital-experience",
      title: "Digital Experience",
      summary: "Websites, mini-programs and exhibition interfaces.",
      detail: "Design anchored on the content system, shipping a maintainable component library and CMS workflow.",
      icon: "monitor",
    },
    {
      slug: "content-strategy",
      title: "Content Strategy",
      summary: "Bilingual content planning and communication advisory.",
      detail: "Information architecture, voice guidelines, cross-channel content calendar and asset system.",
      icon: "book",
    },
  ],
};

const news: LocalizedData<NewsArticle[]> = {
  zh: [
    {
      slug: "studio-wins-gd-award",
      title: "工作室获 GD 传达视觉奖",
      date: "2025-08-12",
      cover: media("/mock/covers/news-award.svg", 1600, 900, "获奖公告"),
      excerpt: "MONO 咖啡品牌识别获年度传达视觉奖品牌类提名。",
      content:
        "MONO 咖啡品牌识别从 340 件参赛作品中脱颖而出，获得品牌类年度提名。\n\n评委会认为其「以极少的元素完成了完整的叙述」：一套字体、两种油墨、大量留白，把一杯黑咖啡的秩序感讲完整。\n\n获奖作品展将于 10 月在上海设计周期间亮相，届时同步公开项目方法论手册。",
    },
    {
      slug: "flux-museum-opens",
      title: "FLUX 美术馆正式开馆",
      date: "2024-11-02",
      cover: media("/mock/covers/news-flux.svg", 1600, 900, "FLUX 开馆"),
      excerpt: "历时 14 个月设计的导视系统随新馆同步启用。",
      content:
        "FLUX 美术馆新馆于 11 月 2 日开馆，工作室设计的实体导视与室内导航小程序同步上线，覆盖 6 个展厅与 3 层公共区域。\n\n导视系统与展陈内容共用一套 CMS：展讯更新一次，指示牌二维码与小程序同时生效。\n\n开馆首周客流超过 2 万人次，导航小程序日均使用 4000 次。",
    },
    {
      slug: "design-system-talk",
      title: "工作室受邀参加设计系统公开讲座",
      date: "2024-05-18",
      cover: media("/mock/covers/news-talk.svg", 1600, 900, "公开讲座"),
      excerpt: "高野在上海设计周分享 CMS 驱动的设计系统实践。",
      content:
        "技术负责人高野受邀在上海设计周「系统之美」专场发言，以 FLUX 美术馆项目为例，讲解组件库与内容后台如何协同。\n\n讲座实录将整理成文章发布于本栏目。",
    },
    {
      slug: "studio-new-office",
      title: "工作室迁入永嘉路新空间",
      date: "2023-09-01",
      cover: media("/mock/covers/news-office.svg", 1600, 900, "新工作室"),
      excerpt: "三层复合空间集工作室、材料库与客户洽谈区于一体。",
      content:
        "9 月起工作室迁至徐汇区永嘉路 300 号二层，新空间由团队自行设计改造：一层材料库、二层办公、三层洽谈与放映。\n\n空间改造延续了「克制」的基调：微水泥、原木与可变照明，欢迎预约来访。",
    },
  ],
  en: [
    {
      slug: "studio-wins-gd-award",
      title: "Studio nominated for GD Communication Design Award",
      date: "2025-08-12",
      cover: media("/mock/covers/news-award.svg", 1600, 900, "Award announcement"),
      excerpt: "MONO Coffee identity receives a brand-category nomination of the year.",
      content:
        "Selected from 340 entries, the MONO Coffee identity earned a brand-category nomination of the year.\n\nThe jury praised it for «completing a full narrative with minimal elements»: one typeface, two inks, generous whitespace.\n\nThe winning works will tour during Shanghai Design Week in October, alongside a public methodology booklet.",
    },
    {
      slug: "flux-museum-opens",
      title: "FLUX Museum opens its new building",
      date: "2024-11-02",
      cover: media("/mock/covers/news-flux.svg", 1600, 900, "FLUX opening"),
      excerpt: "The wayfinding system we spent 14 months on launches with the new wings.",
      content:
        "FLUX Museum opened on November 2 with our physical wayfinding and indoor-navigation app covering six halls and three public floors.\n\nSignage and exhibition content share one CMS: update once, and every terminal reflects it immediately.\n\nThe first week drew over 20,000 visitors, with the guide app used 4,000 times a day.",
    },
    {
      slug: "design-system-talk",
      title: "Studio invited to public talk on design systems",
      date: "2024-05-18",
      cover: media("/mock/covers/news-talk.svg", 1600, 900, "Public talk"),
      excerpt: "Gao Ye shares our CMS-driven design system practice at Shanghai Design Week.",
      content:
        "Head of technology Gao Ye spoke at the «Beauty of Systems» session, using the FLUX project to show how a component library and a content back office work together.\n\nA transcript will be published in this section.",
    },
    {
      slug: "studio-new-office",
      title: "Studio moves into its new space on Yongjia Road",
      date: "2023-09-01",
      cover: media("/mock/covers/news-office.svg", 1600, 900, "New studio"),
      excerpt: "Three floors combining studio, material library and client meeting rooms.",
      content:
        "Since September the studio sits on the second floor of 300 Yongjia Road, redesigned by the team itself: material library below, studio in the middle, meeting and screening room above.\n\nThe interior keeps our restrained tone — micro-cement, raw oak and adjustable lighting. Visits are welcome by appointment.",
    },
  ],
};

const siteSettings: LocalizedData<SiteSettings> = {
  zh: {
    siteName: "拾贝设计",
    logo: media("/mock/logo.svg", 120, 32, "拾贝设计"),
    nav: [
      { label: "首页", href: "/" },
      { label: "项目", href: "/works" },
      { label: "服务", href: "/services" },
      { label: "新闻", href: "/news" },
      { label: "关于", href: "/about" },
      { label: "联系", href: "/contact" },
    ],
    footer: {
      address: "上海市徐汇区永嘉路 300 号 2 层",
      email: "hello@shell-design.example.com",
      phone: "+86 21 6400 0000",
      copyright: "© 2026 拾贝设计 Shell Design",
      social: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Behance", href: "https://behance.net" },
        { label: "微信", href: "#" },
      ],
    },
  },
  en: {
    siteName: "Shell Design",
    logo: media("/mock/logo.svg", 120, 32, "Shell Design"),
    nav: [
      { label: "Home", href: "/" },
      { label: "Works", href: "/works" },
      { label: "Services", href: "/services" },
      { label: "News", href: "/news" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      address: "2F, 300 Yongjia Road, Xuhui, Shanghai",
      email: "hello@shell-design.example.com",
      phone: "+86 21 6400 0000",
      copyright: "© 2026 Shell Design",
      social: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Behance", href: "https://behance.net" },
        { label: "WeChat", href: "#" },
      ],
    },
  },
};

const homePage: LocalizedData<HomePage> = {
  zh: {
    hero: {
      title: "为品牌与空间做出克制的设计",
      subtitle: "拾贝设计是一间跨品牌、空间与数字体验的设计工作室。",
      image: media("/mock/hero.svg", 2400, 1350, "工作室现场"),
      cta: { label: "查看项目", href: "/works" },
    },
    featuredProjects: projects.zh.slice(0, 3),
    servicePreview: services.zh.slice(0, 3),
    aboutPreview: "十二年、四个学科、一支 14 人的团队——我们相信好设计来自约束。",
  },
  en: {
    hero: {
      title: "Restrained design for brands and spaces",
      subtitle: "Shell Design is a studio working across brand, spatial and digital experience.",
      image: media("/mock/hero.svg", 2400, 1350, "Studio at work"),
      cta: { label: "View works", href: "/works" },
    },
    featuredProjects: projects.en.slice(0, 3),
    servicePreview: services.en.slice(0, 3),
    aboutPreview: "Twelve years, four disciplines, a team of 14 — we believe good design comes from constraints.",
  },
};

const aboutPage: LocalizedData<AboutPage> = {
  zh: {
    title: "关于拾贝",
    intro: "拾贝设计成立于 2014 年，业务覆盖品牌识别、空间设计与数字体验，客户包括美术馆、消费品牌与地产开发商。",
    team: [
      { name: "陈拾", role: "创始人 / 创意总监" },
      { name: "Lena Wu", role: "设计总监" },
      { name: "高野", role: "技术负责人" },
    ],
    timeline: [
      { year: "2014", event: "工作室成立于上海" },
      { year: "2019", event: "成立数字体验组" },
      { year: "2023", event: "团队扩展至 14 人" },
      { year: "2025", event: "MONO 项目获 GD 提名" },
    ],
  },
  en: {
    title: "About Shell Design",
    intro: "Founded in Shanghai in 2014, Shell Design works across brand identity, spatial design and digital experience for museums, consumer brands and developers.",
    team: [
      { name: "Shi Chen", role: "Founder / Creative Director" },
      { name: "Lena Wu", role: "Design Director" },
      { name: "Gao Ye", role: "Head of Technology" },
    ],
    timeline: [
      { year: "2014", event: "Studio founded in Shanghai" },
      { year: "2019", event: "Digital experience practice starts" },
      { year: "2023", event: "Team grows to 14" },
      { year: "2025", event: "MONO nominated for the GD award" },
    ],
  },
};

const contactPage: LocalizedData<ContactPage> = {
  zh: {
    title: "联系我们",
    info: {
      address: "上海市徐汇区永嘉路 300 号 2 层",
      email: "hello@shell-design.example.com",
      phone: "+86 21 6400 0000",
      hours: "周一至周五 10:00–19:00",
    },
    formConfig: {
      fields: ["name", "email", "phone", "company", "message"],
      required: ["name", "email", "message"],
      submitLabel: "发送",
    },
  },
  en: {
    title: "Contact us",
    info: {
      address: "2F, 300 Yongjia Road, Xuhui, Shanghai",
      email: "hello@shell-design.example.com",
      phone: "+86 21 6400 0000",
      hours: "Mon–Fri 10:00–19:00",
    },
    formConfig: {
      fields: ["name", "email", "phone", "company", "message"],
      required: ["name", "email", "message"],
      submitLabel: "Send",
    },
  },
};

function paginate<T>(items: T[], params?: ListParams): Paged<T> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? items.length;
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

export const mockApi: Api = {
  getSiteSettings: (locale) => loc(siteSettings, locale),
  getHomePage: async (locale) => {
    const [page, ps, sv] = await Promise.all([
      loc(homePage, locale),
      loc(projects, locale),
      loc(services, locale),
    ]);
    return {
      ...page,
      featuredProjects: ps.slice(0, 2),
      servicePreview: sv.slice(0, 3),
    };
  },
  getAboutPage: (locale) => loc(aboutPage, locale),
  getContactPage: (locale) => loc(contactPage, locale),
  listProjects: async (locale, params) =>
    paginate(await loc(projects, locale), params),
  getProject: async (locale, slug) =>
    (await loc(projects, locale)).find((p) => p.slug === slug) ?? null,
  listServices: async (locale, params) =>
    paginate(await loc(services, locale), params),
  getService: async (locale, slug) =>
    (await loc(services, locale)).find((s) => s.slug === slug) ?? null,
  listNews: async (locale, params) =>
    paginate(await loc(news, locale), params),
  getNews: async (locale, slug) =>
    (await loc(news, locale)).find((n) => n.slug === slug) ?? null,
  submitContactForm: (input) => {
    if (!input.name || !input.email || !input.message) {
      return Promise.resolve({ ok: false, error: "必填字段缺失 / missing required fields" });
    }
    return Promise.resolve({ ok: true, id: `mock-${Date.now()}` });
  },
};
