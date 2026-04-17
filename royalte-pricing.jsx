import { useState, useRef } from "react";

const plans = [
  {
    id: "quick-check",
    name: "Quick Check",
    tagline: "Get Started",
    priceType: "free",
    price: 0,
    priceSuffix: "",
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
    tagline: "See where you're losing money",
    priceType: "one-time",
    price: 99,
    priceSuffix: "One-time fee",
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
    tagline: "Ongoing income tracking",
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
    tagline: "Team tracking for labels & managers",
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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 10.5L8.5 14L15 6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Dash = () => (
  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 18, fontWeight: 700 }}>—</span>
);

function PricingCard({ plan, billingCycle, onToggle }) {
  const isYearly = billingCycle === "yearly";

  const renderPrice = () => {
    if (plan.priceType === "free") {
      return (
        <div style={{ margin: "20px 0 8px" }}>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-2px", color: "#fff" }}>$0</span>
        </div>
      );
    }
    if (plan.priceType === "one-time") {
      return (
        <div style={{ margin: "20px 0 8px" }}>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-2px", color: "#fff" }}>${plan.price}</span>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{plan.priceSuffix}</div>
        </div>
      );
    }
    if (plan.priceType === "subscription") {
      const price = isYearly ? plan.yearly : plan.monthly;
      const suffix = isYearly ? "/year" : "/mo";
      return (
        <div style={{ margin: "20px 0 8px" }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.5)", verticalAlign: "top", position: "relative", top: 8 }}>$</span>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-2px", color: "#fff" }}>
            {isYearly ? Math.floor(price) : (Number.isInteger(price) ? price : price.toFixed(2).replace(/\.?0+$/, ""))}
          </span>
          {isYearly && price % 1 !== 0 && <span style={{ fontSize: 24, fontWeight: 700, color: "#fff", verticalAlign: "top", position: "relative", top: 10 }}>.{String(price).split(".")[1]}</span>}
          {!isYearly && plan.monthly % 1 !== 0 && (
            <span style={{ fontSize: 24, fontWeight: 700, color: "#fff", verticalAlign: "top", position: "relative", top: 10 }}>
              .{plan.monthly.toFixed(2).split(".")[1]}
            </span>
          )}
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginLeft: 4, fontFamily: "'JetBrains Mono', monospace" }}>{suffix}</span>
          {isYearly && (
            <div style={{ marginTop: 6 }}>
              <span style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                marginRight: 6,
                letterSpacing: "0.5px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>SAVE {plan.yearlySavings}</span>
              <span style={{ fontSize: 12, color: "#22c55e", fontFamily: "'JetBrains Mono', monospace" }}>{plan.yearlySubtext}</span>
            </div>
          )}
        </div>
      );
    }
  };

  const renderToggle = () => {
    if (!plan.hasToggle) return <div style={{ height: 36 }} />;
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        margin: "8px 0 0",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 30,
        padding: 3,
        width: "fit-content",
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        <button
          onClick={() => onToggle(plan.id, "monthly")}
          style={{
            padding: "6px 16px",
            borderRadius: 20,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s ease",
            fontFamily: "'JetBrains Mono', monospace",
            background: !isYearly ? "rgba(255,255,255,0.15)" : "transparent",
            color: !isYearly ? "#fff" : "rgba(255,255,255,0.4)",
          }}
        >Monthly</button>
        <button
          onClick={() => onToggle(plan.id, "yearly")}
          style={{
            padding: "6px 16px",
            borderRadius: 20,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s ease",
            fontFamily: "'JetBrains Mono', monospace",
            background: isYearly ? "rgba(255,255,255,0.15)" : "transparent",
            color: isYearly ? "#fff" : "rgba(255,255,255,0.4)",
          }}
        >Yearly</button>
      </div>
    );
  };

  const features = [...plan.features];
  if (isYearly && plan.yearlyExtraFeature) {
    const idx = features.findIndex(f => f.startsWith("+$10"));
    if (idx >= 0) features[idx] = plan.yearlyExtraFeature;
  }

  const btnStyles = {
    outline: {
      background: "transparent",
      border: "2px solid rgba(255,255,255,0.3)",
      color: "#fff",
    },
    primary: {
      background: "linear-gradient(135deg, #6c3ce0, #4f46e5)",
      border: "2px solid transparent",
      color: "#fff",
    },
    accent: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      border: "2px solid transparent",
      color: "#fff",
    },
  };

  const bs = btnStyles[plan.buttonStyle];

  return (
    <div style={{
      position: "relative",
      background: plan.highlighted
        ? "linear-gradient(180deg, rgba(34,197,94,0.12) 0%, rgba(15,23,42,0.95) 40%)"
        : "rgba(15,23,42,0.85)",
      border: plan.highlighted ? "2px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "28px 24px 24px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 220,
      maxWidth: 300,
      backdropFilter: "blur(20px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      boxShadow: plan.highlighted
        ? "0 8px 40px rgba(34,197,94,0.15), 0 0 0 1px rgba(34,197,94,0.1)"
        : "0 4px 24px rgba(0,0,0,0.3)",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = plan.highlighted ? "0 12px 48px rgba(34,197,94,0.25)" : "0 12px 40px rgba(0,0,0,0.5)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.highlighted ? "0 8px 40px rgba(34,197,94,0.15)" : "0 4px 24px rgba(0,0,0,0.3)"; }}
    >
      {plan.recommended && (
        <div style={{
          position: "absolute",
          top: -13,
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          color: "#fff",
          fontSize: 10,
          fontWeight: 800,
          padding: "5px 18px",
          borderRadius: 20,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
          whiteSpace: "nowrap",
        }}>RECOMMENDED</div>
      )}

      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{plan.name}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.4 }}>{plan.tagline}</div>

      {renderToggle()}
      {renderPrice()}

      <div style={{ flex: 1, margin: "16px 0 24px" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={plan.highlighted ? "#22c55e" : "#6c3ce0"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.45, fontFamily: "'JetBrains Mono', monospace" }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => console.log(`[Royaltē] Plan selected: ${plan.id}`)}
        style={{
          width: "100%",
          padding: "14px 0",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 800,
          cursor: "pointer",
          letterSpacing: "0.5px",
          fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.25s ease",
          ...bs,
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.02)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
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
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const compTableHeaders = [
    { label: "Quick Check", price: "$0", sub: "", btn: "Get Started", style: "outline" },
    { label: "Deep Audit", price: "$99", sub: "one-time", btn: "Buy Now", style: "primary" },
    { label: "Artist Monitor", price: billingCycles["artist-monitor"] === "yearly" ? "$199/yr" : "$19.99/mo", sub: billingCycles["artist-monitor"] === "yearly" ? "2 months free" : "", btn: "Buy Now", style: "accent" },
    { label: "Pro Hub", price: billingCycles["pro-hub"] === "yearly" ? "$590/yr" : "$59/mo", sub: billingCycles["pro-hub"] === "yearly" ? "2 months free" : "", btn: "Buy Now", style: "primary" },
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
      background: "linear-gradient(160deg, #0a0a1a 0%, #0f0a2e 30%, #12082a 60%, #0a0a1a 100%)",
      padding: "80px 24px",
      fontFamily: "'Syne', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .pricing-card-wrap { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .comparison-enter { animation: fadeUp 0.5s ease forwards; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a78bfa 30%, #22c55e 50%, #a78bfa 70%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108,60,224,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px", position: "relative" }}>
        <h2 className="shimmer-text" style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800,
          letterSpacing: "-2px",
          lineHeight: 1.1,
          marginBottom: 16,
          fontFamily: "'Syne', sans-serif",
        }}>
          Simple pricing, powerful results.
        </h2>
        <p style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1.6,
        }}>
          Find and recover missing royalties. Protect your catalog <em style={{ color: "#22c55e", fontStyle: "italic" }}>automatically</em>.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: "flex",
        gap: 20,
        maxWidth: 1260,
        margin: "0 auto",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "stretch",
      }}>
        {plans.map((plan, i) => (
          <div key={plan.id} className="pricing-card-wrap" style={{ animationDelay: `${i * 0.1}s`, display: "flex" }}>
            <PricingCard
              plan={plan}
              billingCycle={billingCycles[plan.id] || "monthly"}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>

      {/* Compare Plans Button */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button
          onClick={handleCompare}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            padding: "12px 32px",
            borderRadius: 30,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(108,60,224,0.5)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >
          Compare Plans
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
            transition: "transform 0.3s ease",
            transform: showComparison ? "rotate(180deg)" : "rotate(0deg)",
          }}>
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Comparison Table */}
      {showComparison && (
        <div ref={tableRef} className="comparison-enter" style={{
          maxWidth: 1100,
          margin: "40px auto 0",
          background: "rgba(15,23,42,0.7)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          overflow: "hidden",
          backdropFilter: "blur(20px)",
        }}>
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.8fr repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            position: "sticky",
            top: 0,
            background: "rgba(15,18,35,0.98)",
            zIndex: 10,
          }}>
            <div style={{ padding: "20px 24px" }} />
            {compTableHeaders.map((h, i) => (
              <div key={i} style={{
                padding: "20px 12px",
                textAlign: "center",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
                background: i === 2 ? "rgba(34,197,94,0.06)" : "transparent",
              }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{h.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>{h.price}</div>
                {h.sub && <div style={{ fontSize: 11, color: "#22c55e", marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{h.sub}</div>}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {updatedComparison.map((row, idx) => {
            const cols = [row.quick, row.deep, row.monitor, row.pro];
            return (
              <div key={idx} style={{
                display: "grid",
                gridTemplateColumns: "1.8fr repeat(4, 1fr)",
                borderBottom: idx < updatedComparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
              }}>
                <div style={{
                  padding: "14px 24px",
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'JetBrains Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.name}
                </div>
                {cols.map((val, ci) => (
                  <div key={ci} style={{
                    padding: "14px 12px",
                    textAlign: "center",
                    borderLeft: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: ci === 2 ? "rgba(34,197,94,0.03)" : "transparent",
                  }}>
                    {val === true ? <Check /> : val === false ? <Dash /> : (
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Table Footer Buttons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.8fr repeat(4, 1fr)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(15,18,35,0.6)",
          }}>
            <div style={{ padding: "20px 24px" }} />
            {compTableHeaders.map((h, i) => {
              const btnBg = h.style === "outline"
                ? "transparent"
                : h.style === "accent"
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #6c3ce0, #4f46e5)";
              const btnBorder = h.style === "outline" ? "1.5px solid rgba(255,255,255,0.3)" : "none";
              return (
                <div key={i} style={{
                  padding: "20px 12px",
                  textAlign: "center",
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <button style={{
                    background: btnBg,
                    border: btnBorder,
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.5px",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    {h.btn}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom ambient */}
      <div style={{
        position: "absolute", bottom: -200, right: -100,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
