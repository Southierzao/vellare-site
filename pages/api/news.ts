import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

type NewsItem = {
  title: string;
  link: string;
  pubDate?: string;
  contentSnippet?: string;
};

const parser = new Parser<{}, NewsItem>();
const feedUrl = "https://blog.hootsuite.com/feed/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const feed = await parser.parseURL(feedUrl);

    const items = await Promise.all(
      feed.items.slice(0, 3).map(async (item) => {
        const tituloTraduzido = await traduzir(`Título: ${item.title}`);
        const resumoTraduzido = item.contentSnippet
          ? await traduzir(`Resumo: ${item.contentSnippet}`)
          : "";

        return {
          title: tituloTraduzido.replace(/^Título:\s*/i, ""),
          summary: resumoTraduzido.replace(/^Resumo:\s*/i, ""),
          link: item.link,
          pubDate: item.pubDate,
        };
      })
    );

    res.status(200).json({ news: items });
  } catch (error) {
    console.error("Erro ao buscar/traduzir RSS:", error);
    res.status(500).json({ news: [] });
  }
}

async function traduzir(texto: string): Promise<string> {
  try {
    const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Traduza para português brasileiro: ${texto}` }],
        temperature: 0.4,
        max_tokens: 200,
      }),
    });

    const dados = await resposta.json();
    return dados.choices?.[0]?.message?.content?.trim() ?? texto;
  } catch (err) {
    console.error("Erro ao traduzir:", err);
    return texto;
  }
}
