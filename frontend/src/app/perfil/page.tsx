import Header from "@/components/Header";
import Link from "next/link";

export default function Perfil() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow px-6 py-8">
        
        <section className="p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc enim neque, blandit et leo imperdiet, pulvinar laoreet orci. Nam non commodo elit. Curabitur pellentesque lorem quis augue suscipit, sed cursus orci lacinia. Etiam vel risus ac quam tincidunt aliquet eu id ligula. Curabitur vulputate erat nisi, a porttitor turpis malesuada eget. Phasellus tristique ornare tempus. Vivamus semper quam turpis, id vehicula diam dapibus imperdiet. Aenean in massa id erat consequat commodo.
          </p>
        </section>

        <section className="">
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8">
            Obras Curtidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div>
        </section>

        <section className="">
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8 py-8">
            Artistas Favoritos
          </h2>
          <div className="space-y-6"></div>
        </section>

        <section className="">
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8">
            Postagens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div>
        </section>

      </main>
    </div>
  );
}
