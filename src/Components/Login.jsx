"use client";

import { useAuth } from "@/Context/LoginContext";
import React from "react";

const Login = () => {
  const { email, setEmail, password, setPassword, message, handleSubmit } =
    useAuth();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </label>
        </div>
        <button>Login</button>
        <p>{message}</p>
        <div>
          <p>
            Não tem uma conta? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
