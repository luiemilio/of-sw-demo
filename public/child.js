document.addEventListener("DOMContentLoaded", () => {
  if (typeof fin != "undefined") {
    fin.desktop.main(onMain);
  } else {
    console.log(
      "OpenFin is not available - you are probably running in a browser."
    );
  }
});

//Once the DOM has loaded and the OpenFin API is ready
function onMain() {
    const winNum = document.querySelector("#winNum");
    winNum.innerHTML = fin.desktop.Window.getCurrent().name
}
