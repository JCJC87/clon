import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje.jsx";
import { fetchMessages, sendMessage } from "../api.js";

function Marquesina() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [isTwitch, setIsTwitch] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Detectar si estamos en Twitch Extension
  useEffect(() => {
    if (window.Twitch && window.Twitch.ext) {
      setIsTwitch(true);

      // Autorización del Helper
      window.Twitch.ext.onAuthorized(() => {
        console.log("Autorizado por Twitch");
        cargarMensajes();
      });

      // Twitch listo
      window.Twitch.ext.onContext(() => {
        setIsReady(true);
      });
    } else {
      // No estamos en Twitch → mostrar mensaje estándar
      setIsReady(true);
      setMensajes([{ contenido: "✨ BIENVENIDOS AL STREAM ✨" }]);
    }
  }, []);

  // Función para cargar mensajes desde backend
  async function cargarMensajes() {
    try {
      const data = await fetchMessages();
      if (Array.isArray(data) && data.length > 0) {
        setMensajes(data);
      } else {
        // Backend vacío → mostrar mensaje default de bienvenida
        setMensajes([{ contenido: "✨ BIENVENIDOS AL STREAM ✨" }]);
      }
      setIsReady(true);
    } catch (err) {
      console.error("Error backend:", err);
      // Si falla, mostrar mensaje default
      setMensajes([{ contenido: "✨ BIENVENIDOS AL STREAM ✨" }]);
      setIsReady(true);
    }
  }

  // Agregar mensaje (solo si está autorizado)
  const agregarMensaje = async () => {
    if (input.trim() === "") return;

    try {
      await sendMessage(input.trim());
      setMensajes([...mensajes, { contenido: input.trim() }]);
      setInput("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div className="marquesina">
      {/* --- MENSAJES --- */}
      {isReady &&
        mensajes.map((msg, index) => (
          <Mensaje key={index} texto={msg.contenido} />
        ))}

      {/* --- CONTROLES SOLO PARA CREADOR Y MODS --- */}
      {isTwitch && (
        <div className="controls">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
          <button onClick={agregarMensaje}>Agregar</button>
        </div>
      )}
    </div>
  );
}

export default Marquesina;
