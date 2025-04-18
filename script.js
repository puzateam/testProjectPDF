<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PDF Online Editor</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script> <!-- เพิ่ม PDFLib -->
  <style>
    body { font-family: 'Prompt', sans-serif; text-align: center; padding: 20px; }
    canvas { margin-top: 20px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h1>PDF Online Editor</h1>
  <input type="file" id="pdfFile" accept="application/pdf" />
  <div id="status"></div>
  <canvas id="pdf-viewer"></canvas>
  <textarea id="textInput" placeholder="พิมพ์ข้อความที่จะแทรกลงใน PDF" style="width: 100%; height: 100px;"></textarea><br>
  <button onclick="addTextToPDF()">เพิ่มข้อความ</button>
  <input type="text" id="fileName" placeholder="ตั้งชื่อไฟล์ PDF" />
  <button onclick="savePDF()">บันทึก PDF</button>
  <button onclick="uploadToDrive()">อัปโหลดไป Google Drive</button>

  <script>
    let pdfDoc = null;
    let modifiedPdfBytes = null;

    document.getElementById('pdfFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      const arrayBuffer = await file.arrayBuffer();
      pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

      // แสดง PDF
      const pdfViewer = document.getElementById('pdf-viewer');
      const page = await pdfDoc.getPage(0); // แสดงหน้าหนึ่ง
      const { height } = page.getSize();
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = pdfViewer;
      const ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      page.render(renderContext);

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
  </script>
</body>
</html>
