import { ReactNode } from "react";
import styles from "./grid.module.css";

interface GridPorps {
  columns?: number;
  gap?: number;
  children: ReactNode;
  className?: string;
}

// Grid
export default function Grid({
  columns = 3,
  gap = 10,
  children,
  className,
}: GridPorps) {
  const gridClass = [styles.container, className].filter(Boolean).join(" ");

  return (
    <div
      className={gridClass}
      style={
        {
          "--cols": columns,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }>
      {children}
    </div>
  );
}
