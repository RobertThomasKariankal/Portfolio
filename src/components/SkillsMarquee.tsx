import { Asterisk } from "lucide-react";

const skills = [
  "Web Design",
  "App Design",
  "Dashboard",
  "Wireframe",
  "UI/UX Design",
  "Branding",
  "Prototyping",
  "Figma",
];

const SkillsMarquee = () => {
  return (
    <div className="py-6 bg-primary overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center mx-4">
            <Asterisk className="w-5 h-5 text-primary-foreground mr-4" />
            <span className="font-display text-lg md:text-xl font-semibold text-primary-foreground">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;