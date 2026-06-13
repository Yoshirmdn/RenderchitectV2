import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isLogin,  setIsLogin]  = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [form,     setForm]     = useState({ name: "", email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [loading,  setLoading]  = useState(false);

  const navigate        = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(form.email, form.password);
        if (user.role === "ADMIN")       navigate("/admin");
        else if (user.role === "SELLER") navigate("/user");
        else                             navigate("/user");
      } else {
        await register({
          name:     form.name,
          email:    form.email,
          password: form.password,
        });
        alert("Registrasi berhasil! Cek email untuk verifikasi.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setApiError(err.message || "Login gagal. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--bg-card)",
    color:      "var(--text-primary)",
    border:     "1px solid var(--border)",
    outline:    "none",
    width:      "100%",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(200,169,110,0.06)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "rgba(6,182,212,0.04)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--accent)" }}>
              <span className="font-display text-sm" style={{ color: "#0a0a0a" }}>AV</span>
            </div>
            <span className="font-display text-2xl tracking-wider"
              style={{ color: "var(--text-primary)" }}>
              ARCHVAULT
            </span>
          </Link>
          <h2 className="font-heading text-xl font-bold mt-4 mb-1"
            style={{ color: "var(--text-primary)" }}>
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {isLogin
              ? "Sign in to access your designs"
              : "Join 18,000+ architecture professionals"}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-8"
          style={{ border: "1px solid var(--border-strong)" }}>

          {/* Tab toggle */}
          <div className="flex glass rounded-xl p-1 mb-8"
            style={{ border: "1px solid var(--border)" }}>
            {["Sign In", "Register"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setIsLogin(i === 0); setApiError(""); }}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={
                  isLogin === (i === 0)
                    ? { background: "var(--accent)", color: "#0a0a0a" }
                    : { color: "var(--text-secondary)" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — register only */}
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  size={15} style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required={!isLogin}
                  className="pl-10 pr-4 py-3 rounded-xl text-sm transition-colors"
                  style={inputStyle}
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2"
                size={15} style={{ color: "var(--text-muted)" }} />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="pl-10 pr-4 py-3 rounded-xl text-sm transition-colors"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2"
                size={15} style={{ color: "var(--text-muted)" }} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="pl-10 pr-12 py-3 rounded-xl text-sm transition-colors"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Forgot password */}
            {isLogin && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* API Error */}
            {apiError && (
              <div
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(248,113,113,0.1)",
                  border:     "1px solid rgba(248,113,113,0.2)",
                  color:      "#f87171",
                }}
              >
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)", color: "#0a0a0a" }}
            >
              {loading
                ? "Loading..."
                : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="relative flex justify-center text-xs"
              style={{ color: "var(--text-muted)" }}>
              <span className="px-3" style={{ background: "var(--bg-card)" }}>
                or continue with
              </span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map(p => (
              <button
                key={p}
                className="py-2.5 glass rounded-xl text-sm transition-all"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Switch mode */}
        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setApiError(""); }}
            className="transition-colors font-medium"
            style={{ color: "var(--accent)" }}
          >
            {isLogin ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}