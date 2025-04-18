let pdfDoc = null;
let modifiedPdfBytes = null;

document.getElementById('pdfFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const arrayBuffer = await file.arrayBuffer();
  pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
  document.getElementById("status").innerText = "📄 โหลดไฟล์ PDF สำเร็จแล้ว!";
});

async function addTextToPDF() {
  if (!pdfDoc) return alert("❗ กรุณาเลือกไฟล์ PDF ก่อน");
  const page = pdfDoc.getPages()[0];
  const { height } = page.getSize();
  const text = document.getElementById('textInput').value;

  page.drawText(text, {
    x: 50,
    y: height - 100,
    size: 18,
    color: PDFLib.rgb(0, 0, 0),
  });

  modifiedPdfBytes = await pdfDoc.save();
  document.getElementById("status").innerText = "✅ เพิ่มข้อความสำเร็จ!";
}

function savePDF() {
  if (!modifiedPdfBytes) return alert("❗ ยังไม่มีการแก้ไข PDF");
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  const fileName = document.getElementById('fileName').value || "edited.pdf";
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  document.getElementById("status").innerText = "📥 ดาวน์โหลดสำเร็จ!";
}

function uploadToDrive() {
  alert("ฟีเจอร์นี้หนูจะช่วยต่อให้ในขั้นตอนหน้า พร้อมตั้งค่า Google API และ OAuth ให้พี่");
}