import { useState } from "react";

const steps = [
  {
    title: "SYSTEM_SCAN: DETECTED_LEAKAGE",
    copy: "Your wealth is in a state of entropy. You track dollars, but you lose life. The Real Tracker isn't just an expense logger—it's a terminal for your survival.",
    cta: "SCAN_ANOMALIES",
  },
  {
    title: "THE_CURRENCY_OF_TIME",
    copy: "Stop thinking in fiat. Start thinking in minutes. Use our [HOURS_IMPACT] metric to see exactly how many hours of your life that 'small purchase' actually cost you.",
    cta: "CALCULATE_DRAIN",
  },
  {
    title: "FLUX_OR_FAILURE",
    copy: "Our [EST_RUNWAY] engine predicts the exact day your balance hits ZERO based on your current burn rate. No fluff. Just the raw timer of your financial freedom.",
    cta: "ENTER_THE_TERMINAL",
  },
];

export default function IntroPage({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-card">
        <div className="intro-progress">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`intro-dot ${i === currentStep ? "active" : ""} ${
                i < currentStep ? "completed" : ""
              }`}
            ></div>
          ))}
        </div>

        <h1 className="intro-title">{steps[currentStep].title}</h1>
        <p className="intro-copy">{steps[currentStep].copy}</p>

        <button className="btn btn-intro" onClick={nextStep}>
          {steps[currentStep].cta} →
        </button>

        <div className="intro-footer">
          V4.4 // PROTOCOL_BYPASS // REAL_TIME_TRACKING
        </div>
      </div>
    </div>
  );
}
