const downloadCanvasAsImage = (canvas, filename) => {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", filename);
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
};

const saveImage = (canvas1, canvas2) => {
  const finalCanvas = document.createElement("canvas");
  const ctx = finalCanvas.getContext("2d");
  finalCanvas.width = canvas1.width;
  finalCanvas.height = canvas1.height;
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  ctx.drawImage(canvas2, 0, 0);
  ctx.drawImage(canvas1, 0, 0);
  downloadCanvasAsImage(finalCanvas, "image.png");
};

export default saveImage;
