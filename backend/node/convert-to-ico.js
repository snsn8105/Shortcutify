const path = require("path");
const sharp = require("sharp");
const toIco = require("to-ico");
const fs = require("fs");

const [,, inputImagePath, outputIcoPath] = process.argv;

if (!fs.existsSync(inputImagePath)) {
  console.error("❌ 입력 이미지가 존재하지 않음:", inputImagePath);
  process.exit(1);
}

(async () => {
  try {
    const buffer = await sharp(inputImagePath)
      .resize(256, 256)
      .png()
      .toBuffer();

    const ico = await toIco([buffer]);
    fs.writeFileSync(outputIcoPath, ico);
    console.log("✅ 아이콘 변환 완료:", outputIcoPath);
    process.exit(0);
  } catch (e) {
    console.error("❌ 아이콘 변환 실패:", e);
    process.exit(1);
  }
})();
