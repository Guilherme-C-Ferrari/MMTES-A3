import Header from "@/components/Header";
import Image from "next/image";

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
    </div>
  );
}
