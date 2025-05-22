// src/FileLoad.js
import { useRef, useState } from "react";
import styles from "./FileLoad.module.css";

export default function FileLoad({ onImageChange }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const resizeImage = (dataUrl, maxWidth, maxHeight) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = dataUrl;
    });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = async () => {
      const original = reader.result;
      const resized = await resizeImage(original, 300, 200);
      setFileDataUrl(resized);
      if (onImageChange) onImageChange(resized);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.loader}>
      <button className={styles.loadButton} onClick={handleButtonClick}>
        이미지 불러오기
      </button>
      <div className={styles.icon}>
        <button>아이콘 불러오기</button>
      </div>
      <div className={styles.record}>
        <button>기록 불러오기</button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />
      {fileDataUrl && (
        <img src={fileDataUrl} alt={fileName} className={styles.previewImage} />
      )}
    </div>
  );
}
