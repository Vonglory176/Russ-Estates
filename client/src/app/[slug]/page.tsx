import type { Metadata } from "next";
import { getPageBySlug, getGlobalSettings } from "@/data/loaders";
import { generatePageMetadata } from "@/utils/metadata";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  
  return generatePageMetadata(
    () => getPageBySlug(slug),
    () => getGlobalSettings(),
    `/${slug}`
  );
}

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return <BlockRenderer blocks={blocks} />;
}