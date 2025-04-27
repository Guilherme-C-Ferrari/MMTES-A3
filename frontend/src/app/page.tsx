import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow px-6 py-8">

        <section className="">
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8">
            Obras Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div>
        </section>

        <section className="">
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8 py-8">
            Publicações
          </h2>
          <div className="space-y-6"></div>
        </section>
      </main>
    </div>
  );
}
