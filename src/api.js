// src/api.js

// URL del backend en Vercel
const BASE_URL = "https://bmark-1-six.vercel.app";

// Variable interna para almacenar el token de Twitch (si existe)
let twitchToken = null;

// Detectar si estamos en Twitch Extension
if (window.Twitch && window.Twitch.ext) {
  window.Twitch.ext.onAuthorized((auth) => {
    twitchToken = auth.token; // ← JWT de Twitch para llamadas autenticadas
    console.log("Twitch token recibido");
  });
}

/**
 * Obtener mensajes
 */
export async function fetchMessages() {
  const headers = {};

  // Si estamos en Twitch, agregar JWT
  if (twitchToken) {
    headers["Authorization"] = `Bearer ${twitchToken}`;
  }

  const res = await fetch(`${BASE_URL}/messages`, { headers });

  if (!res.ok) throw new Error("Error al obtener mensajes");
  return res.json();
}

/**
 * Enviar un mensaje al backend
 */
export async function sendMessage(message) {
  const headers = { "Content-Type": "application/json" };

  if (twitchToken) {
    headers["Authorization"] = `Bearer ${twitchToken}`;
  }

  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contenido: message }),
  });

  if (!res.ok) throw new Error("Error al enviar mensaje");
  return res.json();
}
