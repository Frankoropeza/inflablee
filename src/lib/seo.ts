import { SITE } from "@/data/site";

export interface BreadcrumbItem { name: string; href?: string; }

interface PageMetadataInput {
  title: string;
  description: string;
  pathname: string;
  canonical?: string;
}

export function buildPageMetadata({ title, description, pathname, canonical }: PageMetadataInput) {
  const brand = " | INFLABLEE";
  const fit = (value: string, max: number) => value.length <= max ? value : `${value.slice(0, max - 1).replace(/\s+\S*$/, "").trimEnd()}…`;
  const seoTitle = title.length <= 60 ? title : title.endsWith(brand)
    ? `${title.slice(0, 60 - brand.length).replace(/\s+\S*$/, "").trimEnd()}${brand}`
    : fit(title, 60);
  return {
    title: seoTitle,
    description: fit(description, 155),
    canonical: canonical ?? new URL(pathname, SITE.url).href,
  };
}

export function buildPageSchemas({ breadcrumbs, schema }: { breadcrumbs?: BreadcrumbItem[]; schema?: object | object[] }) {
  const breadcrumb = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: new URL(item.href, SITE.url).href } : {}),
    })),
  } : null;
  return [
    ...(breadcrumb ? [breadcrumb] : []),
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
  ];
}
