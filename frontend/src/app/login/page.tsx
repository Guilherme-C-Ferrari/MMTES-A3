"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ nickname: "", senha: "" });
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    try {
      const res = await fetch(
        `/autenticacao/${encodeURIComponent(form.nickname)}/${encodeURIComponent(form.senha)}/`,
        { method: "POST" }
      );
      if (!res.ok) {
        setErro("Usuário ou senha inválidos.");
      } else {
        localStorage.setItem("nickname", form.nickname);
        router.push("/perfil");
      }
    } catch {
      setErro("Erro de conexão.");
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="nickname"
              placeholder="Nome de usuário"
              value={form.nickname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {erro && <div className="text-red-500 text-sm">{erro}</div>}
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