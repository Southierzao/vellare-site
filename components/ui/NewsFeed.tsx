type NewsItem = {
  title: string;
  summary?: string;
  link: string;
  pubDate?: string;
};

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.news));
  }, []);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-12">📰 Notícias Recentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-zinc-200 rounded p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            {item.summary && (
              <p className="text-sm text-zinc-600">{item.summary}</p>
            )}
            {item.pubDate && (
              <p className="text-xs text-zinc-400 mt-2">
                {new Date(item.pubDate).toLocaleDateString()}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
