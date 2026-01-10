import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TrackerProvider, useTracker } from "./context/TrackerContext";
import Header from "./components/Header";
import CommandPanel from "./components/CommandPanel";
import StatsGrid from "./components/StatsGrid";
import FluxChart from "./components/FluxChart";
import TransactionLogs from "./components/TransactionLogs";
import MetricsPanel from "./components/MetricsPanel";
import BudgetModal from "./components/BudgetModal";
import WageModal from "./components/WageModal";
import TransactionModal from "./components/TransactionModal";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DocsPage from "./components/DocsPage";

function TrackerApp({ onOpenDocs }) {
  const { logout, user } = useAuth();
  const { syncing, clearData } = useTracker();
  const [modals, setModals] = useState({
    budget: false,
    wage: false,
    income: false,
    expense: false,
  });

  const openModal = (type) => {
    setModals((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModals((prev) => ({ ...prev, [type]: false }));
  };

  const handleLogout = () => {
    clearData();
    logout();
  };

  return (
    <>
      <header>
        <div className="brand">EXPENSE_TERMINAL</div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {syncing && (
            <span
              style={{
                fontSize: "0.7rem",
                background: "var(--c-accent)",
                padding: "3px 8px",
                border: "2px solid black",
              }}
            >
              SYNCING...
            </span>
          )}
          <button onClick={onOpenDocs} className="nav-btn">
            DOCS
          </button>
          <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            {user?.email?.toUpperCase() || "USER"}
          </span>
          <button onClick={handleLogout} className="nav-btn nav-btn-logout">
            LOGOUT
          </button>
        </div>
      </header>

      <div className="container">
        <CommandPanel
          onOpenBudget={() => openModal("budget")}
          onOpenWage={() => openModal("wage")}
          onOpenIncome={() => openModal("income")}
          onOpenExpense={() => openModal("expense")}
        />

        <section>
          <StatsGrid />
          <FluxChart />
          <TransactionLogs />
          <MetricsPanel />
        </section>
      </div>

      {/* Modals */}
      <BudgetModal
        isOpen={modals.budget}
        onClose={() => closeModal("budget")}
      />
      <WageModal isOpen={modals.wage} onClose={() => closeModal("wage")} />
      <TransactionModal
        isOpen={modals.income}
        onClose={() => closeModal("income")}
        type="income"
      />
      <TransactionModal
        isOpen={modals.expense}
        onClose={() => closeModal("expense")}
        type="expense"
      />
    </>
  );
}

function AuthenticatedApp() {
  const { isAuthenticated, loading } = useAuth();
  const [authMode, setAuthMode] = useState("login");
  const [currentPage, setCurrentPage] = useState("app");

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="brand">EXPENSE_TERMINAL</div>
          <div style={{ marginTop: "30px", fontWeight: "bold" }}>
            LOADING SYSTEM...
          </div>
        </div>
      </div>
    );
  }

  // Show docs page (accessible without auth too)
  if (currentPage === "docs") {
    return <DocsPage onBack={() => setCurrentPage("app")} />;
  }

  if (!isAuthenticated) {
    if (authMode === "login") {
      return (
        <LoginPage
          onSwitchToRegister={() => setAuthMode("register")}
          onOpenDocs={() => setCurrentPage("docs")}
        />
      );
    }
    return (
      <RegisterPage
        onSwitchToLogin={() => setAuthMode("login")}
        onOpenDocs={() => setCurrentPage("docs")}
      />
    );
  }

  return (
    <TrackerProvider>
      <TrackerApp onOpenDocs={() => setCurrentPage("docs")} />
    </TrackerProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
