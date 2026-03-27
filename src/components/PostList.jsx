import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext";

function PostList() {

  // ใช้ FavoritesContext เพื่อดึงรายการโพสต์ที่ถูกใจ
  const { favorites } = useFavorites();
  // ตัวแปรเก็บข้อมูลโพสต์จาก API
  const [posts, setPosts] = useState([]);
  // สถานะโหลดข้อมูล (true = กำลังโหลด)
  const [loading, setLoading] = useState(true);
  // เก็บข้อความ error ถ้าดึงข้อมูลไม่สำเร็จ
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // ใช้กำหนดว่าจะเรียงโพสต์แบบใหม่สุดหรือเก่าสุด
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 10; // จำนวนโพสต์ต่อหน้า

  // ฟังก์ชันโหลดข้อมูลโพสต์จาก API
  async function fetchPosts() {
    try {
      setLoading(true);  
      setError(null);    

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

      const data = await res.json();

      // เอาโพสต์มาแค่ 20 รายการ
      setPosts(data.slice(0, 20));

    } catch (err) {
      setError(err.message);  // หากเกิด error ให้เก็บข้อความไว้
    } finally {
      setLoading(false);  // โหลดเสร็จแล้ว
    }
  }

  // โหลดข้อมูลตอนเปิด component ครั้งแรก
  useEffect(() => {
    fetchPosts();
  }, []);

  // กรองโพสต์จากคำค้นหา
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // เรียงลำดับโพสต์ตามค่า sortOrder
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Newest") return b.id - a.id;
    return a.id - b.id;
  });

  // ตัดโพสต์เฉพาะหน้าปัจจุบัน (Pagination)
  const paginated = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // แสดง Loading ระหว่างดึงข้อมูล
  if (loading) return <LoadingSpinner />;

  // แสดง error ถ้ามีปัญหา
  if (error)
    return <div style={{ color: "red", padding: "1rem" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>

      {/* ส่วนหัวของหน้า + ปุ่มโหลดใหม่ */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "#ffffff", borderBottom: "2px solid #1e40af" }}>
          โพสต์ล่าสุด
        </h2>

        {/* ปุ่มเรียก fetchPosts เพื่อโหลดข้อมูลใหม่ */}
        <button
          onClick={fetchPosts}
          style={{
            background: "#1e40af",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      {/* แสดงจำนวนโพสต์ที่ผ่านการกรอง */}
      <PostCount count={filtered.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />

      {/* ปุ่มเรียงลำดับโพสต์ */}
      <div style={{ textAlign: "right", margin: "1rem 0" }}>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")
          }
          style={{
            background: "#1e40af",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
          }}
        >
          เรียงลำดับ: {sortOrder === "Newest" ? "ใหม่สุด" : "เก่าสุด"}
        </button>
      </div>

      {/* ระบบแบ่งหน้า Pagination */}
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ← ก่อนหน้า
        </button>

        <span style={{ margin: "0 1rem" }}>
          หน้า {currentPage} / {Math.ceil(sorted.length / PER_PAGE)}
        </span>

        <button
          disabled={currentPage === Math.ceil(sorted.length / PER_PAGE)}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ถัดไป →
        </button>
      </div>

      {/* แสดงรายการโพสต์ของหน้านี้ */}
      {paginated.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* ถ้าไม่มีโพสต์ให้แสดงข้อความแจ้ง */}
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}
    </div>
  );
}

export default PostList;