import { buildHeatmap, type GitHubView } from "@/lib/github-view";
import styles from "./GitHubHeatmap.module.css";

export function GitHubHeatmap({ days, total }: { days: GitHubView["days"]; total: number }) {
  const { weeks, months } = buildHeatmap(days);
  const glyphs = [".", "░", "▒", "▓", "█"];

  return (
    <figure className={styles.figure}>
      <div className={styles.chart} role="img" aria-label={`${total} GitHub contributions over the past year. Daily counts are available below.`}>
        <div className={styles.weekdays} aria-hidden="true">
          <span>mon</span><span>wed</span><span>fri</span>
        </div>
        <div className={styles.calendar} style={{ gridTemplateColumns: `repeat(${Math.max(1, weeks.length)}, minmax(0, 1fr))` }} aria-hidden="true">
          {months.map((month, index) => (
            // Omit a cramped edge label rather than overlap the next month.
            (months[index + 1]?.week ?? weeks.length) - month.week >= 2 && (
              <span className={styles.month} key={`${month.week}-${month.label}`} style={{ gridColumn: `${month.week + 1} / span 2`, gridRow: 1 }}>
                {month.label}
              </span>
            )
          ))}
          {weeks.map((week, column) => week.map((day, row) => {
            const level = !day || day.count === 0 ? 0 : day.count === 1 ? 1 : day.count < 4 ? 2 : day.count < 8 ? 3 : 4;
            return (
              <span
                key={`${column}-${row}`}
                className={styles.cell}
                data-level={level}
                style={{ gridColumn: column + 1, gridRow: row + 2 }}
                title={day ? `${day.date}: ${day.count} contributions` : undefined}
              >{day ? glyphs[level] : " "}</span>
            );
          }))}
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>{total.toLocaleString("en")} contributions in the past year</span>
        <span className={styles.legend} aria-label="Intensity: none, 1, 2–3, 4–7, 8 or more contributions">
          less <span aria-hidden="true">. ░ ▒ ▓ █</span> more
        </span>
      </figcaption>
      <details className={styles.details}>
        <summary>Daily counts</summary>
        <p>Includes anonymous private contributions.</p>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Daily contribution counts">
          <table>
            <caption className="sr-only">GitHub daily contributions</caption>
            <thead><tr><th scope="col">Date</th><th scope="col">Contributions</th></tr></thead>
            <tbody>{days.map((day) => <tr key={day.date}><th scope="row">{day.date}</th><td>{day.count}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
