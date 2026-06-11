import "./globals.css";

export const metadata = {
  title: "Biruk Getaneh | Senior Data Engineer | Portfolio",
  description: "Professional Portfolio of Biruk Getaneh, Senior Data Engineer. Expert in Medallion architectures, Apache Iceberg, Airflow pipelines, and cloud data warehouses.",
  keywords: ["Data Engineer", "Senior Data Engineer", "Apache Iceberg", "Redshift", "Snowflake", "Airflow", "Big Data", "Addis Ababa", "Ethiopia"],
  authors: [{ name: "Biruk Getaneh" }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
