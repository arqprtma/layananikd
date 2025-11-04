"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import user from "../assets/user.png";

const DATA = {
  meta: {
    total_wajib_ktp: 8079119,
    total_aktivasi: 2177081,
    rata_rata: 30.1,
    target: 30,
    updated: "24 Oktober 2025",
  },
  wilayah: [
    { id: 1, nama: "Kepulauan Seribu", jumlah_rekam: 20819, target_30: 6246, realisasi: 9879, persen: 47.45 },
    { id: 2, nama: "Jakarta Pusat", jumlah_rekam: 794239, target_30: 238272, realisasi: 198595, persen: 25.0 },
    { id: 3, nama: "Jakarta Utara", jumlah_rekam: 1324940, target_30: 397482, realisasi: 319598, persen: 24.12 },
    { id: 4, nama: "Jakarta Barat", jumlah_rekam: 1874294, target_30: 562288, realisasi: 543911, persen: 29.02 },
    { id: 5, nama: "Jakarta Selatan", jumlah_rekam: 1721564, target_30: 516469, realisasi: 461139, persen: 26.79 },
    { id: 6, nama: "Jakarta Timur", jumlah_rekam: 2347855, target_30: 704357, realisasi: 662999, persen: 28.24 },
  ],
};

/* --- small helpers --- */
const statusFromPercent = (p, target = 30) => {
  if (p >= target) return { label: "Melebihi target", color: "green" };
  return { label: "Belum sesuai target", color: "red" };
};

const NumberCard = ({ title, value, sub }) => (
  <div className="bg-white shadow-sm rounded-2xl p-4 flex flex-col">
    <div className="text-xs text-slate-400">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-slate-800 break-words">{value}</div>
    {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
  </div>
);

/* --- components --- */
function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">IKD</div>
        <div>
          <div className="text-sm font-semibold">Sistem IKD</div>
          <div className="text-xs text-slate-400">Dinas Dukcapil DKI</div>
        </div>
      </div>

      <nav className="flex flex-col gap-3 text-slate-600">
        <button className="text-left flex items-center gap-3 py-2 px-3 rounded-lg bg-slate-50 font-medium">
          🏠 Dashboard
        </button>
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

function Header({ updated, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-3">
        {/* 🍔 Burger menu hanya muncul di HP */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-slate-600 text-2xl focus:outline-none"
        >
          ☰
        </button>
        <div>
          <div className="text-sm text-slate-500">
            Dashboard Pemantauan Layanan IKD
          </div>
          <div className="text-xs text-slate-400">Data cut-off: {updated}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-slate-500 text-sm hidden md:block">
          Admin Dukcapil
        </div>
       <img
          src={user}
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover border border-slate-200"
        />
      </div>
    </header>
  );
}

function RegionCard({ item }) {
  const status = statusFromPercent(item.persen, DATA.meta.target);
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex-1 min-w-[200px] sm:min-w-[240px]">
      <div className="flex justify-between items-start">
        <div className="font-semibold text-slate-800 text-sm sm:text-base">{item.nama}</div>
        <div className="text-xs text-slate-400">Target 30%</div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-slate-50 text-sm sm:text-lg font-semibold">
          {Math.round(item.persen)}%
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-600">
            Realisasi: <span className="font-medium text-slate-800">{item.realisasi.toLocaleString()}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Dari {item.jumlah_rekam.toLocaleString()} wajib KTP
          </div>
          <div className="mt-3">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  status.color === "green"
                    ? "bg-green-500"
                    : "bg-red-400"
                }`}
                style={{ width: `${Math.min(item.persen, 100)}%` }}
              />
            </div>
            <div className="text-xs mt-1 text-slate-500">{status.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsPanel({ meta }) {
  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">Statistics</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        <NumberCard title="Total Wajib KTP" value={meta.total_wajib_ktp.toLocaleString()} sub="Seluruh DKI Jakarta" />
        <NumberCard title="Total Aktivasi IKD" value={meta.total_aktivasi.toLocaleString()} sub={`Rata-rata ${meta.rata_rata}%`} />
        <NumberCard title="Rata-rata Capaian" value={`${meta.rata_rata}%`} sub={`Target ${meta.target}%`} />
        <NumberCard title="Target Aktivasi" value={`${meta.target}%`} sub="Target provinsi" />
      </div>
    </div>
  );
}

function ActivityChart({ wilayah }) {
  const max = Math.max(...wilayah.map((w) => w.persen));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="text-sm font-semibold mb-3">Capaian per Wilayah (%)</div>
      <div className="flex items-end justify-between gap-3 h-48 sm:h-52 px-1">
        {wilayah.map((w) => {
          const height = (w.persen / max) * 100;
          return (
            <div key={w.id} className="flex-1 flex flex-col items-center justify-end">
              <div
                className={`w-5 sm:w-7 rounded-t-md transition-all duration-500 ${
                  w.persen >= 30 ? "bg-green-400" : "bg-red-400"
                }`}
                style={{
                  height: `${height}px`,
                  minHeight: "8px",
                }}
              ></div>
              <div className="text-[10px] sm:text-xs text-center mt-2 font-medium truncate w-10 sm:w-auto">
                {w.nama.split(" ")[1] ?? w.nama.split(" ")[0]}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">{w.persen}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WilayahTable({ wilayah }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold">Daftar Wilayah</div>
        <div className="text-xs text-slate-400">Urut berdasarkan %</div>
      </div>

      <table className="w-full text-xs sm:text-sm min-w-[600px]">
        <thead>
          <tr className="text-left text-xs text-slate-400">
            <th className="py-2">Wilayah</th>
            <th>Jumlah Rekam</th>
            <th>Target (30%)</th>
            <th>Realisasi</th>
            <th>Persen</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {wilayah.map((w) => {
            const st = statusFromPercent(w.persen, DATA.meta.target);
            return (
              <tr key={w.id} className="border-t">
                <td className="py-3">{w.nama}</td>
                <td>{w.jumlah_rekam.toLocaleString()}</td>
                <td>{w.target_30.toLocaleString()}</td>
                <td>{w.realisasi.toLocaleString()}</td>
                <td>{w.persen}%</td>
                <td>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                      st.color === "green"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {st.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MobileSidebar({ open, onClose }) {
  return (
    <>
      {/* Background overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar content */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              IKD
            </div>
            <div>
              <div className="text-sm font-semibold">Sistem IKD</div>
              <div className="text-xs text-slate-400">Dinas Dukcapil DKI</div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <button
            className="text-left flex items-center gap-3 py-2 px-3 rounded-lg bg-slate-50 font-medium"
            onClick={onClose}
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.href = "/login";
            }}
            className="text-left flex items-center gap-3 py-2 px-3 rounded-lg bg-red-500 text-white font-medium"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}


/* --- main app --- */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sorted = [...DATA.wilayah].sort((a, b) => b.persen - a.persen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex relative">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <Header
          updated={DATA.meta.updated}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="p-6 grid grid-cols-12 gap-6">
          {/* Konten utama */}
          <section className="col-span-12 md:col-span-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Progress Aktivasi IKD per Wilayah
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sorted.slice(0, 6).map((w) => (
                  <RegionCard key={w.id} item={w} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Rincian Wilayah</h3>
              <WilayahTable wilayah={sorted} />
            </div>
          </section>

          {/* Sidebar kanan */}
          <aside className="col-span-12 md:col-span-4 space-y-6">
            <StatsPanel meta={DATA.meta} />
            <ActivityChart wilayah={sorted} />
          </aside>
        </main>
      </div>
    </div>
  );
}
