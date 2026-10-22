import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { CatalogForm } from "@/components/admin/CatalogForm";

export const metadata = { title: "Add catalogue entry" };

export default function NewCatalogItemPage() {
  return (
    <AppPage loading="Loading…">
      <NewItem />
    </AppPage>
  );
}

async function NewItem() {
  await requireAdmin();
  return (
    <>
      <p className="back-link"><Link href="/admin/catalog">← Device catalogue</Link></p>
      <PageHead eyebrow="Device catalogue" title="Add an entry" />
      <div className="card form-card">
        <CatalogForm />
      </div>
    </>
  );
}
