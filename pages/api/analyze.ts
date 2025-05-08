import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { username } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Chave da OpenAI não configurada." });
  }

  const prompt = `
Você é uma inteligência artificial especialista em marketing digital, criada pela Vellare Digital.

Seu papel é gerar um diagnóstico estratégico para perfis de Instagram digitados por visitantes em nosso site.

Analise o perfil @${username} (evite repetir o símbolo @ no corpo da resposta).

Use este formato de resposta:

1. 🔍 Visão Geral
2. 💪 Pontos Fortes
3. 🛠️ Oportunidades de Melhoria
4. 🎯 Recomendações Estratégicas
5. 📈 Estimativa com Tráfego Pago
6. 🧠 Conclusão Consultiva

✅ Regras:
- A resposta deve ser direta ao visitante (ex: “Seu perfil apresenta...”, “Você pode melhorar...”)
- Não mencione a empresa Vellare como destinatária da análise
- Linguagem deve ser leve, objetiva e estratégica — como se fosse um consultor digital profissional
- Evite frases genéricas e use o contexto do perfil (público, boas imagens, baixa frequência)

Responda como se estivesse prestando uma micro-consultoria personalizada. Limite: 700 tokens.
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
