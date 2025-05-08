import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { username } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Chave da OpenAI não configurada." });
  }

  const prompt = `
Você é um consultor de marketing digital especialista em Instagram.
Analise o perfil @${username} (lembre-se de que o visitante já digitou o @, então não repita o símbolo).

Contexto: 
- O perfil tem boas imagens, é público e voltado a negócios digitais, mas posta com baixa frequência.
- O objetivo da empresa é atrair mais clientes com autoridade, conteúdo estratégico e tráfego pago.
- Gera uma análise consultiva e personalizada como se fosse enviada por um especialista da Vellare Digital.

A resposta deve ter:

1. Um título breve com um emoji relevante
2. Uma introdução com tom humano e natural
3. Tópicos com títulos iniciando com emojis:
   - 🔍 Visão Geral
   - 💪 Pontos Fortes
   - 🛠️ Oportunidades de Melhoria
   - 🎯 Recomendações Estratégicas
   - 📈 Estimativa com Tráfego Pago
   - 🧠 Conclusão Consultiva

Evite repetir “@” no corpo da análise, use “o perfil” ou “este perfil” quando necessário.
Seja objetivo, útil e evite parecer uma IA ou resposta genérica.
A saída deve ter no máximo 700 tokens.
`;

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
        max_tokens: 700,
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
