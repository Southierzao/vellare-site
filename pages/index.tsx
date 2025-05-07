import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 font-sans">
      <section className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">VELLARE DIGITAL</h1>
        <p className="text-lg mb-6">Resultados reais com tráfego pago e performance.</p>
        <Button className="bg-yellow-400 text-zinc-900 font-semibold px-6 py-3">Solicite uma Análise</Button>
      </section>
    </div>
  );
}
