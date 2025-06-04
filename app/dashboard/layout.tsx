import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full max-w-5xl p-5 flex items-center bg-gray-800 text-white gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/inventory">Inventory</Link>
          <Link href="/dashboard/services">Services</Link>
          <Link href="/dashboard/customers">Customers</Link>
          <Link href="/dashboard/opportunities">Opportunities</Link>
          <Link href="/dashboard/quarantine">Quarantine</Link>
        </nav>
        <div className="flex-1 flex flex-col max-w-5xl p-5">
          {children}
        </div>
      </div>
    </main>
  );
}
