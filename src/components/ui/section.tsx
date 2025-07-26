import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "siemens";
}

export function Section({ className, variant = "default", ...props }: SectionProps) {
  const baseClasses = "flex min-h-0 flex-col gap-y-6 mb-8";
  
  const variantClasses = {
    default: "",
    highlighted: "p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200",
    siemens: "p-6 bg-gradient-to-br from-blue-50/30 via-white to-teal-50/30 rounded-xl border border-blue-200/50 shadow-sm relative overflow-hidden"
  };

  return (
    <section
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {variant === "siemens" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-transparent to-teal-500/3 pointer-events-none" />
        </>
      )}
      <div className="relative">
        {props.children}
      </div>
    </section>
  );
}
