import { useState } from "react";

export default function InstagramAnalyzer() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">Análise de Perfil no Instagram</h2>
      <form onSubmit={handleAnalyze} className="flex gap-2 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@seudominio"
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button type="submit" className="bg-yellow-400 text-black px-6 py-2 font-semibold rounded">
          {loading ? "Analisando..." : "Analisar"}
        </button>
      </form>

      {result && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Resultado:</h3>
          <p className="text-sm whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  );
}
