import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const TrackerContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const STORAGE_KEY = "neoTrackerV44";

export function TrackerProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [state, setState] = useState({
    budget: 0,
    wage: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Load data from backend when authenticated
  const loadFromBackend = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tracker`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setState({
          budget: data.budget || 0,
          wage: data.wage || 0,
          transactions: data.transactions || [],
        });
      }
    } catch (error) {
      console.error("Failed to load tracker data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Save data to backend
  const saveToBackend = useCallback(
    async (newState) => {
      if (!token) return;

      setSyncing(true);
      try {
        await fetch(`${API_URL}/tracker`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newState),
        });
      } catch (error) {
        console.error("Failed to save tracker data:", error);
      } finally {
        setSyncing(false);
      }
    },
    [token]
  );

  // Load from localStorage (fallback) or backend
  useEffect(() => {
    if (isAuthenticated && token) {
      loadFromBackend();
    } else {
      // Load from localStorage when not authenticated
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setState(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved state:", e);
        }
      }
    }
  }, [isAuthenticated, token, loadFromBackend]);

  // Save to localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isAuthenticated]);

  const setBudget = (budget) => {
    const newBudget = parseFloat(budget) || 0;
    setState((prev) => {
      const newState = { ...prev, budget: newBudget };
      if (isAuthenticated) saveToBackend(newState);
      return newState;
    });
  };

  const setWage = (wage) => {
    const newWage = parseFloat(wage) || 0;
    setState((prev) => {
      const newState = { ...prev, wage: newWage };
      if (isAuthenticated) saveToBackend(newState);
      return newState;
    });
  };

  const addTransaction = (transaction) => {
    setState((prev) => {
      const newTransaction = {
        ...transaction,
        id: Date.now(),
        _id: Date.now().toString(), // For backend compatibility
      };
      const newState = {
        ...prev,
        transactions: [...prev.transactions, newTransaction],
      };
      if (isAuthenticated) saveToBackend(newState);
      return newState;
    });
  };

  const deleteTransaction = (id) => {
    setState((prev) => {
      const newState = {
        ...prev,
        transactions: prev.transactions.filter(
          (t) =>
            t.id !== id && t._id !== id && t._id?.toString() !== id?.toString()
        ),
      };
      if (isAuthenticated) saveToBackend(newState);
      return newState;
    });
  };

  // Computed values
  const totalIncome = state.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Calculate runway days
  const runwayDays = (() => {
    if (state.budget > 0 && balance > 0) {
      const dailyBurn = state.budget / 30;
      return Math.floor(balance / dailyBurn);
    }
    return balance <= 0 ? 0 : Infinity;
  })();

  // Calculate life hours impact
  const lifeHoursImpact = (() => {
    if (state.wage > 0) {
      const net = totalExpense - totalIncome;
      return net / state.wage;
    }
    return 0;
  })();

  // Graph data
  const getGraphData = () => {
    let incHistory = [0];
    let expHistory = [0];
    let runInc = 0;
    let runExp = 0;

    state.transactions.forEach((t) => {
      if (t.type === "income") {
        runInc += t.amount;
      } else {
        runExp += t.amount;
      }
      incHistory.push(runInc);
      expHistory.push(runExp);
    });

    return { incHistory, expHistory };
  };

  // Clear local data (for logout)
  const clearData = () => {
    setState({ budget: 0, wage: 0, transactions: [] });
  };

  const value = {
    ...state,
    loading,
    syncing,
    setBudget,
    setWage,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    runwayDays,
    lifeHoursImpact,
    getGraphData,
    clearData,
    refresh: loadFromBackend,
  };

  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
}
