import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  ClipboardList,
  Briefcase,
  BarChart2,
  LogOut,
  Menu,
} from "lucide-react";
import Button from "../components/Elements/Button";
import {
  getBeranda,
  getPetunjuk,
  getEdom,
  getLayananUnit,
  getMagang,
  getTracer,
} from "../services/dashboardService";

const DashboardMahasiswa = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = {
    name: "Azril Miqraji",
    role: "Mahasiswa",
  };

  const menu = [
    { title: "Beranda", icon: <Home size={18} /> },
    { title: "Petunjuk Pengisian", icon: <BookOpen size={18} /> },
    { title: "Penilaian Dosen (EDOM)", icon: <ClipboardList size={18} /> },
    { title: "Penilaian Kinerja Layanan Unit", icon: <BarChart2 size={18} /> },
    { title: "Penilaian Tempat Magang", icon: <Briefcase size={18} /> },
    { title: "Tracer Studi", icon: <ClipboardList size={18} /> },
  ];

  const apiMap = {
    Beranda: getBeranda,
    "Petunjuk Pengisian": getPetunjuk,
    "Penilaian Dosen (EDOM)": getEdom,
    "Penilaian Kinerja Layanan Unit": getLayananUnit,
    "Penilaian Tempat Magang": getMagang,
    "Tracer Studi": getTracer,
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
            <p className="text-sm">Status Akademik</p>
            <h3 className="text-2xl font-bold mt-2">{data.statusAkademik}</h3>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">EDOM</p>
            <h3 className="text-2xl font-semibold mt-2 text-gray-800">
              {data.edomStatus}
            </h3>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Tracer Studi</p>
            <h3 className="text-2xl font-semibold mt-2 text-gray-800">
              {data.tracerStatus}
            </h3>
          </div>
        </div>
      );
    }

    if (activeMenu === "Petunjuk Pengisian") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">{data.judul}</h2>
          <p className="text-gray-700 leading-relaxed">{data.isi}</p>
        </div>
      );
    }

    if (activeMenu === "Penilaian Dosen (EDOM)") {
      if (!Array.isArray(data)) return null;

      return (
        <div>
          <h2 className="text-xl font-semibold mb-6">Penilaian Dosen (EDOM)</h2>

          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-5 bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{item.dosen}</h3>
                  <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">
                    Nilai {item.nilai} / 5
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{item.komentar}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

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

    if (activeMenu === "Penilaian Tempat Magang") {
      if (!Array.isArray(data)) return null;

      return (
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Penilaian Tempat Magang
          </h2>

          <div className="space-y-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {item.tempat}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.penilaian}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeMenu === "Tracer Studi") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-6">Tracer Studi</h2>

          <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-xl">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Status</span>
                <span className="font-medium text-gray-800">
                  {data.statusKerja}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Perusahaan</span>
                <span className="font-medium text-gray-800">
                  {data.perusahaan}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Tahun Lulus</span>
                <span className="font-medium text-gray-800">
                  {data.tahunLulus}
                </span>
              </div>
            </div>
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

export default DashboardMahasiswa;
