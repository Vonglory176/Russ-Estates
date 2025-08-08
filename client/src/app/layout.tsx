import { Geist, Geist_Mono } from "next/font/google";
import "../sass/main.scss";
// import "../app/globals.css";

import { getGlobalSettings } from "@/data/loaders";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function loader() {
  try {
    const { data } = await getGlobalSettings()
    console.dir(data, { depth: null })
    if (!data) {
      console.warn("No global settings data available, using fallback")
      return { header: null, footer: null }
    }
    return { header: data?.header, footer: data?.footer }
  } catch (error) {
    console.warn("Failed to fetch global settings:", error)
    return { header: null, footer: null }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer } = await loader()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header data={header} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}

/*/////// TODO NOTES //////////////////////////////////////////////////////////

KEEP IN MIND -------------------------

- Headline
  - Heading
  - Subheading

- Strapi Data Transfers
  - https://docs.strapi.io/cms/data-management/transfer
  - https://www.youtube.com/watch?v=RlAv2RNbQjE
  - https://github.com/strapi/strapi/issues/17749

GENERAL -------------------------

  Before Deployment ////////////////////////////////////

  - Auth Access
    - Production Vercel is open Access
    - Staging Vercel is protected (make sure Angel & Russ have personal accounts / the general login)
    - Share Strapi login credentials with Angel (Both Production & Staging -- EXPRESS PROCESS FOR EDITING/DEVELOPMENT)
  
  - Update footer
  
  - Figure out how to start Strapi-Staging in "Development Mode"

  - Add code to display NODE_ENV somewhere in site header?

  
  
  After Deployment /////////////////////////////////////

  - Sitemap & Robots.txt

  - Swap out Hubspot for "InvestorFuse"

  - Info Section
    - Add background image option
    - Add "Highlights" (11+ Years in Business / 20+ Sales / 5 Star Rating)

  - Services / Info Sections
    - Flush out "Theme" options

  - Probably want to move code (like body-overflow) into context provider

  - Make Navbar disapear when scrolling down, and reappear when scrolling up?

  - Standardize Colors / vars
  - Standarize Font sizes / vars (Kind of done)

  - Replace SENJA Widget with custom Zillow Widget

  - Really need to clean up "ContactForm / FormSection" naming conventions, it's a mess
  - BackgroundDarken is not hooked up to anything

  - Add "Aligntment" options to Services Section

  - Replicate the GForm mechanics of "Property Address" automatically breaking into multiple fields (Check competitor sites for examples)

  - Fix Image rendering issues (optimization is currently off)
    - https://stackoverflow.com/questions/78082019/invalid-image-optimize-request-error-with-nextjs-on-production-with-vercel
    - https://github.com/vercel/next.js/discussions/20138
    - https://github.com/vercel/next.js/discussions/80899
    - https://strapi.io/blog/request-strapi-s-rest-api-behind-a-content-delivery-network-cdn
    - https://market.strapi.io/plugins/strapi-plugin-cdn-prefix


BUGS ----------------------------

- "Reversed" Info Section boolean is not working

- Hero Section Form has weird (transition related?) bug
  - Scroll out of view, change viewport size, scroll back into view

- Form Validation Controls in Strapi (Required / customErrorMessage / etc.) do not work
  - Currently disabled (removed from all form fields). To reinstate, re-add "Field Validation Rules" to "Form Field Configuration".

- Whole application crashes when server is down. Need to create backup "offline page" (or similar)


CONCEPTS ------------------------

- Include Map of sold properties? Maybe have tabs between Sold/Listed?
  - (ALREADY SOMETHING SIMILAR ON ZILLOW PAGE !!!!) - Cannibalize API?


*//////////////////////////////////////////////////////////////////////////////