import { load, type PieceName } from "ascii.rest";
import styles from "@/app/home.module.css";

// GitHub language name -> ascii.rest piece. Anything else (ShaderLab, HLSL, ...) is shown as text.
const pieces: Record<string, PieceName> = {
  "C#": "csharp", "C++": "cpp", C: "c", Python: "python", JavaScript: "javascript",
  TypeScript: "typescript", Java: "java", HTML: "html", CSS: "css", Go: "go",
  Rust: "rust", Kotlin: "kotlin", Swift: "swift", PHP: "php", Ruby: "ruby", Dart: "dart", Lua: "lua",
};

export interface LanguageShare { name: string; percentage: number }

// Server component: the piece's first frame is plain text, so no client JS or animation is shipped.
async function logo(name: string): Promise<string | null> {
  const piece = pieces[name];
  if (!piece) return null;
  try {
    const mod = await load[piece]();
    const make = mod.default as (options: object) => (t: number) => string;
    return make({ shine: 0 })(0).trimEnd();
  } catch {
    return null; // fall back to the text label
  }
}

export async function TechLogos({ languages }: { languages: LanguageShare[] }) {
  const top = languages.slice(0, 4);
  const art = await Promise.all(top.map((language) => logo(language.name)));

  return (
    <ul className={styles.logos} aria-label="Most used languages on GitHub">
      {top.map((language, index) => (
        <li key={language.name}>
          <figure>
            {art[index]
              ? <div aria-hidden="true" className={styles.logoArt}><pre className={styles.asciiLogo}>{art[index]}</pre></div>
              : <div aria-hidden="true" className={styles.logoText}>{language.name}</div>}
            <figcaption>{language.name}<small>{language.percentage.toFixed(1)}%</small></figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
