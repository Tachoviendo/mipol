import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s · Foros · mipol",
    default: "Foros · mipol",
  },
};

export default async function ForosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      {children}
    </div>
  );
}