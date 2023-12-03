importScripts("lib/rough.js");

console.log("[Worker1] Running!");

const shadesOfGreen = [
  "#008000", // Green
  "#006400", // Dark Green
  "#ADFF2F", // Green Yellow
  "#7CFC00", // Lawn Green
  "#32CD32", // Lime Green
];

let canvas, rc;

onmessage = function (event) {
  const { topic } = event.data;
  console.log("[Worker1] Received message with topic:", topic);
  switch (topic) {
    case "create":
      const { offscreen } = event.data;
      canvas = offscreen;
      rc = rough.canvas(canvas);
      postMessage({ msg: "Rough.js instantiated" });
      break;
    case "draw":
      self.requestAnimationFrame(draw);
      break;
    case "finish":
      postMessage({ msg: "Worker 1 finished" });
      self.close();
      break;
    default:
      postMessage({ msg: `Unknown topic: ${topic}` });
  }
};

function draw() {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height) + 100;
  let height = Math.floor(Math.random() * canvas.height * 0.3 * (0.5 + Math.random()));
  let index = Math.floor(Math.random() * shadesOfGreen.length);
  let shade = shadesOfGreen[index];

  rc.line(x, y, x, y - height, { bowing: 2, roughness: 8, stroke: shade, strokeWidth: 1 });

  self.requestAnimationFrame(draw);
}
