#!/usr/bin/env node

function luminance(hex) {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  ["Primary on cream", "#2B2A33", "#FFF8F0"],
  ["Secondary on cream", "#5E5B66", "#FFF8F0"],
  ["Primary on white surface", "#2B2A33", "#FFFFFF"],
  ["Secondary on white surface", "#5E5B66", "#FFFFFF"],
  ["Primary on coral tag (~35% mix)", "#2B2A33", "#FFD4C9"],
  ["Primary on sunflower tag", "#2B2A33", "#FFECB8"],
  ["Primary on sage tag", "#2B2A33", "#DDF0DE"],
  ["Primary on periwinkle tag", "#2B2A33", "#DDE2FF"],
  ["Primary on periwinkle focus ring", "#2B2A33", "#7B8CFF"],
];

console.log("WCAG AA contrast check (normal text needs 4.5:1)\n");
for (const [name, fg, bg] of pairs) {
  const ratio = contrast(fg, bg);
  const pass = ratio >= 4.5 ? "PASS" : "FAIL";
  console.log(`${pass}  ${ratio.toFixed(2)}:1  ${name}`);
}
