// src/handmade/Make.js
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Make.module.css";

export default function Make() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [inputs, setInputs] = useState({ Url: "", Designation: "" });
  const [fileDataUrl, setFileDataUrl] = useState("");

  // inputs 객체에서 Url 과 Designation을 꺼냅니다
  const { Url, Designation } = inputs;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFileDataUrl(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.wrapper}>
      {/* 입력 폼 카드 */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>입력 폼</h3>
        <div className={styles.field}>
          <label htmlFor="Url">URL</label>
          <input
            type="text"
            id="Url"
            value={Url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="Designation">명칭</label>
          <input
            type="text"
            id="Designation"
            value={Designation}
            onChange={handleChange}
            placeholder="아이콘 이름 입력"
          />
        </div>
        <div className={styles.buttonsRow}>
          <button onClick={handleFileClick} className={styles.button}>
            이미지 불러오기
          </button>
          <button className={styles.button}>아이콘 불러오기</button>
        </div>
        <div className={styles.actionsRow}>
          <Link to="/" className={styles.navLink}>
            <button className={styles.smallButton}>취소</button>
          </Link>
          <button className={styles.smallButton}>저장</button>
          <button className={styles.smallButton}>확인</button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.hidden}
          onChange={handleFileChange}
        />
      </div>

      {/* 결과물 미리보기 카드 */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>결과물 미리보기</h3>
        {fileDataUrl ? (
          <img src={fileDataUrl} alt="preview" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>
            아직 로드된 이미지가 없습니다
          </div>
        )}
        {/* 여기서 사용자 입력 명칭을 보여줌 */}
        {Designation && <h1 className={styles.previewTitle}>{Designation}</h1>}
      </div>
    </div>
  );
}
