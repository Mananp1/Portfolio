import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    category: "MERN Stack",
    title: "Furnishly",
    details:
      "Full-featured MERN application with authentication, cart, wishlist, and stripe payment integration.",
    link: "https://furnishly.online/",
    imageName: "/images/furnishly.webp",
  },
  {
    category: "MERN Stack",
    title: "Jobify",
    details:
      "A job portal with user auth, job tracking, job application, and admin panel for managing jobs and users.",
    link: "https://github.com/Mananp1/jobify",
    imageName: "/images/jobify.webp",
  },
  {
    category: "Node + MongoDB",
    title: "University Event Manager",
    details:
      "Backend API for managing university events with user registration, ticketing, and analytics.",
    link: "https://github.com/Mananp1/event-manager",
    imageName: "/images/event.webp",
  },
  {
    category: "MERN Stack",
    title: "Thinkpad",
    details:
      "A full-stack application for managing and tracking tasks, built with MERN stack and MongoDB.",
    link: "https://github.com/Mananp1/thinkpad",
    imageName: "/images/tasks.webp",
  },
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(
    new Set()
  );
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (entry.isIntersecting && index !== -1) {
            setVisibleProjects((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-6 bg-background">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Projects
        </h2>

        <div className="space-y-20">
          {projects.map((project, i) => {
            const isVisible = visibleProjects.has(i);
            const isEven = i % 2 === 0;

            return (
              <div
                key={project.title}
                ref={(el) => {
                  projectRefs.current[i] = el;
                }}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image with animation */}
                <div
                  className={`w-full max-w-md transition-all duration-1000 ease-out ${
                    isVisible
                      ? "opacity-100 transform translate-x-0"
                      : `opacity-0 transform ${
                          isEven ? "-translate-x-20" : "translate-x-20"
                        }`
                  }`}
                >
                  <img
                    src={project.imageName}
                    alt={project.title}
                    className="w-full rounded-xl border border-border aspect-[6/4] object-cover"
                  />
                </div>

                {/* Content with animation */}
                <div
                  className={`flex-1 transition-all duration-1000 ease-out delay-300 ${
                    isVisible
                      ? "opacity-100 transform translate-x-0"
                      : `opacity-0 transform ${
                          isEven ? "translate-x-20" : "-translate-x-20"
                        }`
                  }`}
                >
                  <span className="uppercase text-sm font-semibold text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-semibold mt-2">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-[17px]">
                    {project.details}
                  </p>
                  <Button
                    asChild
                    className="mt-6 rounded-full text-[15px] min-w-40 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">View Project</span>
                      <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
