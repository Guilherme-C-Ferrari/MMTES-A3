"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

export default function ObraCadastro() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    autor: "",
    genero: "",
    capa: "", // manter para compatibilidade
  });
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState<string | null>(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapaFile(file);
      setCapaPreview(URL.createObjectURL(file));
    } else {
      setCapaFile(null);
      setCapaPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!form.titulo || !form.descricao || !form.autor || !form.genero) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!capaFile) {
      setErro("Selecione uma imagem de capa.");
      return;
    }

    // Exemplo: Enviando a imagem para o backend via multipart/form-data
    const data = new FormData();
    data.append("titulo", form.titulo);
    data.append("descricao", form.descricao);
    data.append("autor", form.autor);
    data.append("genero", form.genero);
    data.append("capa", capaFile);

    try {
      const res = await fetch("/obras/registro", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        setErro("Erro ao cadastrar obra.");
      } else {
        setSucesso("Obra cadastrada com sucesso!");
        setForm({
          titulo: "",
          descricao: "",
          autor: "",
          genero: "",
          capa: "",
        });
        setCapaFile(null);
        setCapaPreview(null);
      }
    } catch {
      setErro("Erro de conexão.");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-6 max-w-6xl mx-auto w-full">
        <section className="mb-8 flex flex-col items-center">
          <div className="relative w-64 h-96 mb-4">
            <Image
              src={capaPreview || "/imagem_fundo.jpg"}
              alt="Capa da Obra"
              fill
              className="object-cover rounded-md shadow-md"
            />
          </div>
          <h2 className="text-4xl font-semibold text-center text-black">Cadastrar Nova Obra</h2>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md text-black" encType="multipart/form-data">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium mb-1 text-black">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium mb-1 text-black">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="autor" className="block text-sm font-medium mb-1 text-black">
              Autor
            </label>
            <input
              type="text"
              name="autor"
              id="autor"
              value={form.autor}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="genero" className="block text-sm font-medium mb-1 text-black">
              Gênero
            </label>
            <input
              type="text"
              name="genero"
              id="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="capa" className="block text-sm font-medium mb-1 text-black">
              Imagem da Capa
            </label>
            <input
              type="file"
              name="capa"
              id="capa"
              accept="image/*"
              onChange={handleCapaChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black bg-white"
              required
            />
          </div>
          {erro && <div className="text-red-500 text-sm">{erro}</div>}
          {sucesso && <div className="text-green-600 text-sm">{sucesso}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150 font-semibold"
          >
            Cadastrar Obra
          </button>
        </form>
      </main>
    </div>
  );
}