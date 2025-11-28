import React, { useState, useEffect } from 'react';
import Mensaje from './Mensaje.jsx';
import { fetchMessages, sendMessage } from '../api.js';

function Marquesina() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');
  const [isTwitch, setIsTwitch] = useState(false);

  // Detectar si estamos dentro de Twitch Extension
  useEffect(() => {
    if (window.Twitch && window.Twitch.ext) {
      setIsTwitch(true);

      window.Twitch.ext.onAuthorized(() => {
        // Aquí podrías agregar cosas más adelante (tokens, etc.)
      });

    } else {
      setIsTwitch(false);
    }
  }, []);

  // Cargar mensajes SOLO si NO es modo demo
  useEffect(() => {
    if (!isTwitch) {
      // MODO DEMO → mensaje fijo para aprobación
      setMensajes([{ contenido: "✨ BIENVENIDOS AL STREAM ✨" }]);
      return;
    }

    async function loadMessages() {
      try {
        const data = await fetchMessages();
        setMensajes(data);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
      }
    }

    loadMessages();
  }, [isTwitch]);

  // Agregar mensaje (solo disponible fuera de Twitch, por seguridad)
  const agregarMensaje = async () => {
    if (input.trim() === '' || isTwitch) return;

    try {
      await sendMessage(input.trim());
      setMensajes([...mensajes, { contenido: input.trim() }]);
      setInput('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  return (
    <div className="marquesina">
      {mensajes.map((msg, index) => (
        <Mensaje key={index} texto={msg.contenido} />
      ))}

      {/* Controles ocultos en Twitch (requerido para aprobación) */}
      {!isTwitch && (
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
