"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    setAutenticado(!!localStorage.getItem("nickname"));
  }, []);

  function handleClick() {
    if (autenticado) {
      router.push("/perfil");
    } else {
      router.push("/login");
    }
  }

  function handlePublicarClick(e: React.MouseEvent) {
    e.preventDefault();
    if (autenticado) {
      router.push("/obra_cadastro");
    } else {
      router.push("/login");
    }
  }

  return (
    <header className="w-full flex justify-between items-center py-4 px-50 ">
      <Link href={"/"} className="flex-shrink-0">
        <Image
          className="dark"
          src="/logo.svg"
          alt="Logo"
          width={200}
          height={0}
        />
      </Link>

      <div className="flex items-center space-x-30 text-gray-600 font-bold text-2xl">
        <a href={"/"} className="hover:text-gray-800">
          Categorias
        </a>
        <button
          onClick={handlePublicarClick}
          className="hover:text-gray-800 bg-transparent border-none cursor-pointer"
          style={{ fontSize: "inherit", fontWeight: "inherit" }}
        >
          Publicar
        </button>
      </div>

      <div className="relative mx-4 flex-grow max-w-md">
        <input
          type="text"
          className="w-full h-10 px-4 border border-gray-600 rounded-full focus:outline-none focus:ring focus:ring-gray-800"
        />
        <button className="absolute right-0 top-0 h-full px-4 text-white  rounded-full hover:bg-blue-600">
          <Image
            className="dark"
            src={"/search.svg"}
            alt="Search"
            width={20}
            height={20}
          />
        </button>
      </div>
      <button onClick={handleClick} className="p2 ">
        <Image
          className=""
          src={"/circle-user.svg"}
          alt="User"
          width={40}
          height={40}
        />
      </button>
    </header>
  );
}
