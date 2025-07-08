import { useEffect, useState } from "react";
import "./LoginAdm.css";

const LoginAdm = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const isAutenticado = localStorage.getItem("admautenticado") === "true";
    if (isAutenticado) {
      setAutenticado(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === "admin" && senha === "admin") {
      setErro("");
      setAutenticado(true);
      localStorage.setItem("admautenticado", "true");
    } else {
      setErro("Login ou senha inválidos");
      setAutenticado(false);
      localStorage.removeItem("admautenticado");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admautenticado");
    setAutenticado(false);
    setLogin("");
    setSenha("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {autenticado ? (
          <>
            <p className="login-success">Bem-vindo, admin! 🎉</p>
            <button className="login-button" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-input"
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erro && <p className="login-error">{erro}</p>}
            <button className="login-button" type="submit">
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginAdm;
