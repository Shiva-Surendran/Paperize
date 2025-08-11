"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
        fontFamily: "sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "14px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
            color: "#222",
          }}
        >
          📚 Paperize
        </h1>
        <p
          style={{
            color: "#444",
            fontSize: "1.1rem",
            marginBottom: "2rem",
          }}
        >
          Your all-in-one toolkit for converting, editing, and managing documents.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Image to PDF */}
          <Link
            href="/imgtopdf"
            style={{
              display: "block",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #f6d365, #fda085)",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#222",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>🖼 Image to PDF</h2>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Convert and reorder images into a single PDF file.
            </p>
          </Link>

          {/* EPUB to PDF */}
          <Link
            href="/ePubToPdf"
            style={{
              display: "block",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#222",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>📖 EPUB to PDF</h2>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>
              Convert EPUB eBooks into professional, printable PDFs.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
