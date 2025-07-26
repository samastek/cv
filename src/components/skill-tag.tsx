import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  className?: string;
}

// Define color mappings for different skill categories
const getSkillColors = (skill: string): { bg: string; text: string; border: string } => {
  const skillLower = skill.toLowerCase();
  
  // Programming Languages
  if (skillLower.includes('java') && !skillLower.includes('javascript')) {
    return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
  }
  if (skillLower.includes('javascript')) {
    return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
  }
  if (skillLower.includes('typescript')) {
    return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
  }
  if (skillLower.includes('python') || skillLower.includes('c++') || skillLower.includes('c/c++')) {
    return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' };
  }
  
  // Frameworks & Libraries
  if (skillLower.includes('spring') || skillLower.includes('boot')) {
    return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
  }
  if (skillLower.includes('react') || skillLower.includes('next')) {
    return { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200' };
  }
  if (skillLower.includes('tailwind')) {
    return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' };
  }
  
  // Databases
  if (skillLower.includes('postgresql') || skillLower.includes('redis') || skillLower.includes('sql')) {
    return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' };
  }
  
  // DevOps & Infrastructure
  if (skillLower.includes('docker') || skillLower.includes('kubernetes')) {
    return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
  }
  if (skillLower.includes('linux') || skillLower.includes('systemd') || skillLower.includes('rauc')) {
    return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' };
  }
  
  // Cloud & Services
  if (skillLower.includes('vercel') || skillLower.includes('oauth')) {
    return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
  }
  
  // IoT & Hardware
  if (skillLower.includes('iot')) {
    return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
  }
  
  // Tools & Editors
  if (skillLower.includes('vim') || skillLower.includes('confluence') || skillLower.includes('jira')) {
    return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
  }
  
  // Microservices & Architecture
  if (skillLower.includes('microservices')) {
    return { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' };
  }
  
  // Default colors
  return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
};

export function SkillTag({ skill, className }: SkillTagProps) {
  const colors = getSkillColors(skill);
  
  return (
    <Badge
      className={cn(
        "px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md",
        "print:px-1 print:py-0.5 print:text-[8px] print:leading-tight print:shadow-none",
        colors.bg,
        colors.text,
        colors.border,
        "border",
        className
      )}
      variant="outline"
    >
      {skill}
    </Badge>
  );
}
