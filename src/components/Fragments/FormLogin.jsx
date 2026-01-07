import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { loginUser } from "../../services/authService";

const FormLogin = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "mahasiswa") {
        window.location.href = "/dashboardMahasiswa";
      } else {
        window.location.href = "/dashboardDosen";
      }
    } catch (err) {
      alert("Login gagal", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        title="Email"
        htmlFor="email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
      />
      <InputForm
        title="Password"
        htmlFor="password"
        type="password"
        name="password"
        placeholder="*********"
      />
      <Button
        classname="w-full rounded-xl
        bg-cyan-600 hover:bg-cyan-700
        px-4 py-2.5
        text-sm font-semibold text-white
        transition
        focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        title="Login"
        type="submit"
      />
    </form>
  );
};

export default FormLogin;
