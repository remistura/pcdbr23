import drawFlower from "./functions/drawFlower";
import saveImage from "./functions/saveImage";

(function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let counter = 1;
  let canvas1, canvas2, canvas3, ctx, offscreen1, offscreen2;
  let finished = false;
  let worker1, worker2;

  function setup() {
    canvas1 = document.getElementById("canvas1");
    canvas1.width = width;
    canvas1.height = height;
    ctx = canvas1.getContext("2d");

    // Canvas 2
    canvas2 = document.getElementById("canvas2");
    canvas2.width = width;
    canvas2.height = height;
    offscreen1 = canvas2.transferControlToOffscreen();

    // Worker 1
    worker1 = new Worker("worker1.js");
    worker1.onmessage = function(event) {
      console.log("[Main] Received message:", event.data.msg);
    }
    worker1.postMessage({ topic: "create", offscreen: offscreen1 }, [offscreen1]);
    worker1.postMessage({ topic: "draw" });

    // Canvas 3
    canvas3 = document.getElementById("canvas3");
    canvas3.width = width;
    canvas3.height = height;
    offscreen2 = canvas3.transferControlToOffscreen();

    // Worker 2
    worker2 = new Worker("worker2.js");
    worker2.onmessage = function(event) {
      console.log("[Main] Received message:", event.data.msg);
    }
    worker2.postMessage({ topic: "create", offscreen: offscreen2 }, [offscreen2]);
    worker2.postMessage({ topic: "animate" });

    window.requestAnimationFrame(draw);
  }

  function draw(timestamp) {
    if (!finished) {
      for (let i = 0; i < 200; i++) {
        let x = Math.floor(Math.random() * canvas1.width);
        let y = Math.floor(Math.random() * canvas1.height);
        drawFlower(x, y, ctx);
      }

      console.log("[Main] Drawing frame", counter);
      if (counter++ === 50) finished = true;;

      setTimeout(function() {
        if (!finished) ctx.clearRect(0, 0, canvas1.width, canvas1.height);
        window.requestAnimationFrame(draw);
      }, 1000);
    } else {
      console.log("[Main] Finished drawing");
      worker1.postMessage({ topic: "finish" });
      worker2.postMessage({ topic: "finish" });
    }
  }

  window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      console.log("[Main] Saving image");
      saveImage(canvas1, canvas2);
    }
  });

  setup();
})();
