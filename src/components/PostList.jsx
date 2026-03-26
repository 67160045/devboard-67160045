import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext";

function PostList() {
  const { favorites } = useFavorites();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 10;

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Newest") return b.id - a.id;
    return a.id - b.id;
  });

  const paginated = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "#ffffff", borderBottom: "2px solid #1e40af" }}>
          โพสต์ล่าสุด
        </h2>

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

      <PostCount count={filtered.length} />

      {/* Search */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      {/* Sort */}
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

      {/* Pagination */}
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

      {/* Posts */}
      {paginated.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {filtered.length === 0 && <p>ไม่พบโพสต์ที่ค้นหา</p>}
    </div>
  );
}

export default PostList;