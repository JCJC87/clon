// src/api.js
const BASE_URL = "https://bmark-1-six.vercel.app"; // URL de tu backend en Vercel

export async function fetchMessages() {
  const res = await fetch(`${BASE_URL}/messages`);
  if (!res.ok) throw new Error("Error al obtener mensajes");
  return res.json();
}

export async function sendMessage(message) {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido: message })
  });
  if (!res.ok) throw new Error("Error al enviar mensaje");
  return res.json();
}
