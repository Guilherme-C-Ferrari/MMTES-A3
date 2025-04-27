import Image from "next/image";

export default function Login() {
    return (
        <div className="min-h-screen w-screen flex bg-gray-100">
          {/* Lado Esquerdo */}
          <div className="w-1/2 p-8 flex flex-col justify-center text-black bg-white">
            <div className="mb-8 text-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                className="mx-auto mb-4"
                width={400} 
                height={300}
              />
            </div>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Nome de usuário ou Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
                >
                  Entrar
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <a href="/registro" className="text-sm text-blue-500 hover:underline">
                Não tem uma conta?
              </a>
            </div>
          </div>
      
          {/* Lado Direito */}
          <div className="w-1/2">
            <Image
              src="/imagem_fundo.jpg"
              alt="Quadrinhos"
              className="h-full w-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      );
}