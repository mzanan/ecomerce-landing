const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://landing.itsmatias.com";

export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Matias Zanan — Ecommerce Solutions",
      url: baseUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Matias Zanan",
      url: baseUrl,
      sameAs: ["https://itsmatias.com"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Ecommerce website development",
      provider: {
        "@type": "Person",
        name: "Matias Zanan",
        url: "https://itsmatias.com",
      },
      areaServed: "Worldwide",
      url: baseUrl,
      description:
        "Custom-built ecommerce landing pages and online stores with modern design and secure payments.",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
