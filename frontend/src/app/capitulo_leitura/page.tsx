"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

type Capitulo = {
  _id: number;
  _titulo: string;
  _numero: number;
  _obra_id: number;
  _imagem: string[]; // lista das páginas
};

function ChapterReader({ chapterId }: { chapterId: string }) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ajuste a URL conforme seu backend
        const response = await fetch(
          `http://localhost:8000/capitulos/${chapterId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Capitulo = await response.json();
        setPages(data._imagem || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId]);

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  if (loading) {
    return <div className="chapter-reader-container">Carregando capítulo...</div>;
  }

  if (error) {
    return (
      <div className="chapter-reader-container error">
        Erro ao carregar o capítulo: {error}
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="chapter-reader-container no-pages">
        Nenhuma página encontrada para este capítulo.
      </div>
    );
  }

  const currentPage = pages[currentPageIndex];

  return (
    <div className="chapter-reader-container">
      <h1>Capítulo {chapterId}</h1>
      <h2>
        Página {currentPageIndex + 1} de {pages.length}
      </h2>
      <div className="page-content">
        <img
          src={currentPage}
          alt={`Página ${currentPageIndex + 1}`}
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePreviousPage} disabled={currentPageIndex === 0}>
          Página Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPageIndex === pages.length - 1}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}

// Componente principal da página
export default function CapituloLeituraPage() {
  // Exemplo: obtenha o chapterId da query string, rota, etc.
  const chapterId = "1"; // Substitua pela lógica real

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <ChapterReader chapterId={chapterId} />
    </div>
  );
}
