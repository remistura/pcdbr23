const createFinalImage = (middleCanvas, backCanvas) => {
  const finalCanvas = document.createElement("canvas");
  const ctx = finalCanvas.getContext("2d");
  finalCanvas.width = middleCanvas.width;
  finalCanvas.height = middleCanvas.height;
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  ctx.drawImage(backCanvas, 0, 0);
  ctx.drawImage(middleCanvas, 0, 0);

  // Draw the final image to the middle canvas
  const middleCtx = middleCanvas.getContext("2d");
  middleCtx.drawImage(finalCanvas, 0, 0);
};

export default createFinalImage;
