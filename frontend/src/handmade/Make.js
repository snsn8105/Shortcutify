import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Make.module.css";

export default function Make() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [iconFile, setIconFile] = useState(null); // 추가: PNG 파일 상태
  const [fileDataUrl, setFileDataUrl] = useState(""); // 미리보기용
  const [inputs, setInputs] = useState({
    Url: "",
    Designation: "",
    ExePath: "",
    IconPath: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [iconResults, setIconResults] = useState([]);

  const { Url, Designation, ExePath, IconPath } = inputs;

  const handleChange = (e) => {
    const { id, value } = e.target;

    setInputs((prev) => {
      const updated = { ...prev, [id]: value };

      
      if (id === "Url" && value) updated.ExePath = "";
      
      if (id === "ExePath" && value) updated.Url = "";

      return updated;
    });
  };


  const handleIconFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file); // 백엔드 전송용

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileDataUrl(reader.result); // 미리보기용
      };
      reader.readAsDataURL(file);
    }
  };

 const handleConvertToIco = async () => {
    if (!iconFile) {
      alert("PNG 파일을 먼저 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", iconFile);

    try {
      const token = localStorage.getItem("token"); // 로그인 시 저장된 JWT

      const res = await axios.post("http://localhost:8080/api/icons/upload-png", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      });

      const icoPath = res.data;
      setInputs((prev) => ({ ...prev, IconPath: icoPath }));
      console.log("IconPath", IconPath);

      alert("변환 성공! 아이콘 적용 완료");
    } catch (err) {
      console.error("변환 실패:", err);
      alert("아이콘 변환에 실패했습니다.");
    }
  };


  const handleSave = async () => {
    if (!Designation || (!Url && !ExePath)) {
      alert("명칭과 URL 또는 Exe 경로 중 하나를 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 텍스트 필드에서 입력한 경로 그대로 사용
      const trimmedIconPath = IconPath?.trim(); // 공백 제거
      const finalIconPath =
        trimmedIconPath && trimmedIconPath.length > 0
          ? trimmedIconPath
          : "/images/default.png";

      const requestData = {
        name: Designation,
        url: Url,
        exePath: ExePath?.trim() || "",
        iconPath: finalIconPath, // 사용자가 입력한 경로 반영
      };

      await axios.post("http://localhost:8080/api/shortcuts/create", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("저장 완료!");
      navigate("/");
    } catch (err) {
      console.error("저장 실패:", err);
      alert("바로가기 저장 중 오류가 발생했습니다.");
    }
  };


  const handleUrlUpload = async (imageUrl) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:8080/api/icons/url-upload", null, {
        params: { imageUrl },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const icoPath = res.data;
      setInputs((prev) => ({ ...prev, IconPath: icoPath }));
      alert("아이콘 URL 변환 성공!");
    } catch (err) {
      console.error("URL 변환 실패:", err);
      alert("이미지 URL 변환에 실패했습니다.");
    }
  };

  const handleSearchIcons = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/icons/search", {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIconResults(res.data);
    } catch (err) {
      console.error("아이콘 검색 실패:", err);
      alert("아이콘 검색 중 오류 발생");
    }
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>URL 경로 (웹 바로가기)</h3>

        <div className={styles.field}>
          <label htmlFor="Url">URL</label>
          <input
            type="text"
            id="Url"
            value={Url}
            onChange={handleChange}
            placeholder="www.example.com"
            disabled={!!ExePath}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="ExePath">Exe 경로 (프로그램 바로가기)</label>
          <input
            type="text"
            id="ExePath"
            value={ExePath}
            onChange={handleChange}
            placeholder="C:\\Program Files\\..."
            disabled={!!Url}
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


        <div className={styles.field}>
          <label>아이콘 파일 선택</label>
          <input type="file" accept="image/png" onChange={handleIconFileChange} />
        </div>

        <div className={styles.actionsRow}>
          <button onClick={handleConvertToIco} className={styles.smallButton}>
            아이콘으로 변환
          </button>
          <Link to="/">
            <button className={styles.smallButton}>취소</button>
          </Link>
          <button onClick={handleSave} className={styles.smallButton}>
            저장
          </button>
        </div>
      </div>


      <div className={styles.card_preview}>
        <div className={styles.field}>
          <label>아이콘 검색 (IconFinder)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="예: folder, star, user..."
              />
              <button onClick={handleSearchIcons} className={styles.smallButton}>
                검색
              </button>
            </div>
        </div>
        
        {iconResults.length > 0 && (
          <div className={styles.iconList}>
            {iconResults.slice(0, 20).map((icon, idx) => (
              <img
                key={idx}
                src={icon.previewUrl}
                alt="icon"
                className={styles.iconThumbnail}
                onClick={() => handleUrlUpload(icon.previewUrl)}
              />
            ))}
          </div>
        )}

      </div>


      <div className={styles.card_preview}>
        <h3 className={styles.cardTitle}>결과물 미리보기</h3>
        {fileDataUrl ? (
          <img src={fileDataUrl} alt="preview-png" className={styles.preview} />
        ) : IconPath && IconPath.endsWith(".png") ? (
          <img src={IconPath} alt="preview-iconfinder-png" className={styles.preview} />
        ) : IconPath && IconPath.endsWith(".ico") ? (
          <img src={`http://localhost:8080${IconPath}`} alt="preview-ico" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>아직 아이콘이 없습니다</div>
        )}

        {Designation && <h1 className={styles.previewTitle}>{Designation}</h1>}
      
      </div>

    </div>
  );
}
