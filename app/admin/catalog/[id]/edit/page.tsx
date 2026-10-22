import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getCatalogItem } from "@/lib/admin-data";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { CatalogForm } from "@/components/admin/CatalogForm";

export const metadata = { title: "Edit catalogue entry" };

type Params = Promise<{ id: string }>;

export default function EditCatalogItemPage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading…">
      <EditItem params={params} />
    </AppPage>
  );
}

async function EditItem({ params }: { params: Params }) {
  const { id } = await params;
  await requireAdmin();
  const item = await getCatalogItem(id);
  if (!item) notFound();
  return (
    <>
      <p className="back-link"><Link href="/admin/catalog">← Device catalogue</Link></p>
      <PageHead eyebrow="Device catalogue" title={item.name} />
      <div className="card form-card">
        <CatalogForm item={item} />
      </div>
    </>
  );
}
