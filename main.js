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
  var bounds = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  const slider = document.querySelector("#size");

  slider.addEventListener("change", (e) => {
    brushSize = e.target.value;
  });

  canvas.width = window.innerWidth;
  canvas.height = this.window.innerHeight;

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

    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fff";
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  //choose what to do according to tool selected
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

    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;

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

  const save = document.querySelector("#save");
  save.addEventListener("click", ()=>{
	const name = prompt('Name');
	var data = canvas.toDataURL();
	let a = document.createElement("a");
	a.href = data;
	a.download = name;
	a.click();
})
}

//resize the canvas when window is resized
window.addEventListener("resize", () => {
  const canvas = document.querySelector("#canvas");
  canvas.width = window.innerWidth - 20;
  canvas.height = this.window.innerHeight - 100;
});
