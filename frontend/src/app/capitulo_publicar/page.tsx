"use client";
import Header from "@/components/Header";
import { useState } from "react";

export default function CapituloPublicar() {
  const [form, setForm] = useState({
    numero: "",
    titulo: "",
    obra_id: "",
    token: "",
  });
  const [imagens, setImagens] = useState<File[]>([]);
  const [imagensPreview, setImagensPreview] = useState<string[]>([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImagens(files);
    setImagensPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!form.numero || !form.titulo || !form.obra_id || !form.token) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    if (imagens.length === 0) {
      setErro("Selecione pelo menos uma imagem.");
      return;
    }

    // Exemplo: Enviando as imagens para o backend via multipart/form-data
    const data = new FormData();
    data.append("numero", form.numero);
    data.append("titulo", form.titulo);
    data.append("obra_id", form.obra_id);
    data.append("token", form.token);
    imagens.forEach((img) => data.append("imagens", img, img.name));

    try {
      const res = await fetch("/capitulos/registro", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        setErro("Erro ao publicar capítulo.");
      } else {
        setSucesso("Capítulo publicado com sucesso!");
        setForm({
          numero: "",
          titulo: "",
          obra_id: "",
          token: "",
        });
        setImagens([]);
        setImagensPreview([]);
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
          <h2 className="text-4xl font-semibold text-center text-black">Publicar Capítulo</h2>
        </section>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md text-black"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="numero" className="block text-sm font-medium mb-1 text-black">
              Número do Capítulo
            </label>
            <input
              type="number"
              name="numero"
              id="numero"
              value={form.numero}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
              min="1"
              step="any"
            />
          </div>
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium mb-1 text-black">
              Título do Capítulo
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
            <label htmlFor="imagens" className="block text-sm font-medium mb-1 text-black">
              Imagens do Capítulo
            </label>
            <input
              type="file"
              name="imagens"
              id="imagens"
              accept="image/*"
              multiple
              // @ts-ignore
              webkitdirectory=""
              onChange={handleImagensChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black bg-white"
              required
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagensPreview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="obra_id" className="block text-sm font-medium mb-1 text-black">
              ID da Obra
            </label>
            <input
              type="number"
              name="obra_id"
              id="obra_id"
              value={form.obra_id}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
              min="1"
            />
          </div>
          <div>
            <label htmlFor="token" className="block text-sm font-medium mb-1 text-black">
              Token de Autenticação
            </label>
            <input
              type="text"
              name="token"
              id="token"
              value={form.token}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-black"
              required
            />
          </div>
          {erro && <div className="text-red-500 text-sm">{erro}</div>}
          {sucesso && <div className="text-green-600 text-sm">{sucesso}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150 font-semibold"
          >
            Publicar Capítulo
          </button>
        </form>
      </main>
    </div>
  );
}