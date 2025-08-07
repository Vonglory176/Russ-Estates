import type { Metadata } from "next";
import { BlockRenderer } from "@/components/BlockRenderer";

import { getHomePage, getGlobalSettings } from "@/data/loaders";
import { generatePageMetadata } from "@/utils/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    () => getHomePage(),
    () => getGlobalSettings(),
    "/"
  );
}

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();

  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  console.log(blocks);
  console.log(process.env.NEXT_STRAPI_API_URL);
  console.log(process.env.STRAPI_API_URL);
  return (
    <div>      
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
