import { cn } from "@/lib/utils";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
  MenuComponent: React.ReactNode;
}

export default function DashboardLayout({
  title,
  children,
  MenuComponent,
}: DashboardLayoutProps) {
  return (
    <>
      <DashboardSidebar MenuComponent={MenuComponent} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          "lg:ml-72"
        )}
      >
        <DashboardHeader MenuComponent={MenuComponent} title={title} />
        <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          "lg:ml-72"
        )}
      >
        <DashboardFooter />
      </footer>
    </>
  );
}
