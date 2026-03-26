import { useState } from "react";
import CommentList from "./CommentList";
import { useFavorites } from "../context/FavoritesContext";

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      background: "white"
    }}>
      <h3 style={{ color: "#1e40af" }}>{post.title}</h3>

      <p style={{ color: "#4a5568" }}>{post.body}</p>

      <button
        onClick={() => toggleFavorite(post.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: isFavorite ? "#e53e3e" : "#a0aec0",
        }}
      >
        {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
      </button>

      <button
        onClick={() => setShowComments((p) => !p)}
        style={{
          border: "1px solid #e2e8f0",
          padding: "0.25rem 0.75rem",
          cursor: "pointer",
        }}
      >
        {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
      </button>

      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;