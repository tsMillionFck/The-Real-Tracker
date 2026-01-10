import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage({ onSwitchToLogin, onOpenDocs }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">EXPENSE_TERMINAL</div>
          <div style={{ marginTop: "10px", opacity: 0.7 }}>
            v4.4 // LIMIT_FLUX
          </div>
        </div>

        <div className="auth-title">CREATE_ACCOUNT</div>

        {error && <div className="auth-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">NAME (OPTIONAL)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR ALIAS"
            />
          </div>

          <div className="input-group">
            <label className="label">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@domain.com"
              required
            />
          </div>

          <div className="input-group">
            <label className="label">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="MIN 6 CHARACTERS"
              required
            />
          </div>

          <div className="input-group">
            <label className="label">CONFIRM PASSWORD</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="REPEAT PASSWORD"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-auth btn-register"
            disabled={loading}
          >
            {loading ? "CREATING..." : "REGISTER [ CREATE ]"}
          </button>
        </form>

        <div className="auth-footer">
          <span>HAVE ACCOUNT?</span>
          <button className="auth-link" onClick={onSwitchToLogin}>
            LOGIN_EXISTING
          </button>
        </div>

        {onOpenDocs && (
          <div className="auth-docs-link">
            <button className="auth-link" onClick={onOpenDocs}>
              VIEW DOCS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
