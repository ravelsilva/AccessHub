"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

export const RegisterContext = createContext(null);

export function RegisterProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        const errormsg = data.error
          ? Object.values(data.error).flat().join(" ")
          : data.message || "Erro no login.";
        setMessage(errormsg);
        return;
      }
      setMessage(
        `Registro realizado: ${data.username}. Redirecionando para o login...`
      );
      setTimeout(() => {
        router.push("/");
      }, 3000);
      return;
    } catch (err) {
      setMessage("Erro no registro:", err.message);
    }
  };
  return (
    <RegisterContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        message,
        handleSubmit,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => {
  return useContext(RegisterContext);
};
