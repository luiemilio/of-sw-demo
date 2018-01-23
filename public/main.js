//register service worker
const swRegistration = navigator.serviceWorker.register("./sw.js");

//event listeners.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof fin != "undefined") {
    fin.desktop.main(onMain);
  } else {
    ofVersion.innerText =
      "OpenFin is not available - you are probably running in a browser.";
  }
});

//Once the DOM has loaded and the OpenFin API is ready
function onMain() {
  const app = fin.desktop.Application.getCurrent();
  fin.desktop.System.showDeveloperTools(app.uuid, app.uuid);
  fin.desktop.System.getVersion(version => {
    const ofVersion = document.querySelector("#of-version");
    ofVersion.innerText = version;
  });

  const openChildWindowBtn = document.querySelector("#openChildWin");

  let winCtr = 1;

  openChildWindowBtn.addEventListener("click", () => {
    var child = new fin.desktop.Window({
      name: "childWindow" + winCtr++,
      url: "child.html",
      defaultWidth: 320,
      defaultHeight: 320,
      defaultTop: Math.random() * 600,
      defaultLeft: Math.random() * 600,
      autoShow: true
    });
  });

  const mainWin = fin.desktop.Window.getCurrent();

  mainWin.addEventListener("close-requested", () => {
    fin.desktop.System.clearCache({
      cache: true,
      cookies: true,
      localStorage: true,
      appcache: true,
      userData: true
    }, () => {
      app.terminate();
    });
  });
}
