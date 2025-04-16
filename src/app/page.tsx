import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // Redireciona para /login automaticamente
  return null;
}
