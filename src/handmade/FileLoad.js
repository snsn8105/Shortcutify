// src/FileLoad.js
import { useRef, useState } from "react";
import styles from "./FileLoad.module.css";

export default function FileLoad() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");

  // 버튼 클릭 시 숨은 <input> 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 후 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result);
    };
    reader.readAsDataURL(file); // ← 이미지 데이터를 DataURL로 읽음
  };

  return (
    <div className={styles.loader}>
      <button className={styles.loadButton} onClick={handleButtonClick}>
        이미지 불러오기
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // ← 이미지 파일만 선택
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />

      {fileDataUrl && (
        <img src={fileDataUrl} alt={fileName} className={styles.previewImage} />
      )}
    </div>
  );
}
