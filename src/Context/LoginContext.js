"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import prisma from "../../lib/prisma/prisma";

export const LoginContextAuth = createContext(null);

export const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      console.log("Enviando para login:", { email, password });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: String(email),
          password: String(password),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        // Se vier message direta
        if (data.message) {
          setMessage(data.message);
          return;
        }

        // Se vier error em formato de objeto (Zod ou usuário não encontrado)
        if (data.error) {
          // Se for campo específico, ex: { email: ["Usuário não encontrado"] }
          const firstErrorKey = Object.keys(data.error)[0];
          const firstErrorMsg = data.error[firstErrorKey][0];
          setMessage(firstErrorMsg);
          return;
        }

        // Se não vier nada específico, usa genérica
        setMessage("Erro no login. Tente novamente.");
        return;
      }

      if (email === "ravelxc@gmail.com") {
        setMessage(
          `Login premium realizado:${data.username}. Redirecionando...`
        );
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
        return;
      }
      setMessage(
        `Login gratuito realizado: ${data.username}. Redirecionando...`
      );
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Erro no login:", err.message);
      // Mostrar mensagem de erro para usuário, ex: setState para mensagem
    }
  };
  return (
    <LoginContextAuth.Provider
      value={{ email, setEmail, password, setPassword, message, handleSubmit }}
    >
      {children}
    </LoginContextAuth.Provider>
  );
};

export const useAuth = () => {
  return useContext(LoginContextAuth);
};
