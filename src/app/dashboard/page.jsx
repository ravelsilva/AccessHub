"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // começa como NÃO logado
  const [isLoading, setIsLoading] = useState(true); // controle do loading
  useEffect(() => {
    setIsLoggedIn(false);
    const checkAuth = async () => {
      const res = await fetch("api/protected");
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <p>Verificando autenticação...</p>;

  if (!isLoggedIn) return null;
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
