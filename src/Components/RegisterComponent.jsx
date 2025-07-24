"use client";
import { useRegister } from "@/Context/RegisterContext";
import React from "react";

const RegisterComponent = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleSubmit,
  } = useRegister();
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            E-mail:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
            />
          </label>
        </div>
        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </label>
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message}
    </div>
  );
};

export default RegisterComponent;
