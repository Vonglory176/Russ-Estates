import type { Block } from "@/types";

import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { SenjaWidget } from "@/components/blocks/SenjaWidget";
import { FormSection } from "./blocks/FormSection";

// import { Heading } from "@/components/blocks/Heading";
// import { ParagraphWithImage } from "@/components/blocks/ParagraphWithImage";
// import { Paragraph } from "@/components/blocks/Paragraph";
// import { FullImage } from "@/components/blocks/FullImage";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-block":
      return <InfoBlock {...block} key={index} />;
    case "blocks.services-section":
      return <ServicesSection {...block} key={index} />;
    case "blocks.senja-widget":
      return <SenjaWidget {...block} key={index} />;
    case "blocks.form-section":
      return <FormSection {...block} key={index} />;
    // case "blocks.heading":
    //   return <Heading {...block} key={index} />;
    // case "blocks.paragraph-with-image":
    //   return <ParagraphWithImage {...block} key={index} />;
    // case "blocks.paragraph":
    //   return <Paragraph {...block} key={index} />;
    // case "blocks.full-image":
    //   return <FullImage {...block} key={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
