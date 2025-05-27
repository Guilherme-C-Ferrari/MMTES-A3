"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const url = `http://localhost:8000/usuarios/registro/${encodeURIComponent(
        nome
      )}/${encodeURIComponent(email)}/${encodeURIComponent(senha)}/${encodeURIComponent(
        dataNascimento
      )}/${encodeURIComponent("")}/${encodeURIComponent(nickname)}`;
      const response = await fetch(url, { method: "PUT" });

      if (response.ok) {
        setMensagem("Registro realizado com sucesso!");
        setNickname("");
        setNome("");
        setEmail("");
        setDataNascimento("");
        setSenha("");
        setConfirmarSenha("");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMensagem(`Erro: ${errorData.detail || "Falha ao registrar."}`);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
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
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="nickname"
              placeholder="Nome de usuário"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="data_de_nascimento"
              placeholder="Data de Nascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {mensagem && (
            <div
              className={`text-sm ${
                mensagem.includes("sucesso")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {mensagem}
            </div>
          )}
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
          <a
            href="login"
            className="text-sm text-blue-500 hover:underline"
          >
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