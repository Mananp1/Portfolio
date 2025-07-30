import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="h-16 bg-[#F9F3EF] sticky top-0 z-50 w-full">
      <div className="h-full flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          {/* Add your logo here if needed */}
        </div>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavMenu />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex-shrink-0">
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
