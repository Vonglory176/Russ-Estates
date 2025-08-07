import type { Metadata } from "next";
import { getStrapiUrl } from "./get-strapi-url";

interface SEOComponent {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: {
    url: string;
    alternativeText?: string;
  };
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: any;
}

interface GlobalMetadata {
  websiteName?: string;
  seo?: SEOComponent;
}

interface PageMetadata {
  seo?: SEOComponent;
}

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  linkedinInsightTag?: string;
}

interface VerificationConfig {
  google?: string;
  bing?: string;
  yandex?: string;
  yahoo?: string;
  facebook?: string;
}

interface MetadataConfig {
  analytics?: AnalyticsConfig;
  verification?: VerificationConfig;
  noIndex?: boolean;
  canonicalUrl?: string;
}

/**
 * Formats a page title with the website name
 */
function formatPageTitle(pageTitle: string, websiteName: string): string {
  if (!pageTitle) return websiteName;
  if (!websiteName) return pageTitle;
  
  // If the page title already contains the website name, return as is
  if (pageTitle.toLowerCase().includes(websiteName.toLowerCase())) {
    return pageTitle;
  }
  
  // Format as "Page Title | Website Name"
  return `${pageTitle} | ${websiteName}`;
}

/**
 * Truncates text to a specified length
 */
function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Generates metadata with smart fallbacks
 * Priority: Page SEO → Global SEO → Defaults
 */
export function generateMetadata(
  globalMetadata: GlobalMetadata,
  pageMetadata?: PageMetadata,
  pathname: string = "/",
  config?: MetadataConfig
): Metadata {
  // Extract SEO data from components
  const globalSEO = globalMetadata.seo;
  const pageSEO = pageMetadata?.seo;
  const websiteName = globalMetadata.websiteName || "Russ Estates";
  
  // Smart fallback logic: Page SEO → Global SEO → Defaults
  const pageMetaTitle = pageSEO?.metaTitle || globalSEO?.metaTitle;
  const pageMetaDescription = pageSEO?.metaDescription || globalSEO?.metaDescription || "Professional real estate investment and property management services";
  
  console.log("pageMetaTitle", pageMetaTitle)
  console.log("globalSEO", globalSEO)
  
  // Format the final title with website name
  const finalTitle = formatPageTitle(pageMetaTitle || "", websiteName);
  
  // Auto-generate Open Graph and Twitter titles/descriptions
  const ogTitle = truncateText(finalTitle, 60);
  const ogDescription = truncateText(pageMetaDescription, 90);
  const twitterTitle = truncateText(finalTitle, 70);
  const twitterDescription = truncateText(pageMetaDescription, 125);
  
  // Use page-specific OG image if available, otherwise fall back to global
  const ogImage = pageSEO?.openGraphImage || globalSEO?.openGraphImage;
  
  // Canonical URL
  const canonicalUrl = pageSEO?.canonicalUrl || config?.canonicalUrl;
  
  // Robots directives
  const noIndex = pageSEO?.noIndex || config?.noIndex || false;
  const noFollow = pageSEO?.noFollow || false;
  
  const baseUrl = getStrapiUrl().replace("/api", "");
  const fullUrl = canonicalUrl || `${baseUrl}${pathname}`;

  const metadata: Metadata = {
    title: finalTitle,
    description: pageMetaDescription,
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      siteName: websiteName,
      images: ogImage ? [
        {
          url: ogImage.url.startsWith("http") ? ogImage.url : `${baseUrl}${ogImage.url}`,
          width: 1200,
          height: 630,
          alt: ogImage.alternativeText || ogTitle,
        }
      ] : undefined,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: ogImage ? [
        {
          url: ogImage.url.startsWith("http") ? ogImage.url : `${baseUrl}${ogImage.url}`,
          alt: ogImage.alternativeText || twitterTitle,
        }
      ] : undefined,
    },
    robots: {
      index: noIndex ? false : true,
      follow: noFollow ? false : true,
      googleBot: {
        index: noIndex ? false : true,
        follow: noFollow ? false : true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      ...(config?.verification?.google && { google: config.verification.google }),
      ...(config?.verification?.bing && { other: { "msvalidate.01": config.verification.bing } }),
      ...(config?.verification?.yandex && { other: { "yandex-verification": config.verification.yandex } }),
      ...(config?.verification?.yahoo && { other: { "y_key": config.verification.yahoo } }),
    },
    ...(pageSEO?.structuredData && {
      other: {
        "application/ld+json": JSON.stringify(pageSEO.structuredData),
      },
    }),
  };

  // Add analytics scripts if provided
  if (config?.analytics) {
    const analyticsScripts: string[] = [];
    
    if (config.analytics.googleAnalyticsId) {
      analyticsScripts.push(`
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.analytics.googleAnalyticsId}');
        </script>
      `);
    }
    
    if (config.analytics.googleTagManagerId) {
      analyticsScripts.push(`
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.analytics.googleTagManagerId}');</script>
      `);
    }
    
    if (config.analytics.facebookPixelId) {
      analyticsScripts.push(`
        <!-- Facebook Pixel -->
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${config.analytics.facebookPixelId}');
          fbq('track', 'PageView');
        </script>
      `);
    }
    
    if (analyticsScripts.length > 0) {
      metadata.other = {
        ...metadata.other,
        "analytics-scripts": analyticsScripts.join('\n'),
      } as any;
    }
  }

  return metadata;
}

/**
 * Generates metadata for a page with automatic fallback handling
 * This is the main function to use in page components
 */
export async function generatePageMetadata(
  pageDataLoader: () => Promise<any>,
  globalDataLoader: () => Promise<any>,
  pathname: string = "/",
  config?: MetadataConfig
): Promise<Metadata> {
  try {
    // Try to get both page and global data
    const [pageData, globalData] = await Promise.all([
      pageDataLoader(),
      globalDataLoader(),
    ]);

    // Check if we have valid data
    if (!globalData?.data) {
      return {
        title: "Russ Estates",
        description: "Professional real estate services",
      };
    }

    return generateMetadata(
      {
        websiteName: globalData.data.websiteName,
        seo: globalData.data.seo,
      },
      pageData?.data ? { seo: pageData.data.seo } : undefined,
      pathname,
      config
    );
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback to basic metadata
    return {
      title: "Russ Estates",
      description: "Professional real estate services",
    };
  }
}

// Helper function to generate metadata for specific page types
export function generateHomePageMetadata(
  globalMetadata: GlobalMetadata,
  pageMetadata?: PageMetadata,
  config?: MetadataConfig
): Metadata {
  return generateMetadata(globalMetadata, pageMetadata, "/", config);
}

export function generatePropertyPageMetadata(
  globalMetadata: GlobalMetadata,
  pageMetadata?: PageMetadata,
  propertyData?: any,
  config?: MetadataConfig
): Metadata {
  return generateMetadata(globalMetadata, pageMetadata, "/", config);
} 