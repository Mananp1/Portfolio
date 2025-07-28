import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white">
          <Menu className="text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#F9F3EF]">
        <div className="mt-12">
          <NavMenu orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
