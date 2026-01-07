import API from "./api";

export const getBeranda = () => API.get("/dashboard/beranda");
export const getPetunjuk = () => API.get("/petunjuk");
export const getEdom = () => API.get("/edom");
export const getLayananUnit = () => API.get("/layanan-unit");
export const getMagang = () => API.get("/magang");
export const getTracer = () => API.get("/tracer");
export const getPenilaianMahasiswa = () => API.get("/penilaian-mahasiswa");
