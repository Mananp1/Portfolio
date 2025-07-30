import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavMenuProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const NavMenu = ({ className = "", orientation }: NavMenuProps) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isVertical = orientation === "vertical";

  return (
    <NavigationMenu orientation={orientation} className={className}>
      <NavigationMenuList
        className={`gap-6 space-x-0 text-base font-medium text-foreground ${
          isVertical ? "flex-col items-start space-y-4" : "flex-row"
        }`}
      >
        {["home", "projects", "contact"].map((id) => (
          <NavigationMenuItem key={id} className={isVertical ? "w-full" : ""}>
            <NavigationMenuLink
              asChild
              className={`relative cursor-pointer transition-colors duration-200 hover:text-primary ${
                isVertical ? "w-full text-left" : ""
              } ${
                activeSection === id
                  ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                  : "text-foreground after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-transparent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:bg-primary"
              }`}
            >
              <button
                onClick={() => scrollToSection(id)}
                className={`bg-transparent border-none p-0 font-medium ${
                  isVertical ? "w-full text-left py-2" : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
