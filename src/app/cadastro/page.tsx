import React from 'react';
import CadastroPasso1 from './form';
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';

export default async function CadastroPage() {

   const user = await getAuthUser()
    
    if (user) {
      redirect('/pontos')
    }
  

  return (
    <div className="dark">    
        <CadastroPasso1 />
    </div>
  )
}
