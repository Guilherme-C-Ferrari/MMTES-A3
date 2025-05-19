'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";

export default function ObraValidar() {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
  // Get token from localStorage (you should implement proper auth state management)
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken") || "";
    }
    return "";
  };

  // Fetch pending works
  useEffect(() => {
    const fetchPendingObras = async () => {
      try {
        setLoading(true);
        const token = getToken();
        const response = await fetch(`/obras/pendentes_validacao?token=${token}`);
        
        if (!response.ok) {
          throw new Error(response.status === 403 
            ? "Acesso restrito a administradores" 
            : "Falha ao carregar obras pendentes");
        }
        
        const data = await response.json();
        setObras(data);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar obras pendentes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingObras();
  }, []);

  // Handle validation
  const handleValidate = async (id, action) => {
    try {
      const token = getToken();
      
      if (action === "accept") {
        const response = await fetch(`/obras/validar/${id}?token=${token}`, {
          method: "PATCH",
        });
        
        if (!response.ok) {
          throw new Error("Falha ao validar obra");
        }
        
        // Remove validated work from list
        setObras(obras.filter(obra => obra.id !== id));
        showNotification("Obra validada com sucesso!", "success");
      } else {
        // Implement rejection logic if you have an endpoint for it
        // For now, just remove from the list
        setObras(obras.filter(obra => obra.id !== id));
        showNotification("Obra rejeitada", "info");
      }
    } catch (err) {
      showNotification(err.message, "error");
      console.error("Erro na validação:", err);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow px-6 py-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Validação de Obras</h1>
        
        {/* Notification */}
        {notification.show && (
          <div className={`mb-4 p-4 rounded-md ${
            notification.type === "success" ? "bg-green-100 text-green-800" :
            notification.type === "error" ? "bg-red-100 text-red-800" :
            "bg-blue-100 text-blue-800"
          }`}>
            <span>⚠️ {notification.message}</span>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando obras pendentes...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            <p className="font-medium">Erro</p>
            <p>{error}</p>
          </div>
        )}

        {/* No pending works */}
        {!loading && !error && obras.length === 0 && (
          <div className="bg-blue-50 text-blue-700 p-6 rounded-md text-center">
            <p className="text-lg">Não há obras pendentes de validação.</p>
          </div>
        )}

        {/* Works list */}
        {!loading && !error && obras.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {obras.map((obra) => (
                  <tr key={obra.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {obra.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/obras/${obra.id}`} className="text-blue-600 hover:text-blue-900">
                        {obra.titulo}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {obra.autor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleValidate(obra.id, "accept")}
                          className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={() => handleValidate(obra.id, "reject")}
                          className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md"
                        >
                          Negar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}