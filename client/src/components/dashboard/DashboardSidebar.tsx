import { cn } from "@/lib/utils";
import Logo from "../common/logo/Logo";

export function DashboardSidebar({ MenuComponent }: { MenuComponent: React.ReactNode }) {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        "w-72"
      )}
    >
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <div className="flex justify-center align-items-center">
          <Logo />
        </div>
        {MenuComponent}
      </div>
    </aside>
  );
}

