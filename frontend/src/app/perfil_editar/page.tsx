"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";

export default function Perfil() {
  const [nome, setNome] = useState("Nome");
  const [bio, setBio] = useState("Bio");
  const [dataNascimento, setDataNascimento] = useState("2000-01-01");
  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");

  const [editNome, setEditNome] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editData, setEditData] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setMensagem({ tipo: "erro", texto: "O nome não pode ser vazio." });
      return;
    }
    setMensagem({ tipo: "sucesso", texto: "Perfil atualizado com sucesso!" });
    setEditNome(false);
    setEditBio(false);
    setEditData(false);
    setEditAvatar(false);
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-black">
      <Header />
      <main className="flex-grow px-0 py-0 w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h1>
        <form onSubmit={handleSalvar} className="w-full rounded-none shadow-none p-8 space-y-8">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              {editAvatar ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-600 underline"
                    onClick={() => setEditAvatar(false)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setEditAvatar(true)}
                >
                  Editar Avatar
                </button>
              )}
            </div>
          </div>

          {/* Nome */}
          <div className="flex items-center gap-2">
            {editNome ? (
              <>
                <input
                  className="border rounded px-2 py-1 flex-1 text-black"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="text-sm text-gray-600 underline"
                  onClick={() => setEditNome(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="font-semibold flex-1">{nome}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setEditNome(true)}
                >
                  Editar
                </button>
              </>
            )}
          </div>

          {/* Bio */}
          <div className="flex items-center gap-2">
            {editBio ? (
              <>
                <textarea
                  className="border rounded px-2 py-1 flex-1 text-black"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                  autoFocus
                />
                <button
                  type="button"
                  className="text-sm text-gray-600 underline"
                  onClick={() => setEditBio(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{bio}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setEditBio(true)}
                >
                  Editar
                </button>
              </>
            )}
          </div>

          {/* Data de nascimento */}
          <div className="flex items-center gap-2">
            {editData ? (
              <>
                <input
                  type="date"
                  className="border rounded px-2 py-1 flex-1 text-black"
                  value={dataNascimento}
                  onChange={e => setDataNascimento(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="text-sm text-gray-600 underline"
                  onClick={() => setEditData(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{dataNascimento}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setEditData(true)}
                >
                  Editar
                </button>
              </>
            )}
          </div>

          {/* Mensagem de feedback */}
          {mensagem && (
            <div
              className={`p-2 rounded text-center ${
                mensagem.tipo === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {mensagem.texto}
            </div>
          )}

          {/* Botão Salvar */}
          {(editNome || editBio || editData || editAvatar) && (
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Salvar Alterações
            </button>
          )}
        </form>
      </main>
    </div>
  );
}
