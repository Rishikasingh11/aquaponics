import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../common/logo/Logo";
import { MenuIcon } from "lucide-react";

export function SheetMenu({ MenuComponent }: { MenuComponent: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <div className="flex justify-center align-items-center">
            <Logo />
          </div>
        </SheetHeader>
        {MenuComponent}
      </SheetContent>
    </Sheet>
  );
}

