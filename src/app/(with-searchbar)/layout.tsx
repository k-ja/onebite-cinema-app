import { ReactNode, Suspense } from "react";
import { Searchbar } from "@/components";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
