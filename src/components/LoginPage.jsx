import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onSwitchToRegister, onOpenDocs }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(""); // 'network', 'credentials', 'notfound', 'timeout'
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorType("");
    setLoading(true);

    // Set timeout for slow network (10 seconds)
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        setError(
          "Connection taking too long. Check your network and try again."
        );
        setErrorType("timeout");
        setLoading(false);
      }
    }, 10000);

    try {
      await login(email, password);
      // Clear timeout on success
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } catch (err) {
      // Clear timeout on error
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const errorMsg = err.message.toLowerCase();

      // Determine error type for specific feedback
      if (errorMsg.includes("user not found") || errorMsg.includes("no user")) {
        setError("User not found. Please check your email or register.");
        setErrorType("notfound");
      } else if (
        errorMsg.includes("invalid credentials") ||
        errorMsg.includes("wrong password")
      ) {
        setError("Invalid credentials. Please check your email and password.");
        setErrorType("credentials");
      } else if (
        errorMsg.includes("network") ||
        errorMsg.includes("failed to fetch")
      ) {
        setError("Network error. Please check your connection.");
        setErrorType("network");
      } else {
        setError(err.message || "Login failed. Please try again.");
        setErrorType("general");
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorIcon = () => {
    switch (errorType) {
      case "timeout":
        return "⏱";
      case "network":
        return "📡";
      case "notfound":
        return "👤";
      case "credentials":
        return "🔐";
      default:
        return "⚠";
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

        <div className="auth-title">ACCESS_SYSTEM</div>

        {error && (
          <div
            className={`auth-error ${
              errorType === "timeout" || errorType === "network"
                ? "auth-error-warning"
                : ""
            }`}
          >
            {getErrorIcon()} {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@domain.com"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="label">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-auth" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-dots">AUTHENTICATING</span>
              </>
            ) : (
              "LOGIN [ ENTER ]"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>NO ACCOUNT?</span>
          <button
            className="auth-link"
            onClick={onSwitchToRegister}
            disabled={loading}
          >
            REGISTER_NEW
          </button>
        </div>

        {onOpenDocs && (
          <div className="auth-docs-link">
            <button
              className="auth-link"
              onClick={onOpenDocs}
              disabled={loading}
            >
              VIEW DOCS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
