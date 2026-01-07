import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  BarChart2,
  ClipboardList,
  LogOut,
  Menu,
} from "lucide-react";
import Button from "../components/Elements/Button";
import {
  getBeranda,
  getPetunjuk,
  getLayananUnit,
  getPenilaianMahasiswa,
} from "../services/dashboardService";

const DashboardDosen = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = {
    name: localStorage.getItem("name"),
    role: localStorage.getItem("role"),
  };

  const menu = [
    { title: "Beranda", icon: <Home size={18} /> },
    { title: "Petunjuk Pengisian", icon: <BookOpen size={18} /> },
    {
      title: "Penilaian Kinerja Layanan Unit",
      icon: <BarChart2 size={18} />,
    },
    { title: "Penilaian Mahasiswa", icon: <ClipboardList size={18} /> },
  ];

  const apiMap = {
    Beranda: getBeranda,
    "Petunjuk Pengisian": getPetunjuk,
    "Penilaian Kinerja Layanan Unit": getLayananUnit,
    "Penilaian Mahasiswa": getPenilaianMahasiswa,
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiMap[activeMenu]();
        setData(res.data);
      } catch {
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeMenu]);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data) return null;

    if (activeMenu === "Beranda") {
      return (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-6 shadow">
            <p className="text-sm">Status Mengajar</p>
            <h3 className="text-2xl font-bold mt-2">{data.statusMengajar}</h3>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Jumlah Mata Kuliah</p>
            <h3 className="text-2xl font-semibold mt-2 text-gray-800">
              {data.jumlahMatkul}
            </h3>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Mahasiswa</p>
            <h3 className="text-2xl font-semibold mt-2 text-gray-800">
              {data.totalMahasiswa}
            </h3>
          </div>
        </div>
      );
    }

    // ===== PETUNJUK (OBJECT) =====
    if (activeMenu === "Petunjuk Pengisian") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">{data.judul}</h2>
          <p className="text-gray-700 leading-relaxed">{data.isi}</p>
        </div>
      );
    }

    // ===== LAYANAN UNIT (ARRAY) =====
    if (activeMenu === "Penilaian Kinerja Layanan Unit") {
      if (!Array.isArray(data)) return null;

      return (
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Penilaian Kinerja Layanan Unit
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.unit}
                </h3>

                <span className="inline-block bg-cyan-600 text-white px-3 py-1 rounded-full text-sm mb-3">
                  Nilai {item.nilai} / 5
                </span>

                <p className="text-gray-600 text-sm">{item.komentar}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ===== PENILAIAN MAHASISWA (ARRAY) =====
    if (activeMenu === "Penilaian Mahasiswa") {
      if (!Array.isArray(data)) return null;

      return (
        <div>
          <h2 className="text-xl font-semibold mb-6">Penilaian Mahasiswa</h2>

          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-5 bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {item.namaMahasiswa} ({item.nim})
                  </h3>
                  <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">
                    {item.nilai}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  Mata Kuliah: {item.mataKuliah}
                </p>

                {item.catatan && (
                  <p className="text-gray-600 text-sm mt-1">
                    Catatan: {item.catatan}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              <Menu />
            </button>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>

          <div className="ml-auto">
            <Button
              title={
                <span className="flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </span>
              }
              classname="text-cyan-700"
              onClick={handleLogout}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <aside
          className={`w-64 bg-white rounded-2xl shadow p-4 ${
            open ? "block" : "hidden md:block"
          }`}
        >
          <p className="font-semibold mb-4 text-gray-700">Menu</p>
          <nav className="space-y-1">
            {menu.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setActiveMenu(item.title);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl transition ${
                  activeMenu === item.title
                    ? "bg-cyan-600 text-white"
                    : "text-gray-700 hover:bg-cyan-100"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <section className="bg-white rounded-2xl shadow p-6 min-h-75">
            {renderContent()}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardDosen;
