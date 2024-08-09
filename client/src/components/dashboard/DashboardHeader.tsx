import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "../common/header/components/UserNav";
import { SheetMenu } from "@/components/dashboard/sheet-menu";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title, MenuComponent }: DashboardHeaderProps & { MenuComponent: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu MenuComponent={MenuComponent} />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

