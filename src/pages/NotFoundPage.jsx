import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>

      <Link to="/" style={{ color: "#1e40af" }}>
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;