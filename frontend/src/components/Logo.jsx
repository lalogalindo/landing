import React from "react";
import LOGO from "../assets/images/main-logo.png";

export default function Logo({ size = 36, withWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center ${className}`} data-testid="brand-logo">
      <img
        src={LOGO}
        alt="MercSoft logo"
        className="h-12 md:h-[90px] w-auto"
        style={{ objectFit: "contain" }}
        draggable={false}
      />
    </div>
  );
}
