import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
