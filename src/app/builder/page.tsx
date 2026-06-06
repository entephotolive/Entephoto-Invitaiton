import Sidebar from "@/components/builder/Sidebar";
import WeddingTemplate from "@/components/templates/WeddingTemplate";

export default function BuilderPage() {
  return (
    <div className="h-screen grid lg:grid-cols-2">

      <div className="border-r overflow-y-auto">
        <Sidebar />
      </div>

      <div className="overflow-y-auto bg-zinc-100">
        <WeddingTemplate />
      </div>

    </div>
  );
}