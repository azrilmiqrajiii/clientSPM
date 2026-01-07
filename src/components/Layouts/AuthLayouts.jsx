const AuthLayouts = ({ children }) => {
  return (
    <div
      className="
        relative flex min-h-screen items-center justify-center overflow-hidden
        bg-linear-to-br from-cyan-500 via-cyan-400 to-white
      "
    >
      {/* Decorative blur */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />

      {/* Glass Card */}
      <div
        className="
          relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl
          bg-white/80 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          border border-white/40
        "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h1
            className="
              text-3xl font-extrabold
              bg-linear-to-r from-cyan-600 to-cyan-400
              bg-clip-text text-transparent
            "
          >
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Silakan login untuk melanjutkan ke dashboard
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">{children}</div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} • Halaman Login Percobaan
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
