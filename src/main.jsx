import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/marquesina.css";

function initApp() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// ------------------------------
//   HELPER DE TWITCH
// ------------------------------
function initTwitchHelper() {
  if (window.Twitch && window.Twitch.ext) {
    console.log("%cTwitch Helper detectado ✔", "color: #4CAF50; font-size: 14px;");

    window.Twitch.ext.onAuthorized((auth) => {
      console.log("🔑 Twitch Auth recibida:", auth);
      initApp();
    });

    window.Twitch.ext.onContext((context) => {
      console.log("🎨 Context actualizado:", context);
    });

    window.Twitch.ext.onVisibilityChanged((visible) => {
      console.log("👁 Visibilidad:", visible);
    });

  } else {
    console.warn("%cTwitch Helper NO detectado – Activando modo demo", "color: orange;");

    // MODO DEMO (local, navegador, pruebas)
    initApp();
  }
}

initTwitchHelper();
