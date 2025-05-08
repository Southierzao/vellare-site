import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { username } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Chave da OpenAI não configurada." });
  }

  const prompt = `
Você é um especialista em marketing digital com foco em Instagram. 
Analise o perfil @${username} com base no seguinte cenário fictício:

- O perfil é público, tem boas imagens, mas baixa frequência de postagens.
- Ele representa uma empresa de conteúdo digital que busca atrair mais clientes.
- Desejamos uma resposta estruturada em tópicos com subtítulos.

Responda no seguinte formato:

1. **Visão Geral**
2. **Pontos Fortes**
3. **Pontos de Melhoria**
4. **Recomendações Estratégicas**
5. **Estimativa de Crescimento com Tráfego Pago**
6. **Conclusão com Tom Consultivo**

Seja claro, objetivo, e utilize linguagem profissional, como em um diagnóstico para um cliente real.
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
        max_tokens: 600,
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
