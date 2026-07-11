import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/admin");

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <section className="bg-slate-950 min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-xl w-96"
      >

        <h2 className="text-white text-3xl font-bold mb-6">
          Admin Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 text-white mb-6"
        />

        <button
          className="w-full bg-cyan-500 py-3 rounded text-white font-bold"
        >
          Login
        </button>

      </form>

    </section>
  );
}

export default Login;