import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const remaining = 100 - title.length;
  const counterColor = remaining < 10 ? "red" : "#718096";

  
  function handleSubmit(e) {
    e.preventDefault(); 

    // ถ้าชื่อเรื่องหรือเนื้อหาว่าง ห้ามส่ง
    if (!title.trim() || !body.trim()) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100} // จำกัด 100 ตัวอักษร
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ตัวนับจำนวนอักษรที่เหลือของหัวข้อ */}
      <div
        style={{
          textAlign: "right",
          color: counterColor,
          marginBottom: "0.5rem",
        }}
      >
        {title.length}/100
      </div>

      {/* ช่องใส่เนื้อหาโพสต์ */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {/* ปุ่มโพสต์ */}
      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;