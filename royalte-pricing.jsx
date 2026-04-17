import { useState, useRef } from "react";

const plans = [
  {
    id: "quick-check",
    name: "Quick Check",
    tagline: "// free scan",
    priceType: "free",
    price: 0,
    features: [
      "Instant catalog scan",
      "Cross-platform check (Spotify / Apple)",
      "Basic metadata + ISRC check",
      "Catalog Health Score",
      "Limited results",
    ],
    button: "Run Free Scan",
    buttonStyle: "outline",
    highlighted: false,
    hasToggle: false,
  },
  {
    id: "deep-audit",
    name: "Deep Audit",
    tagline: "// see where you're losing money",
    priceType: "one-time",
    price: 99,
    priceSuffix: "one-time fee",
    features: [
      "Full royalty audit",
      "ISRC + metadata deep analysis",
      "Cross-platform matching (advanced)",
      "Revenue risk detection",
      "Publishing / registration gaps",
      "Personalized action plan",
    ],
    button: "Buy Now",
    buttonStyle: "primary",
    highlighted: false,
    hasToggle: false,
  },
  {
    id: "artist-monitor",
    name: "Artist Monitor",
    tagline: "// ongoing income tracking",
    priceType: "subscription",
    monthly: 19.99,
    yearly: 199,
    yearlySavings: "$40",
    yearlySubtext: "2 months free",
    features: [
      "Continuous catalog monitoring",
      "New issues + revenue alerts",
      "Monthly catalog re-scan",
      "Catalog Health Score tracking",
      "Priority audit processing",
      "Upload PRO / distributor statements",
      "Includes 1 artist",
    ],
    button: "Buy Now",
    buttonStyle: "accent",
    highlighted: true,
    hasToggle: true,
    recommended: true,
  },
  {
    id: "pro-hub",
    name: "Pro Hub",
    tagline: "// labels & managers",
    priceType: "subscription",
    monthly: 59,
    yearly: 590,
    yearlySavings: "$118",
    yearlySubtext: "2 months free",
    features: [
      "Multi-artist dashboard",
      "Portfolio-wide monitoring",
      "Priority alerts + reporting",
      "Bulk audit tools",
      "Early feature access",
      "Includes 5 artists",
      "+$10/month per additional artist",
    ],
    yearlyExtraFeature: "+$100/year per additional artist",
    button: "Buy Now",
    buttonStyle: "primary",
    highlighted: false,
    hasToggle: true,
  },
];

const comparisonFeatures = [
  { name: "Cross-platform scan", quick: true, deep: true, monitor: true, pro: true },
  { name: "Catalog Health Score", quick: true, deep: true, monitor: true, pro: true },
  { name: "ISRC + metadata analysis", quick: true, deep: true, monitor: true, pro: true },
  { name: "Revenue risk detection", quick: false, deep: true, monitor: true, pro: true },
  { name: "Publishing gap detection", quick: false, deep: true, monitor: true, pro: true },
  { name: "Full audit report", quick: false, deep: false, monitor: true, pro: true },
  { name: "Monthly catalog scans", quick: false, deep: false, monitor: true, pro: true },
  { name: "Ongoing issue alerts", quick: false, deep: false, monitor: true, pro: true },
  { name: "Upload PRO statements", quick: false, deep: false, monitor: true, pro: true },
  { name: "Multi-artist tracking", quick: false, deep: false, monitor: false, pro: true },
  { name: "Included artists", quick: "—", deep: "—", monitor: "1", pro: "5" },
  { name: "Additional artist pricing", quick: "—", deep: "—", monitor: "—", pro: "$10/mo" },
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.5 9.5L7.5 12.5L13.5 5.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Dash = () => (
  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 16 }}>—</span>
);

function BillingToggle({ planId, cycle, onToggle }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      margin: "12px 0 0",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 4,
      padding: 2,
      width: "fit-content",
      marginLeft: "auto",
      marginRight: "auto",
    }}>
      {["monthly", "yearly"].map(c => (
        <button
          key={c}
          onClick={() => onToggle(planId, c)}
          style={{
            padding: "5px 14px",
            borderRadius: 3,
            border: "none",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            background: cycle === c ? "rgba(34,197,94,0.15)" : "transparent",
            color: cycle === c ? "#22c55e" : "rgba(255,255,255,0.3)",
          }}
        >{c}</button>
      ))}
    </div>
  );
}

function PricingCard({ plan, billingCycle, onToggle }) {
  const isYearly = billingCycle === "yearly";

  const renderPrice = () => {
    if (plan.priceType === "free") {
      return (
        <div style={{ margin: "20px 0 4px" }}>
          <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-3px", color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>$0</span>
        </div>
      );
    }
    if (plan.priceType === "one-time") {
      return (
        <div style={{ margin: "20px 0 4px" }}>
          <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-3px", color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>${plan.price}</span>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>{plan.priceSuffix}</div>
        </div>
      );
    }
    const price = isYearly ? plan.yearly : plan.monthly;
    const suffix = isYearly ? "/yr" : "/mo";
    const display = Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
    return (
      <div style={{ margin: "20px 0 4px" }}>
        <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-3px", color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>{display}</span>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>{suffix}</span>
        {isYearly && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{
              display: "inline-block",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#22c55e",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 3,
              letterSpacing: "0.5px",
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
            }}>SAVE {plan.yearlySavings}</span>
            <span style={{ fontSize: 11, color: "rgba(34,197,94,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>{plan.yearlySubtext}</span>
          </div>
        )}
      </div>
    );
  };

  const features = [...plan.features];
  if (isYearly && plan.yearlyExtraFeature) {
    const idx = features.findIndex(f => f.startsWith("+$10"));
    if (idx >= 0) features[idx] = plan.yearlyExtraFeature;
  }

  return (
    <div style={{
      position: "relative",
      background: plan.highlighted
        ? "rgba(34,197,94,0.04)"
        : "rgba(255,255,255,0.02)",
      border: plan.highlighted
        ? "1px solid rgba(34,197,94,0.25)"
        : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 8,
      padding: "32px 24px 24px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 220,
      maxWidth: 290,
      transition: "border-color 0.3s ease, background 0.3s ease",
    }}
    onMouseEnter={e => {
      if (!plan.highlighted) {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }
    }}
    onMouseLeave={e => {
      if (!plan.highlighted) {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
      }
    }}
    >
      {plan.recommended && (
        <div style={{
          position: "absolute",
          top: -11,
          left: 24,
          background: "#22c55e",
          color: "#000",
          fontSize: 9,
          fontWeight: 700,
          padding: "4px 12px",
          borderRadius: 3,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
        }}>RECOMMENDED</div>
      )}

      <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", fontFamily: "'JetBrains Mono', monospace" }}>{plan.name}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{plan.tagline}</div>

      {plan.hasToggle ? (
        <BillingToggle planId={plan.id} cycle={billingCycle} onToggle={onToggle} />
      ) : (
        <div style={{ height: 36 }} />
      )}

      {renderPrice()}

      <div style={{ flex: 1, margin: "20px 0 28px" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}>
            <span style={{ color: plan.highlighted ? "#22c55e" : "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 1, flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>✓</span>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace" }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => console.log(`[Royaltē] Plan selected: ${plan.id}, billing: ${billingCycle}`)}
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.2s ease",
          ...(plan.buttonStyle === "outline" ? {
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
          } : plan.buttonStyle === "accent" ? {
            background: "#22c55e",
            border: "1px solid #22c55e",
            color: "#000",
          } : {
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          }),
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
      >
        {plan.button}
      </button>
    </div>
  );
}

export default function RoyaltePricing() {
  const [billingCycles, setBillingCycles] = useState({
    "artist-monitor": "monthly",
    "pro-hub": "monthly",
  });
  const [showComparison, setShowComparison] = useState(false);
  const tableRef = useRef(null);

  const handleToggle = (planId, cycle) => {
    setBillingCycles(prev => ({ ...prev, [planId]: cycle }));
  };

  const handleCompare = () => {
    setShowComparison(prev => !prev);
    if (!showComparison) {
      setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const compHeaders = [
    { label: "Quick Check", price: "$0", sub: "" },
    { label: "Deep Audit", price: "$99", sub: "one-time" },
    { label: "Artist Monitor", price: billingCycles["artist-monitor"] === "yearly" ? "$199/yr" : "$19.99/mo", sub: billingCycles["artist-monitor"] === "yearly" ? "2 months free" : "" },
    { label: "Pro Hub", price: billingCycles["pro-hub"] === "yearly" ? "$590/yr" : "$59/mo", sub: billingCycles["pro-hub"] === "yearly" ? "2 months free" : "" },
  ];

  const updatedComparison = comparisonFeatures.map(f => {
    if (f.name === "Additional artist pricing" && billingCycles["pro-hub"] === "yearly") {
      return { ...f, pro: "$100/yr" };
    }
    return f;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      padding: "100px 24px 80px",
      fontFamily: "'JetBrains Mono', monospace",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .rt-fade { animation: fadeIn 0.5s ease forwards; opacity: 0; }
      `}</style>

      {/* Section label */}
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>
          // pricing
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4.5vw, 42px)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-2px",
          lineHeight: 1.15,
          marginBottom: 14,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          Simple pricing,<br />powerful results.
        </h2>
        <p style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.7,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          Find and recover missing royalties. Protect your catalog <span style={{ color: "#22c55e", fontStyle: "italic" }}>automatically</span>.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: "flex",
        gap: 16,
        maxWidth: 1200,
        margin: "0 auto",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "stretch",
      }}>
        {plans.map((plan, i) => (
          <div key={plan.id} className="rt-fade" style={{ animationDelay: `${i * 0.08}s`, display: "flex" }}>
            <PricingCard
              plan={plan}
              billingCycle={billingCycles[plan.id] || "monthly"}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>

      {/* Compare Plans */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button
          onClick={handleCompare}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            padding: "10px 28px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.color = "#22c55e"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          Compare Plans
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
            transition: "transform 0.2s ease",
            transform: showComparison ? "rotate(180deg)" : "rotate(0deg)",
          }}>
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Comparison Table */}
      {showComparison && (
        <div ref={tableRef} className="rt-fade" style={{
          maxWidth: 1000,
          margin: "36px auto 0",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          overflow: "hidden",
          background: "rgba(255,255,255,0.01)",
        }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.6fr repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            position: "sticky",
            top: 0,
            background: "#0d0d0d",
            zIndex: 10,
          }}>
            <div style={{ padding: "20px 20px", display: "flex", alignItems: "flex-end" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "1px" }}>// features</span>
            </div>
            {compHeaders.map((h, i) => (
              <div key={i} style={{
                padding: "20px 12px",
                textAlign: "center",
                borderLeft: "1px solid rgba(255,255,255,0.04)",
                background: i === 2 ? "rgba(34,197,94,0.03)" : "transparent",
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{h.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-1px" }}>{h.price}</div>
                {h.sub && <div style={{ fontSize: 10, color: "#22c55e", marginTop: 3 }}>{h.sub}</div>}
              </div>
            ))}
          </div>

          {/* Rows */}
          {updatedComparison.map((row, idx) => {
            const cols = [row.quick, row.deep, row.monitor, row.pro];
            return (
              <div key={idx} style={{
                display: "grid",
                gridTemplateColumns: "1.6fr repeat(4, 1fr)",
                borderBottom: idx < updatedComparison.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                background: idx % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
              }}>
                <div style={{
                  padding: "12px 20px",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.name}
                </div>
                {cols.map((val, ci) => (
                  <div key={ci} style={{
                    padding: "12px 12px",
                    textAlign: "center",
                    borderLeft: "1px solid rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: ci === 2 ? "rgba(34,197,94,0.02)" : "transparent",
                  }}>
                    {val === true ? <Check /> : val === false ? <Dash /> : (
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
