'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-dvh min-h-screen flex-wrap items-center justify-center bg-cover bg-center p-md">
      <div>
        <Image
          src="/images/loading.gif"
          alt="Logo"
          width={300}
          height={200}
          priority
        />
      </div>
      <h1>CONKIRI 접속 중...</h1>
    </div>
  );
}
