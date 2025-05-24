// src/handmade/Record.js
import { useMemo, useState } from "react";
import styles from "./Record.module.css";

export default function Record() {
  // 1) 더미 데이터
  const [records] = useState([
    {
      id: 1,
      name: "아이콘 A",
      url: "https://example.com/A",
      imageUrl: "https://via.placeholder.com/80",
      createdAt: "2025-05-20 10:15",
    },
    {
      id: 2,
      name: "아이콘 B",
      url: "https://example.com/B",
      imageUrl: "https://via.placeholder.com/80",
      createdAt: "2025-05-21 14:30",
    },
    // …추가…
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  // 2) 검색어로 필터링
  const filteredRecords = useMemo(
    () =>
      records.filter(
        (r) => r.name.includes(searchTerm) || r.createdAt.includes(searchTerm)
      ),
    [records, searchTerm]
  );

  // 3) 행 클릭 토글
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>생성 기록</h3>

        {/* 검색 입력 */}
        <input
          type="text"
          placeholder="이름 또는 날짜로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />

        {/* 스크롤 영역 */}
        <div className={styles.scrollArea}>
          {filteredRecords.map((r) => (
            <div
              key={r.id}
              className={`${styles.recordRow} ${
                selectedIds.has(r.id) ? styles.selectedRow : ""
              }`}
              onClick={() => toggleSelect(r.id)}
            >
              <img src={r.imageUrl} alt={r.name} className={styles.thumbnail} />
              <div className={styles.info}>
                <div className={styles.name}>{r.name}</div>
                <span className={styles.url}>{r.url}</span>
              </div>
              <div className={styles.date}>{r.createdAt}</div>
            </div>
          ))}
        </div>

        {/* 선택 개수 표시 */}
        <button className={styles.submit}> 생성 ({selectedIds.size})</button>
      </div>
    </div>
  );
}
