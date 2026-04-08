import SidebarFilters from "./../../Components/Services/SidebarFilters";
import ServicesContent from "./../../Components/Services/ServicesContent";

export default function Services() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar on mobile (top) */}
      <div className="block md:hidden w-full px-4 pt-4 pb-2">
        <SidebarFilters />
      </div>

      {/* Sidebar on desktop (left) - sticky */}
      <aside className="hidden md:block md:w-80 lg:w-80 xl:w-80 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200 shadow-sm">
          <SidebarFilters />
        </div>
      </aside>

      {/* Main content - takes remaining space */}
      <main className="flex-1 min-w-0 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <ServicesContent />
        </div>
      </main>
    </div>
  );
}