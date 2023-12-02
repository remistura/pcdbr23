let canvas, ctx;
let counter = 0;
let text = "Generating";
let intervalId;

console.log("[Worker2] Running!");

onmessage = function (event) {
  const { topic } = event.data;
  console.log("[Worker2] Received message with topic:", topic);
  switch (topic) {
    case "create":
      const { offscreen } = event.data;
      canvas = offscreen;
      ctx = canvas.getContext("2d");
      ctx.font = "40px Arial";
      ctx.fillStyle = "white";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 6;
      ctx.shadowOffsetY = 6;
      break;
    case "animate":
      intervalId = setInterval(function () {
        var dots = new Array(counter % 4).fill(".").join("");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(text + dots, 40, 70);
        counter++;
      }, 500);
      break;
    case "finish":
      clearInterval(intervalId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText("Done!", 40, 70);
      setTimeout(function(name) {
        postMessage({ msg: "Worker 2 finished" });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        self.close();
      }, 2000);
      break;
  }
};
