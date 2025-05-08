import { Button } from "../components/ui/button";
import InstagramAnalyzer from "../components/ui/InstagramAnalyzer";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 font-sans">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">VELLARE DIGITAL</h1>
        <p className="text-lg mb-6">Resultados reais com tráfego pago e performance.</p>
        <Button className="bg-yellow-400 text-zinc-900 font-semibold px-6 py-3">Solicite uma Análise</Button>
      </section>

      {/* Sobre */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Sobre a Vellare</h2>
        <p className="text-zinc-700 text-lg leading-relaxed">
          A Vellare Digital é uma empresa especializada em tráfego pago, performance digital e geração de resultados.
          Nosso nome une os conceitos de valor (valore) e elevação (elevare), representando nossa missão de elevar marcas
          por meio de estratégias modernas, flexíveis e eficientes.
        </p>
      </section>

      {/* Serviços */}
      <section className="bg-zinc-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Meta Ads", desc: "Campanhas no Instagram e Facebook com foco em conversão." },
              { title: "Google Ads", desc: "Anúncios em pesquisas com otimização contínua." },
              { title: "Consultoria de Performance", desc: "Diagnóstico e planejamento para escalar seu negócio." }
            ].map((servico, i) => (
              <Card key={i} className="bg-white border border-zinc-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{servico.title}</h3>
                  <p className="text-zinc-600">{servico.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Conteúdos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "5 Erros no Meta Ads", summary: "Evite desperdício de verba e otimize resultados." },
            { title: "Funil de Vendas com Tráfego", summary: "Como montar um funil eficiente com anúncios." },
            { title: "Diferença entre tráfego pago e SEO", summary: "Saiba quando usar cada estratégia." }
          ].map((post, i) => (
            <Card key={i} className="bg-white border border-zinc-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-zinc-600">{post.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Analisador de Instagram */}
      <div className="py-20 bg-white">
        <InstagramAnalyzer />
        </div>
      {/* Contato */}
      <section className="bg-zinc-50 py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Fale com a Gente</h2>
        <p className="text-zinc-700 mb-6">Quer impulsionar seu negócio? Entre em contato conosco.</p>
        <form className="max-w-xl mx-auto space-y-4 text-left">
          <input type="text" placeholder="Seu nome" className="w-full border border-zinc-300 rounded px-4 py-3" />
          <input type="email" placeholder="Seu e-mail" className="w-full border border-zinc-300 rounded px-4 py-3" />
          <textarea placeholder="Mensagem" rows={4} className="w-full border border-zinc-300 rounded px-4 py-3"></textarea>
          <div className="text-center">
            <Button className="bg-yellow-400 text-zinc-900 font-bold px-6 py-3">Enviar</Button>
          </div>
        </form>
      </section>

      {/* WhatsApp */}
      <a href="https://wa.me/5599999999999" target="_blank" rel="noopener noreferrer"
         className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M16.24 7.76a6 6 0 01-8.48 8.48l-3.76 1 1-3.76a6 6 0 0111.24-5.72z"/></svg>
      </a>

      {/* Rodapé */}
      <footer className="bg-white border-t border-zinc-200 py-6 text-center text-sm text-zinc-500">
        © 2025 Vellare Digital — vellaredigital.com.br | CNPJ 00.000.000/0001-00
      </footer>
    </div>
  );
}
