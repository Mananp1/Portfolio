import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-50 border-gray-200"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[#F9F3EF] w-[280px] sm:w-[320px] p-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-6 py-8">
            <NavMenu orientation="vertical" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
