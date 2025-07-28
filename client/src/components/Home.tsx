import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useState, useRef } from "react";

const InteractiveBadge = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [frozenPosition, setFrozenPosition] = useState({ x: 0, y: 0 });
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });

      // Mark that user has interacted
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Freeze the gradient at the last mouse position
    if (hasInteracted) {
      setFrozenPosition(mousePosition);
    }
  };

  // Determine which position to use for the gradient
  const getGradientPosition = () => {
    if (isHovering) {
      return mousePosition;
    } else if (hasInteracted) {
      return frozenPosition;
    } else {
      return { x: 0, y: 0 }; // Default position
    }
  };

  const gradientPos = getGradientPosition();

  return (
    <div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer"
    >
      <Badge
        className="relative border-none rounded-full py-6 px-10 text-white text-xl overflow-hidden transition-all duration-300 hover:scale-105"
        style={{
          background:
            hasInteracted || isHovering
              ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #1B3C53 0%, #a1abb3 50%, #1B3C53 100%)`
              : "linear-gradient(to right, #1B3C53, #a1abb3, #1B3C53)",
        }}
      >
        <span className="relative z-10">Hello, I'm Manan Patel</span>
        {(isHovering || hasInteracted) && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: `translateX(${gradientPos.x - 50}%)`,
              transition: isHovering ? "transform 0.1s ease-out" : "none",
            }}
          />
        )}
      </Badge>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home">
      <div className="h-screen flex items-center justify-center px-6 bg-background">
        <div className="text-center max-w-2xl">
          <InteractiveBadge />

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold text-foreground">
            Full-Stack Developer & Problem Solver
          </h1>

          <p className="mt-6 text-muted-foreground text-[17px] md:text-lg">
            Passionate about building modern web applications using React, Node,
            and everything in between. Let's create something amazing together.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full text-base group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Button>

            <Button
              size="lg"
              className="rounded-full text-base bg-primary hover:bg-primary-hover text-white group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <a href="/resume_Manan_Patel.pdf" download>
                <Download className="mr-2 h-5 w-5 transition-all duration-300 group-hover:animate-bounce group-hover:scale-110" />
                <span className="relative z-10">Download Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
