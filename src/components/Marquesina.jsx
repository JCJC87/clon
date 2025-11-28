import React, { useState, useEffect } from 'react';
import Mensaje from './Mensaje.jsx';
import { fetchMessages, sendMessage } from '../api.js';

function Marquesina() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');

  // Cargar mensajes del backend al iniciar
  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await fetchMessages();
        setMensajes(data);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
      }
    }
    loadMessages();
  }, []);

  const agregarMensaje = async () => {
    if (input.trim() === '') return;
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
      <div className="controls">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje"
        />
        <button onClick={agregarMensaje}>Agregar</button>
      </div>
    </div>
  );
}

export default Marquesina;
