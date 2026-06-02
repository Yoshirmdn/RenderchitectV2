import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => { e.preventDefault(); navigate("/"); };

  const inputStyle = {
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(200,169,110,0.06)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(6,182,212,0.04)" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <span className="font-display text-sm" style={{ color: "#0a0a0a" }}>AV</span>
            </div>
            <span className="font-display text-2xl tracking-wider" style={{ color: "var(--text-primary)" }}>RENDERCHITECH</span>
          </Link>
          <h2 className="font-heading text-xl font-bold mt-4 mb-1" style={{ color: "var(--text-primary)" }}>
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {isLogin ? "Sign in to access your designs" : "Join 18,000+ architecture professionals"}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-8" style={{ border: "1px solid var(--border-strong)" }}>
          <div className="flex glass rounded-xl p-1 mb-8" style={{ border: "1px solid var(--border)" }}>
            {["Sign In", "Register"].map((tab, i) => (
              <button key={tab} onClick={() => setIsLogin(i === 0)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={isLogin === (i === 0) ? { background: "var(--accent)", color: "#0a0a0a" } : { color: "var(--text-secondary)" }}>
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: "var(--text-muted)" }} />
                <input type="text" placeholder="Full name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required={!isLogin}
                  className="pl-10 pr-4 py-3 rounded-xl text-sm transition-colors" style={inputStyle} />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: "var(--text-muted)" }} />
              <input type="email" placeholder="Email address" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required
                className="pl-10 pr-4 py-3 rounded-xl text-sm transition-colors" style={inputStyle} />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: "var(--text-muted)" }} />
              <input type={showPass ? "text" : "password"} placeholder="Password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required
                className="pl-10 pr-12 py-3 rounded-xl text-sm transition-colors" style={inputStyle} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--text-muted)" }}>
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm transition-colors" style={{ color: "var(--accent)" }}>Forgot password?</a>
              </div>
            )}
            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 mt-2"
              style={{ background: "var(--accent)", color: "#0a0a0a" }}>
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="relative flex justify-center text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="px-3" style={{ background: "var(--bg-card)" }}>or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map(p => (
              <button key={p} className="py-2.5 glass rounded-xl text-sm transition-all"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>{p}</button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="transition-colors" style={{ color: "var(--accent)" }}>
            {isLogin ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
