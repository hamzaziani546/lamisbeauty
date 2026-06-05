import fs from "fs";
import path from "path";

const MAP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const EAST = "٠١٢٣٤٥٦٧٨٩";

function toWestern(s) {
  return s.replace(/[٠-٩]/g, (ch) => MAP[EAST.indexOf(ch)]);
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name !== "node_modules" && name !== ".next") walk(p);
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      const raw = fs.readFileSync(p, "utf8");
      const next = toWestern(raw);
      if (next !== raw) fs.writeFileSync(p, next, "utf8");
    }
  }
}

import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
walk(root);
