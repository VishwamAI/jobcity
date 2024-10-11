import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
};

export default Index;
