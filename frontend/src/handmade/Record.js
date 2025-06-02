import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./RecordGrid.module.css";

export default function Record() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/shortcuts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecords(
          res.data.map((r, idx) => ({
            id: idx + 1,
            name: r.name,
            url: r.target,
            iconPath: r.iconPath,
            imageUrl: getImageUrl(r.iconPath),
          }))
        );
      } catch (err) {
        console.error("불러오기 실패:", err);
        alert("바로가기 목록 불러오기 중 오류 발생");
      }
    };
    fetchRecords();
  }, []);

  const getImageUrl = (iconPath) => {
    if (!iconPath) return null;
    const fileName = iconPath.split("\\").pop().split("/").pop();
    return `http://localhost:8080/icons/${fileName}`;
  };

  const filteredRecords = useMemo(
    () =>
      records.filter((r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [records, searchTerm]
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBatchCreate = async () => {
    if (selectedIds.size === 0) {
      alert("생성할 아이콘을 선택하세요.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      for (const r of records.filter((rec) => selectedIds.has(rec.id))) {
        await axios.post(
          "http://localhost:8080/api/shortcuts/create",
          { name: r.name, url: r.url, exePath: "", iconPath: r.iconPath },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      alert("바로가기 생성 완료");
    } catch (err) {
      console.error("생성 실패:", err);
      alert("생성 중 오류 발생");
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) {
      alert("삭제할 아이콘을 선택하세요.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const token = localStorage.getItem("token");
    try {
      for (const r of records.filter((rec) => selectedIds.has(rec.id))) {
        await axios.delete(
          `http://localhost:8080/api/shortcuts/${encodeURIComponent(r.name)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setRecords((prev) => prev.filter((rec) => !selectedIds.has(rec.id)));
      setSelectedIds(new Set());
      alert("삭제 완료");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류 발생");
    }
  };

  const handleClearSelection = () => setSelectedIds(new Set());

 return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 툴바 */}
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
          <button onClick={handleBatchCreate} className={styles.createBtn}>
            생성 ({selectedIds.size})
          </button>
          <button onClick={handleBatchDelete} className={styles.deleteBtn}>
            삭제
          </button>
          <button onClick={handleClearSelection} className={styles.clearBtn}>
            선택 해제
          </button>
        </div>

        {/* 아이콘 그리드 */}
        <div className={styles.iconGrid}>
          {filteredRecords.map((r) => (
            <div
              key={r.id}
              className={`${styles.iconItem} ${selectedIds.has(r.id) ? styles.selected : ""}`}
              onClick={() => toggleSelect(r.id)}
            >
              {r.imageUrl ? (
                <img src={r.imageUrl} alt={r.name} className={styles.thumbnail} />
              ) : (
                <div className={styles.placeholder}>No Icon</div>
              )}
              <div className={styles.iconName}>{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
