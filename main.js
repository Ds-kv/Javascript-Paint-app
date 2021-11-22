window.addEventListener("load", main);

//the tool which is selected
let index = "pencil";

function givefn(type) {
  index = type;
  console.log(type);
}

let brushSize = 10;

function main() {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const slider = document.querySelector("#size");

  slider.addEventListener("change", (e) => {
    brushSize = e.target.value;
  });

  canvas.width = window.innerWidth - 20;
  canvas.height = this.window.innerHeight - 100;

  let painting = false;

  function startPosition(e) {
    if (e.button === 0) {
      painting = true;
      choose(e);
    }
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function erase(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fff";
    ctx.lineTo(e.clientX, e.clientY);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  //choose what to do
  function choose(e) {
    switch (index) {
      case "pencil":
        draw(e);
        return;
      case "erase":
        erase(e);
        return;
      default:
        return;
    }
  }

  function draw(e) {
    let col = document.querySelector("#col");

    let x = e.clientX;
    let y = e.clientY;

    if (!painting) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = col.value;
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", choose);
}

//resize the canvas when window is resized
window.addEventListener("resize", () => {
  const canvas = document.querySelector("#canvas");
  canvas.width = window.innerWidth - 20;
  canvas.height = this.window.innerHeight - 100;
});
