import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Obra() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-6 max-w-6xl mx-auto w-full">
        <section className="mb-8 flex flex-col items-center">
          <div className="relative w-64 h-96 mb-4">
            <Image 
              src="/imagem_fundo.jpg" 
              alt="Solo Leveling Cover" 
              fill
              className="object-cover rounded-md shadow-md"
            />
          </div>
          <h2 className="text-4xl font-semibold text-center">Ora Ora Ora Ora Ora Ora </h2>
        </section>

        <section className="p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc enim neque, blandit et leo imperdiet, pulvinar laoreet orci. Nam non commodo elit. Curabitur pellentesque lorem quis augue suscipit, sed cursus orci lacinia. Etiam vel risus ac quam tincidunt aliquet eu id ligula. Curabitur vulputate erat nisi, a porttitor turpis malesuada eget. Phasellus tristique ornare tempus. Vivamus semper quam turpis, id vehicula diam dapibus imperdiet. Aenean in massa id erat consequat commodo.
          </p>
        </section>

        <section className="mb-8">
          <div className="space-y-4">
            <div className="outline-1 rounded-2xl overflow-hidden">
              <div className="flex items-center p-4">
                <Image
                  src="/imagem_fundo.jpg"
                  alt="Cap 1"
                  width={100}
                  height={100}
                  className="rounded-md shadow-md"  
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">Cap 1</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Botão flutuante canto inferior direito */}
      <Link
        href="/capitulo_publicar"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition z-50"
        title="Publicar capítulo"
        aria-label="Publicar capítulo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}
