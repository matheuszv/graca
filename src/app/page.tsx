'use client'

import Link from 'next/link';

export default function Home() {

  return (
    <div className="bg-[url('/MaskGroup.png')] bg-center bg-no-repeat w-screen h-screen flex justify-around items-center font-[var(--font-sans)] bg-[#121214] gap-8">
      <div className="flex flex-col gap-5 max-w-[490px] max-md:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-6xl font-bold">GRAÇA</h1>
          <span className="text-[#A9A9B2] font-extralight text-[20px]">GRAÇA - Gestão de Recursos de Alimentos Cuidados e Apoio</span>
        </div>
        <div>
          <Link href={'/login'}><button className="bg-red-500 border-red-500 border text-left px-6 py-3 rounded-lg mt-3 cursor-pointer hover:bg-transparent transition duration-500">Entrar para cadastrar pontos e interagir</button></Link>
          <Link href={'/encontrepontos'}><button className="bg-blue-500 border-blue-500 border text-left  px-6 py-3 rounded-lg mt-3 cursor-pointer hover:bg-transparent transition duration-500">Explorar pontos de doação cadastrados</button></Link>
        </div>
      </div>
      <div>
      </div>
   </div>
  );
}