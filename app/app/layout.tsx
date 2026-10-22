import { Suspense, type ReactNode } from "react";
import { AppNav } from "@/components/app/AppNav";
import { Toast } from "@/components/ui/Toast";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppNav />
      {children}
      <Suspense>
        <Toast />
      </Suspense>
    </>
  );
}
