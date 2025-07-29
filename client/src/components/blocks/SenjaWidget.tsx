"use client";

import { useEffect } from "react";
import type { SenjaWidgetProps } from "@/types";

export function SenjaWidget({
  heading,
  subheading,
  widgetUrl,
  widgetId,
  mode = "shadow",
  lazyLoad = false,
}: Readonly<SenjaWidgetProps>) {
  // Validate required props
  if (!widgetUrl || !widgetId) {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid red",
          backgroundColor: "#ffe6e6",
        }}
      >
        <h3>Senja Widget Error</h3>
        <p>Missing required props: widgetUrl or widgetId</p>
      </div>
    );
  }

  // Ensure the URL ends with /platform.js
  const scriptUrl = widgetUrl.endsWith("/platform.js")
    ? widgetUrl
    : `${widgetUrl}/platform.js`;

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) return;

    // Load the Senja widget script
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      const scriptToRemove = document.querySelector(
        `script[src="${scriptUrl}"]`
      );
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [scriptUrl, widgetId, mode, lazyLoad]);

  return (
    <div className="senja-widget">
      <h2 className="senja-widget__heading">{heading}</h2>
      <p className="senja-widget__subheading">{subheading}</p>
      <div
        className="senja-embed"
        data-id={widgetId}
        data-mode={mode}
        data-lazyload={lazyLoad.toString()}
        style={{ display: "block", width: "100%" }}
      />
    </div>
  );
}
