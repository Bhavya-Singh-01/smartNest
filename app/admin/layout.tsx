import { Suspense, type ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { Toast } from "@/components/ui/Toast";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNav />
      {children}
      <Suspense>
        <Toast />
      </Suspense>
    </>
  );
}
