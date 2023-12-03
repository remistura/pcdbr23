import drawFlower from "./functions/drawFlower";
import saveImage from "./functions/saveImage";

(function () {
  const W = window.innerWidth;
  const H = window.innerHeight;

  let counter = 1;
  let middleCanvas, backCanvas, frontCanvas, ctx, offscreenBackCanvas, offscreenFrontCanvas;
  let finished = false;
  let worker1, worker2;

  function setup() {

    // Middle Canvas - Flowers (Main thread)
    middleCanvas = document.getElementById("middleCanvas");
    middleCanvas.width = W;
    middleCanvas.height = H;
    ctx = middleCanvas.getContext("2d");

    // Background Canvas - Grass (Worker #1)
    backCanvas = document.getElementById("backCanvas");
    backCanvas.width = W;
    backCanvas.height = H;
    offscreenBackCanvas = backCanvas.transferControlToOffscreen();

    // Foreground Canvas - Text (Worker #2)
    frontCanvas = document.getElementById("frontCanvas");
    frontCanvas.width = W;
    frontCanvas.height = H;
    offscreenFrontCanvas = frontCanvas.transferControlToOffscreen();

    // Worker #1
    worker1 = new Worker("worker1.js");
    worker1.onmessage = function (event) {
      console.log("[Main] Received message:", event.data.msg);
    };
    worker1.postMessage({ topic: "create", offscreen: offscreenBackCanvas }, [offscreenBackCanvas]);
    worker1.postMessage({ topic: "draw" });

    // Worker #2
    worker2 = new Worker("worker2.js");
    worker2.onmessage = function (event) {
      console.log("[Main] Received message:", event.data.msg);
    };
    worker2.postMessage({ topic: "create", offscreen: offscreenFrontCanvas }, [offscreenFrontCanvas]);
    worker2.postMessage({ topic: "animate" });

    window.requestAnimationFrame(draw);
  }

  function draw() {
    if (!finished) {
      for (let i = 0; i < 200; i++) {
        let x = Math.floor(Math.random() * middleCanvas.width);
        let y = Math.floor(Math.random() * middleCanvas.height);
        drawFlower(x, y, ctx);
      }

      console.log("[Main] Drawing frame", counter);
      if (counter++ === 50) finished = true;

      setTimeout(function () {
        if (!finished) ctx.clearRect(0, 0, middleCanvas.width, middleCanvas.height);
        window.requestAnimationFrame(draw);
      }, 1000);
    } else {
      console.log("[Main] Finished drawing");
      worker1.postMessage({ topic: "finish" });
      worker2.postMessage({ topic: "finish" });
    }
  }

  window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("[Main] Saving image");
      saveImage(middleCanvas, backCanvas);
    }
  });

  setup();
})();
