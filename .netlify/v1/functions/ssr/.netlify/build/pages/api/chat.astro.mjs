export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { message } = await request.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "Message manquant." }), { status: 400 });
    }
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await openaiRes.json();
    if (!data.choices || !data.choices.length) {
      console.error("Réponse vide :", data);
      return new Response(JSON.stringify({ error: "Pas de réponse." }), { status: 500 });
    }
    return new Response(JSON.stringify({ response: data.choices[0].message.content }), {
      status: 200
    });
  } catch (err) {
    console.error("Erreur côté serveur :", err);
    return new Response(JSON.stringify({ error: "Erreur serveur." }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
