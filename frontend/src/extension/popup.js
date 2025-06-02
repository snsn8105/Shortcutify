document.getElementById("convertBtn").addEventListener("click", async () => {
  const iconFile = document.getElementById("iconFile").files[0];
  if (!iconFile) return alert("아이콘 파일을 선택하세요");

  const formData = new FormData();
  formData.append("image", iconFile);

  const urlInput = document.getElementById("url");
  urlInput.className = "field_input";

  try {
    const res = await fetch("http://localhost:8080/api/icons/upload-png", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    const iconPath = await res.text();
    localStorage.setItem("iconPath", iconPath); // 저장
    alert("아이콘 변환 성공!");
  } catch (e) {
    alert("변환 실패");
    console.error(e);
  }
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  const exePath = document.getElementById("exePath").value;
  const designation = document.getElementById("designation").value;
  const iconPath = localStorage.getItem("iconPath") || "/images/default.png";

  if (!url || !designation) {
    return alert("URL과 명칭을 입력하세요");
  }

  const data = {
    name: designation,
    url,
    exePath,
    iconPath,
  };

  try {
    const res = await fetch("http://localhost:8080/api/shortcuts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert("저장 완료!");
    } else {
      throw new Error("저장 실패");
    }
  } catch (e) {
    alert("오류 발생");
    console.error(e);
  }
});
