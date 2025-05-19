"use client";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    data_de_nascimento: "",
    bio: "",
    nickname: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    try {
      const res = await fetch(
        `/usuarios/registro/${encodeURIComponent(form.nome)}/${encodeURIComponent(form.email)}/${encodeURIComponent(form.senha)}/${encodeURIComponent(form.data_de_nascimento)}/${encodeURIComponent(form.bio)}/${encodeURIComponent(form.nickname)}`,
        { method: "PUT" }
      );
      if (!res.ok) {
        setErro("Erro ao registrar usuário.");
      } else {
        // Redirecionar ou mostrar sucesso
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
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="data_de_nascimento"
              placeholder="Data de Nascimento"
              value={form.data_de_nascimento}
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
          <div>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              value={form.confirmarSenha}
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
              Cadastrar
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <a href="login" className="text-sm text-blue-500 hover:underline">
            Possue uma Conta?
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