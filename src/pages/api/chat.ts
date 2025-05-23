export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message manquant." }), { status: 400 });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await openaiRes.json();

    if (!data.choices || !data.choices.length) {
      console.error("Réponse vide :", data);
      return new Response(JSON.stringify({ error: "Pas de réponse." }), { status: 500 });
    }

    return new Response(JSON.stringify({ response: data.choices[0].message.content }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur côté serveur :", err);
    return new Response(JSON.stringify({ error: "Erreur serveur." }), { status: 500 });
  }
};

