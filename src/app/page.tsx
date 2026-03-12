'use client'

import Link from 'next/link';
import NetworkBackground from './networking';

export default function Home() {

  return (
    
  <div className="relative w-screen h-screen flex justify-around items-center font-[var(--font-sans)] bg-[oklch(1_0_0)] text-slate-900 overflow-hidden">
    
   {/* ARTE VIVA DE FUNDO: Formas Abstratas e Conexões */}
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
      <NetworkBackground />
    </div>

    {/* Conteúdo Principal (z-20 para ficar acima de toda a arte) */}
    <div className="relative z-20 flex flex-col gap-10 max-w-4xl px-12 items-start">
      <div className="flex flex-col gap-5 max-w-[490px] max-md:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-900 text-6xl font-bold">GRAÇA</h1>
          <span className="text-gray-600 font-extralight text-[20px]">GRAÇA - Gestor de Rede de Apoio Comunitário e Assistência</span>
        </div>
        <div>
          <Link href={'/login'}><button className="bg-red-500 border-red-500 border text-left px-6 py-3 rounded-lg mt-3 cursor-pointer hover:bg-transparent transition duration-500">Entrar para cadastrar pontos e interagir</button></Link>
          <Link href={'/encontrepontos'}><button className="bg-blue-500 border-blue-500 border text-left  px-6 py-3 rounded-lg mt-3 cursor-pointer hover:bg-transparent transition duration-500">Explorar pontos de doação cadastrados</button></Link>
        </div>
      </div>
      <div>
      </div>
    </div>

  </div>
  );
}