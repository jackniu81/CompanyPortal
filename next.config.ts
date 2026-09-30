import type { NextConfig } from "next";

function parseUrl(name: string, value: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`环境变量 ${name} 不是合法的绝对 URL: "${value}"`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`环境变量 ${name} 必须使用 http/https 协议: "${value}"`);
  }
  return url;
}

function validateEnv(): {
  strapiUrl?: URL;
  siteUrl?: URL;
} {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK;
  if (useMock !== undefined && useMock !== "true" && useMock !== "false") {
    throw new Error(
      `NEXT_PUBLIC_USE_MOCK 只能为 "true" 或 "false"，当前为 "${useMock}"`,
    );
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    ? parseUrl("NEXT_PUBLIC_STRAPI_URL", process.env.NEXT_PUBLIC_STRAPI_URL)
    : undefined;

  if (useMock === "false") {
    if (!strapiUrl) {
      throw new Error("关闭 mock（NEXT_PUBLIC_USE_MOCK=false）时必须配置 NEXT_PUBLIC_STRAPI_URL");
    }
    if (!process.env.STRAPI_TOKEN) {
      throw new Error("关闭 mock（NEXT_PUBLIC_USE_MOCK=false）时必须配置 STRAPI_TOKEN（仅服务端使用的只读 token）");
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? parseUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

  return { strapiUrl, siteUrl };
}

const env = validateEnv();

const nextConfig: NextConfig = {
  images: {
    // 仅放行 Strapi 媒体库与站点自身域名的远程图片
    remotePatterns: [
      ...(env.strapiUrl
        ? [
            {
              protocol: env.strapiUrl.protocol.slice(0, -1) as "http" | "https",
              hostname: env.strapiUrl.hostname,
              port: env.strapiUrl.port,
              pathname: "/uploads/**",
            },
          ]
        : []),
      ...(env.siteUrl
        ? [
            {
              protocol: env.siteUrl.protocol.slice(0, -1) as "http" | "https",
              hostname: env.siteUrl.hostname,
              port: env.siteUrl.port,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
