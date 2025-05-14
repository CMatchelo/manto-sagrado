'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/header';
import JerseyTable from './components/jerseyTable';
import { useJerseyContext } from '@/contexts/JerseyContext';
import { JerseyType } from '@/types/jerseyType';

const Profile = () => {

  const { user, loading } = useAuth();
  const [filtederCollection, setFilteredCollection] = useState<JerseyType[]>([])
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { jerseyCollection } = useJerseyContext()

  useEffect(() => {
    setFilteredCollection(jerseyCollection)
    console.log("Colecao filtrada", jerseyCollection)
  }, [jerseyCollection])

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading) return <div>Carregando...</div>;
  if (!user) return null;


  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <JerseyTable collection={filtederCollection} />
    </div>
  );
}

export default Profile