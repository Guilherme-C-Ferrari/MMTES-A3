"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Obra {
  id: string;
  titulo: string;
  descricao: string;
  genero: string;
  capa: string;
}

export default function ObraEditar() {
  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    genero: "",
    capa: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetch("/obras/lista_de_obras")
        .then((res) => {
          if (!res.ok) throw new Error(`Erro ao buscar obras: ${res.status}`);
          return res.json();
        })
        .then((obras: Obra[]) => {
          const encontrada = obras.find((o) => String(o.id) === String(id));
          if (encontrada) {
            setObra(encontrada);
            setForm({
              titulo: encontrada.titulo || "",
              descricao: encontrada.descricao || "",
              genero: encontrada.genero || "",
              capa: encontrada.capa || "",
            });
          } else {
            setObra(null);
          }
        })
        .catch((error) => {
          console.error("Falha ao buscar dados da obra:", error);
          setObra(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setObra(null);
    }
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!obra || !obra.id) {
      alert("Dados da obra não carregados ou ID da obra ausente.");
      return;
    }
    try {
      const response = await fetch(
        `/obras/edicao/${obra.id}/${encodeURIComponent(form.titulo)}/${encodeURIComponent(form.descricao)}/${encodeURIComponent(form.genero)}/${encodeURIComponent(form.capa)}`,
        { method: "PATCH" }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Erro HTTP: ${response.status}`,
        }));
        throw new Error(errorData.message || `Erro ao atualizar obra.`);
      }
      alert("Obra atualizada com sucesso!");
      // router.push(`/obras/${obra.id}`);
    } catch (error) {
      console.error("Erro ao submeter o formulário:", error);
      if (error instanceof Error) {
        alert(`Erro ao atualizar obra: ${error.message}`);
      } else {
        alert("Ocorreu um erro desconhecido ao tentar atualizar a obra.");
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        Carregando...
      </div>
    );
  }

  if (!obra) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center items-center px-4 py-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Obra não encontrada.</h2>
            <p>Verifique se o ID na URL está correto ou tente novamente.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow px-4 py-6 max-w-3xl mx-auto w-full">
        <section className="mb-8 flex flex-col items-center">
          <div className="relative w-56 h-80 sm:w-64 sm:h-96 mb-6 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={form.capa || "/imagem_fundo.jpg"}
              alt={`Capa da obra ${form.titulo || "desconhecida"}`}
              fill
              sizes="(max-width: 640px) 14rem, 16rem"
              className="object-cover"
              priority
              onError={(e) => {
                console.warn(`Erro ao carregar imagem: ${form.capa}`);
              }}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
            Editar Obra: {obra.titulo}
          </h1>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
              Gênero
            </label>
            <input
              type="text"
              name="genero"
              id="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="capa" className="block text-sm font-medium text-gray-700 mb-1">
              URL da Capa
            </label>
            <input
              type="url"
              name="capa"
              id="capa"
              value={form.capa}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out font-semibold"
          >
            Salvar Alterações
          </button>
        </form>
      </main>
    </div>
  );
}