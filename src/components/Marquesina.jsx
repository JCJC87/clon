import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje.jsx";
import { fetchMessages, sendMessage } from "../api.js";

function Marquesina() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [modoTwitch, setModoTwitch] = useState(false);

  // Detectar si estamos dentro de Twitch
  useEffect(() => {
    if (window.Twitch && window.Twitch.ext) {
      setModoTwitch(true);
    }
  }, []);

  // Cargar mensaje del backend
  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await fetchMessages();

        if (data.length > 0) {
          setMensajes(data);
        } else {
          // Si no hay mensajes mostrar uno default
          setMensajes([{ contenido: "BIENVENIDOS AL STREAM" }]);
        }
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
        setMensajes([{ contenido: "BIENVENIDOS AL STREAM" }]);
      }
    }

    loadMessages();
  }, []);

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
      {mensajes.map((msg, index) => (
        <Mensaje key={index} texto={msg.contenido} />
      ))}

      {/* Controles SOLO visibles fuera de Twitch */}
      {!modoTwitch && (
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
