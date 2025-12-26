import { ReactNode } from "react";
import { Searchbar } from "@/components";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
