"use client";
import { useState } from "react";
import Link from "next/link";
import { ReactSortable } from "react-sortablejs";
import jsPDF from "jspdf";

export default function ImgToPdf() {
  const [images, setImages] = useState<
    { id: string; name: string; url: string; rotation: number }[]
  >([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);

      const newImages = selectedFiles.map((file, idx) => ({
        id: Date.now() + "-" + idx,
        name: file.name,
        url: URL.createObjectURL(file),
        rotation: 0,
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  }

  function rotateImage(id: string) {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, rotation: (img.rotation + 90) % 360 }
          : img
      )
    );
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const imgToRemove = prev.find((img) => img.id === id);
      if (imgToRemove) URL.revokeObjectURL(imgToRemove.url);
      return prev.filter((img) => img.id !== id);
    });
  }

  async function downloadPDF() {
    const pdf = new jsPDF();

    for (let index = 0; index < images.length; index++) {
      const img = images[index];
      const imgData = await loadAndRotateImage(img.url, img.rotation);

      if (index > 0) pdf.addPage();

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let width = pageWidth - 20;
      let height = (imgData.height / imgData.width) * width;

      if (height > pageHeight - 20) {
        height = pageHeight - 20;
        width = (imgData.width / imgData.height) * height;
      }

      pdf.addImage(
        imgData.dataUrl,
        "JPEG",
        (pageWidth - width) / 2,
        (pageHeight - height) / 2,
        width,
        height
      );
    }

    pdf.save("images.pdf");
  }

  function loadAndRotateImage(
    url: string,
    rotation: number
  ): Promise<{ dataUrl: string; width: number; height: number }> {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        if (rotation % 180 === 0) {
          canvas.width = image.width;
          canvas.height = image.height;
        } else {
          canvas.width = image.height;
          canvas.height = image.width;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        resolve({
          dataUrl: canvas.toDataURL("image/jpeg", 1.0),
          width: canvas.width,
          height: canvas.height,
        });
      };
      image.src = url;
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "1rem" }}>
        📷 Image to PDF Converter
      </h1>

      {/* Upload box */}
      <label
        style={{
          display: "block",
          padding: "2rem",
          border: "2px dashed #aaa",
          borderRadius: "12px",
          textAlign: "center",
          cursor: "pointer",
          marginTop: "1rem",
          background: "#fff",
          maxWidth: "500px",
          width: "100%",
          transition: "border-color 0.3s ease",
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <p style={{ margin: 0, color: "#555", fontSize: "1rem" }}>
          📂 Drag & drop or click to select images
        </p>
      </label>

      {/* Image previews */}
      <ReactSortable
        list={images}
        setList={setImages}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              position: "relative",
              textAlign: "center",
              width: "300px",
              background: "#fff",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <img
              src={img.url}
              alt={img.name}
              style={{
                maxWidth: "200px",
                height: "auto",
                borderRadius: "6px",
                transform: `rotate(${img.rotation}deg)`,
                transition: "transform 0.3s ease",
                display: "block",
                margin: "0 auto",
              }}
            />

            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#333" }}>
              {img.name}
            </p>

            {/* Buttons */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <button
                onClick={() => rotateImage(img.id)}
                style={{
                  background: "#eee",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.4rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                🔄
              </button>
              <button
                onClick={() => removeImage(img.id)}
                style={{
                  background: "#ff6b6b",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.4rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </ReactSortable>

      {/* Download PDF button */}
      {images.length > 0 && (
        <button
          onClick={downloadPDF}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 1.5rem",
            background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
            color: "white",
            fontSize: "1rem",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          📄 Download PDF
        </button>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#1976d2", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
