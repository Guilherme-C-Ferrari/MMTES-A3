import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
        <a href={"/"} className="hover:text-gray-800">
          Publicar
        </a>
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
      <a href={"/login"} className="p2 ">
        <Image
          className=""
          src={"/circle-user.svg"}
          alt="User"
          width={40}
          height={40}
        />
      </a>
    </header>
  );
}
