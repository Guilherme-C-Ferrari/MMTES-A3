"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Usuario {
  nome: string;
  email: string;
  data_de_nascimento: string;
  bio: string;
  nickname: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [obrasCurtidas, setObrasCurtidas] = useState<any[]>([]);
  const [artistasFavoritos, setArtistasFavoritos] = useState<any[]>([]);
  const [postagens, setPostagens] = useState<any[]>([]);

  // Supondo que você tenha um token ou nickname salvo no localStorage/cookie
  useEffect(() => {
    const nickname = localStorage.getItem("nickname");
    if (!nickname) return;

    // Buscar dados do usuário
    fetch(`/usuarios/lista_de_usuarios`)
      .then(res => res.json())
      .then(data => {
        const user = data.find((u: Usuario) => u.nickname === nickname);
        setUsuario(user);
      });

    // Buscar obras curtidas, artistas favoritos e postagens (ajuste as rotas conforme seu backend)
    // Exemplo fictício:
    fetch(`/usuarios/obras_curtidas/${nickname}`)
      .then(res => res.json())
      .then(setObrasCurtidas);

    fetch(`/usuarios/artistas_favoritos/${nickname}`)
      .then(res => res.json())
      .then(setArtistasFavoritos);

    fetch(`/usuarios/postagens/${nickname}`)
      .then(res => res.json())
      .then(setPostagens);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow px-6 py-8">
        <section className="p-6 mb-8">
          {usuario ? (
            <>
              <h1 className="text-2xl font-bold mb-2">{usuario.nome} (@{usuario.nickname})</h1>
              <p className="text-gray-700 mb-2">{usuario.email}</p>
              <p className="text-gray-700 mb-2">Nascimento: {usuario.data_de_nascimento}</p>
              <p className="text-gray-700 leading-relaxed">{usuario.bio}</p>
            </>
          ) : (
            <p>Carregando perfil...</p>
          )}
        </section>

        <section>
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8">
            Obras Curtidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {obrasCurtidas.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">Nenhuma obra curtida.</p>
            ) : (
              obrasCurtidas.map((obra, idx) => (
                <div key={idx} className="bg-white rounded shadow p-4">
                  <h3 className="font-bold">{obra.titulo}</h3>
                  <p>{obra.autor}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8 py-8">
            Artistas Favoritos
          </h2>
          <div className="space-y-6">
            {artistasFavoritos.length === 0 ? (
              <p className="text-center text-gray-400">Nenhum artista favorito.</p>
            ) : (
              artistasFavoritos.map((artista, idx) => (
                <div key={idx} className="bg-white rounded shadow p-4">
                  <h3 className="font-bold">{artista.nome}</h3>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-center text-gray-600 text-2xl font-bold mb-8">
            Postagens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {postagens.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">Nenhuma postagem.</p>
            ) : (
              postagens.map((post, idx) => (
                <div key={idx} className="bg-white rounded shadow p-4">
                  <h3 className="font-bold">{post.titulo}</h3>
                  <p>{post.conteudo}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      {/* Botão flutuante para editar perfil */}
      <Link
        href="/perfil_editar"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition z-50"
        title="Editar perfil"
        aria-label="Editar perfil"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
        </svg>
      </Link>
    </div>
  );
}
