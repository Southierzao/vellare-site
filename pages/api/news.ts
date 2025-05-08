import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

type NewsItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parser = new Parser<{}, NewsItem>();
  const feedUrl = "https://rockcontent.com/br/blog/feed/";

  try {
    const feed = await parser.parseURL(feedUrl);
    const items = feed.items.slice(0, 3).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));
    res.status(200).json({ news: items });
  } catch (error) {
    console.error("Erro ao buscar RSS:", error);
    res.status(500).json({ news: [] });
  }
}
