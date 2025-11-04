import { useState } from "react";
import dkiMap from "../assets/jakarta.png"; // pastikan kamu punya file ini di folder /src/assets/

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const demoUser = { username: "admin", password: "12345" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === demoUser.username && password === demoUser.password) {
      onLogin();
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Bagian kiri: form login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white shadow-lg z-10 relative">
        <div className="max-w-sm w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-blue-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              IKD
            </div>
            <h2 className="text-2xl font-bold mt-4 text-blue-700">
              Sistem Pemantauan IKD
            </h2>
            <p className="text-sm text-gray-500">
              Dinas Dukcapil Provinsi DKI Jakarta
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* <p className="text-xs text-gray-500 mt-4 text-center">
            Demo akses: <strong>admin / 12345</strong>
          </p> */}
        </div>
      </div>

      {/* Bagian kanan: gambar peta */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={dkiMap}
          alt="Peta DKI Jakarta"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 bg-blue-700/40"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h3 className="text-3xl font-semibold mb-2">DKI Jakarta</h3>
          <p className="text-sm opacity-90">
            Transformasi Digital Identitas Kependudukan
          </p>
        </div>
      </div>
    </div>
  );
}
