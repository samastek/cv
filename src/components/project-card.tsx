import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { SkillTag } from "./skill-tag";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border border-muted p-4 professional-hover bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold">
            {link ? (
              <a
                href={link}
                target="_blank"
                className="inline-flex items-center gap-2 hover:underline text-slate-800 hover:text-blue-600 transition-colors duration-300"
              >
                {title}{" "}
                <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
              </a>
            ) : (
              <span className="text-slate-800">{title}</span>
            )}
          </CardTitle>
          <div className="hidden font-mono text-xs underline print:visible text-slate-500">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <CardDescription className="font-medium text-sm print:text-[10px] text-slate-600 leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <SkillTag
              key={tag}
              skill={tag}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
