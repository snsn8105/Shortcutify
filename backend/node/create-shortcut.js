const fs = require("fs");
const path = require("path");
const createDesktopShortcut = require("create-desktop-shortcuts");

const [,, filePath, name, iconPath] = process.argv;

// 브라우저 실행을 통한 웹사이트 열기 설정
const isWebUrl = /^https?:\/\//i.test(filePath);
const desktopPath = "C:\\Users\\snsn8\\OneDrive\\Desktop"; // 바탕화면 경로 수정 필요
const browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // 원하는 브라우저 실행파일 경로

if (isWebUrl) {
  // .lnk 방식으로 웹사이트 바로가기 생성 (브라우저 실행 + URL 인자)
  const result = createDesktopShortcut({
    windows: {
      name,
      filePath: browserPath,
      outputPath: desktopPath,
      arguments: `--new-window ${filePath}`,
      icon: iconPath
    }
  });

  if (result) {
    console.log("✅ 웹사이트 바로가기 (.lnk) 생성 완료");
    process.exit(0);
  } else {
    console.error("❌ 웹사이트 바로가기 생성 실패");
    process.exit(1);
  }
} else {
  // 일반 실행파일 바로가기
  const result = createDesktopShortcut({
    windows: {
      filePath,
      outputPath: desktopPath,
      name,
      icon: iconPath
    }
  });

  if (result) {
    console.log("✅ 실행파일 바로가기 생성 완료");
    process.exit(0);
  } else {
    console.error("❌ 실행파일 바로가기 생성 실패");
    process.exit(1);
  }
}
