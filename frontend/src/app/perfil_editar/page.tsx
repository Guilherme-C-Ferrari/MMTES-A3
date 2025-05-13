import Header from "@/components/Header";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <div className="p-8 flex flex-col justify-center text-black">
            <div className="mb-8 text-center">
            </div>
            <form className="space-y-4">
              <div>
                <input
                  type="nome"
                  placeholder="Nome"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="data de nascimento"
                  placeholder="Data de Nascimento"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="nickname"
                  placeholder="Nick"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="bio"
                  placeholder="Biografia"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
                  >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>

  );
}
