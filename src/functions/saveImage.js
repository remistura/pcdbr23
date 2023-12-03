const downloadCanvasAsImage = (canvas, filename) => {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", filename);
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
};

const saveImage = (middleCanvas, backCanvas) => {
  const finalCanvas = document.createElement("canvas");
  const ctx = finalCanvas.getContext("2d");
  finalCanvas.width = middleCanvas.width;
  finalCanvas.height = middleCanvas.height;
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  ctx.drawImage(backCanvas, 0, 0);
  ctx.drawImage(middleCanvas, 0, 0);
  downloadCanvasAsImage(finalCanvas, "image.png");
};

export default saveImage;
