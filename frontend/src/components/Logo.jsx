import React from "react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_2caf7472-358e-4951-9ad9-64b890599e8e/artifacts/yzfprxpq_bnm-02.jpg";

export default function Logo({ size = 36, withWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="brand-logo">
      <img
        src={LOGO_URL}
        alt="MercSoft logo"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          mixBlendMode: "screen",
          filter: "drop-shadow(0 0 14px rgba(0, 229, 255, 0.25))",
        }}
        draggable={false}
      />
      {withWordmark && (
        <span
          className="heading"
          style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "#fff" }}
        >
          MercSoft
        </span>
      )}
    </div>
  );
}
