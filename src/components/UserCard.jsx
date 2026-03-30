function UserCard({ name, email }) {
  // เอาตัวอักษรแรกของชื่อ และแปลงเป็นตัวพิมพ์ใหญ่
  const firstChar = name.charAt(0).toUpperCase();

  // กำหนดสีเริ่มต้น
  let bgColor = "#3b82f6"; // น้ำเงิน

  // เลือกสีตามช่วงตัวอักษร
  if (firstChar >= "A" && firstChar <= "G") {
    bgColor = "#3b82f6"; // น้ำเงิน
  } else if (firstChar >= "H" && firstChar <= "N") {
    bgColor = "#22c55e"; // เขียว
  } else {
    bgColor = "#a855f7"; // ม่วง
  }

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {/* Avatar */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: bgColor,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {firstChar}
      </div>

      {/* ข้อมูลผู้ใช้ */}
      <div>
        <p style={{ margin: 0 }}>{name}</p>
        <small>{email}</small>
      </div>
    </div>
  );
}

export default UserCard;
``