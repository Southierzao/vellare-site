import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { username } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Chave da OpenAI não configurada." });
  }

  const prompt = `Você é um analista de marketing digital. Um visitante digitou o perfil @${username}.
Considere que é um perfil pequeno, público, com boas imagens, mas baixa frequência de postagens.
Gere uma análise breve com recomendações de melhoria no Instagram para negócios.`;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
      }),
    });

    const responseData = await completion.json();

    if (!responseData.choices || responseData.choices.length === 0) {
      return res.status(500).json({ result: "Nenhuma resposta recebida da IA." });
    }

    const reply = responseData.choices[0].message.content;
    res.status(200).json({ result: reply });
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ result: "Erro interno na análise." });
  }
}
