import React, { useState } from "react";

const Colors = () => {
  const [copiedText, setCopiedText] = useState(null);

  const colorData = [
    { name: "--color-bg", hex: "#0d0d0e", desc: "Main Background" },
    { name: "--color-card", hex: "#161618", desc: "Card Background" },
    { name: "--color-primary", hex: "#6366f1", desc: "Primary Accent" },
    { name: "--color-secondary", hex: "#8b5cf6", desc: "Secondary Accent" },
    { name: "--color-tertiary", hex: "#b95f00", desc: "Tertiary Accent" },
    { name: "--color-neutral", hex: "#0a0a0a", desc: "Neutral/Dark" },
    { name: "--color-border", hex: "#232326", desc: "Borders & Dividers" },
    { name: "--color-text-primary", hex: "#ffffff", desc: "Primary Text" },
    { name: "--color-text-secondary", hex: "#a1a1aa", desc: "Secondary Text" },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="p-8 min-h-screen bg-[#0d0d0e] text-white font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-[#232326] pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#ffffff]">
            Theme Style Guide
          </h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            A quick reference sheet for CSS variables and arbitrary Tailwind
            utility classes.
          </p>
        </header>

        {copiedText && (
          <div className="fixed bottom-4 right-4 bg-[#6366f1] text-white px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-300 z-50 animate-bounce">
            Copied: <span className="font-mono font-bold">{copiedText}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorData.map((color) => {
            const bgTailwind = `bg-[var(${color.name})]`;
            const textTailwind = `text-[var(${color.name})]`;

            return (
              <div
                key={color.name}
                className="bg-[#161618] rounded-xl p-5 border border-[#232326] shadow-sm hover:border-[#6366f1]/50 transition-colors duration-200"
              >
                {/* Visual Color Preview Block */}
                <div
                  className="w-full h-24 rounded-lg mb-4 border border-[#232326]/60 transition-transform hover:scale-[1.02] duration-200 cursor-pointer"
                  style={{
                    backgroundColor: `var(${color.name}, ${color.hex})`,
                  }}
                  title="Click to copy HEX"
                  onClick={() => handleCopy(color.hex)}
                />

                {/* Information Header */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-[#ffffff] font-mono">
                    {color.name}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">{color.desc}</p>
                </div>

                {/* Technical Codes & Utility Classes */}
                <div className="space-y-2 pt-2 border-t border-[#232326]">
                  {/* Hex Code */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#a1a1aa]">HEX Code:</span>
                    <button
                      onClick={() => handleCopy(color.hex)}
                      className="font-mono bg-[#0d0d0e] px-2 py-1 rounded border border-[#232326] hover:text-[#6366f1] transition-colors"
                    >
                      {color.hex}
                    </button>
                  </div>

                  {/* Tailwind Background Utility */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#a1a1aa]">Tailwind Bg:</span>
                    <button
                      onClick={() => handleCopy(bgTailwind)}
                      className="font-mono text-[#8b5cf6] bg-[#0d0d0e] px-2 py-1 rounded border border-[#232326] hover:bg-[#232326] transition-colors"
                    >
                      {bgTailwind}
                    </button>
                  </div>

                  {/* Tailwind Text Utility */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#a1a1aa]">Tailwind Text:</span>
                    <button
                      onClick={() => handleCopy(textTailwind)}
                      className="font-mono text-[#6366f1] bg-[#0d0d0e] px-2 py-1 rounded border border-[#232326] hover:bg-[#232326] transition-colors"
                    >
                      {textTailwind}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Colors;
