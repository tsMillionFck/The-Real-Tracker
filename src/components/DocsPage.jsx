export default function DocsPage({ onBack }) {
  return (
    <div className="docs-container">
      <header className="docs-header">
        <div className="brand">EXPENSE_TERMINAL</div>
        <button className="btn docs-back-btn" onClick={onBack}>
          ← BACK TO APP
        </button>
      </header>

      <div className="docs-content">
        <div className="docs-hero">
          <h1>SYSTEM_DOCUMENTATION</h1>
          <p>v4.4 // LIMIT_FLUX // USER MANUAL</p>
        </div>

        <section className="docs-section">
          <h2>[ OVERVIEW ]</h2>
          <p>
            NEO-BRUTAL TRACKER is a personal finance terminal designed to help
            you track income, expenses, and visualize your financial runway.
            Built with a neo-brutalist aesthetic for maximum clarity and impact.
          </p>
        </section>

        <section className="docs-section">
          <h2>[ GETTING STARTED ]</h2>
          <div className="docs-card">
            <h3>1. SET YOUR BUDGET CAP</h3>
            <p>
              Click <strong>EDIT BUDGET</strong> to set your monthly spending
              limit. This value is used to calculate your financial runway and
              appears as a dashed line on the flux graph.
            </p>
          </div>
          <div className="docs-card">
            <h3>2. SET YOUR HOURLY WAGE</h3>
            <p>
              Click <strong>SET_RATE</strong> to input your hourly wage. This
              enables the "Hours Impact" calculation, showing how many hours of
              work your net expenses represent.
            </p>
          </div>
          <div className="docs-card">
            <h3>3. LOG TRANSACTIONS</h3>
            <p>
              Use <strong>+ INJECT INCOME</strong> for money coming in and
              <strong> - EJECT EXPENSE</strong> for money going out. All
              transactions are saved to your account and synced to the cloud.
            </p>
          </div>
        </section>

        <section className="docs-section">
          <h2>[ DASHBOARD METRICS ]</h2>

          <div className="docs-grid">
            <div className="docs-metric">
              <div className="docs-metric-title">TOTAL IN</div>
              <p>Sum of all income transactions</p>
            </div>
            <div className="docs-metric">
              <div className="docs-metric-title">TOTAL OUT</div>
              <p>Sum of all expense transactions</p>
            </div>
            <div className="docs-metric">
              <div className="docs-metric-title">NET</div>
              <p>Balance = Income - Expenses</p>
            </div>
          </div>

          <div className="docs-card">
            <h3>EST. RUNWAY</h3>
            <p>
              Estimated days your current balance will last based on your
              monthly budget divided by 30 days. Shows <strong>∞</strong> if no
              budget is set.
            </p>
            <ul>
              <li>
                <span className="tag tag-inc">GREEN</span> — More than 30 days
              </li>
              <li>
                <span className="tag" style={{ background: "#FFDE59" }}>
                  YELLOW
                </span>{" "}
                — 7-30 days
              </li>
              <li>
                <span className="tag tag-exp">RED</span> — Less than 7 days
              </li>
            </ul>
          </div>

          <div className="docs-card">
            <h3>HOURS IMPACT</h3>
            <p>
              Shows the net "life cost" of your finances in work hours. Negative
              values (green background) mean you've earned more than spent.
              Positive values mean you've spent more than earned.
            </p>
          </div>
        </section>

        <section className="docs-section">
          <h2>[ LIMIT_FLUX GRAPH ]</h2>
          <p>Visualizes your financial activity over time:</p>
          <div className="docs-legend">
            <div className="docs-legend-item">
              <div
                className="dot"
                style={{ background: "var(--c-success)" }}
              ></div>
              <span>Income cumulative total</span>
            </div>
            <div className="docs-legend-item">
              <div
                className="dot"
                style={{ background: "var(--c-secondary)" }}
              ></div>
              <span>Expense cumulative total</span>
            </div>
            <div className="docs-legend-item">
              <div
                className="dot"
                style={{ background: "var(--c-primary)" }}
              ></div>
              <span>Budget cap line</span>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>[ DATA STORAGE ]</h2>
          <p>
            When logged in, all your data is securely stored in the cloud. Your
            password is hashed with bcrypt using a unique salt. JWT tokens are
            used for authentication with 7-day expiry.
          </p>
          <p>
            When not logged in, data is stored locally in your browser's
            localStorage.
          </p>
        </section>

        <section className="docs-section">
          <h2>[ KEYBOARD SHORTCUTS ]</h2>
          <div className="docs-card">
            <p>
              Press <code>Enter</code> in any modal input field to submit the
              form.
            </p>
          </div>
        </section>

        <footer className="docs-footer">
          <p>NEO-BRUTAL TRACKER v4.4 // LIMIT_FLUX</p>
          <p style={{ opacity: 0.6, marginTop: "10px" }}>
            Built with React + Express + MongoDB
          </p>
        </footer>
      </div>
    </div>
  );
}
