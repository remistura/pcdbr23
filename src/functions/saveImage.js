const saveImage = (canvas) => {
  const filename = "image.png"
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", filename);
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
};

export default saveImage;
