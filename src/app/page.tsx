'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommandMenu } from "@/components/command-menu";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon, CalendarIcon, FlagIcon, HeartIcon, LanguagesIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { useTranslation, useLanguage } from "@/contexts/LanguageContext";
import { locales, localeNamesTranslated } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page() {
  const messages = useTranslation();
  const { locale, setLocale } = useLanguage();
  const isArabic = locale === 'ar';
  
  return (
    <main className={cn(
      "container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16",
      isArabic && "font-arabic"
    )}>
      <section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-4">
        {/* Mobile-optimized header layout */}
        <div className={cn(
          "flex flex-col items-center space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0",
          isArabic && "md:flex-row-reverse"
        )}>
          {/* Title and Info Section - appears first on mobile, positioned based on language on desktop */}
          <div className={cn(
            "flex-1 space-y-1.5 text-center md:text-left",
            isArabic ? "md:ml-6 md:text-right" : "md:mr-6"
          )}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 bg-clip-text text-transparent animate-shimmer">
              {messages.name}
            </h1>
            <p className="max-w-md text-pretty font-medium text-lg text-slate-700 print:text-[12px] mx-auto md:mx-0">
              {messages.about}
            </p>
            <p className={cn(
              "max-w-md items-center text-pretty font-mono text-sm text-muted-foreground flex justify-center md:justify-start",
              isArabic && "md:justify-end"
            )}>
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline hover:text-blue-600 transition-colors duration-300"
                href={RESUME_DATA.locationLink}
                target="_blank"
              >
                <GlobeIcon className="size-4 text-blue-600" />
                {messages.location}
              </a>
            </p>
            {/* Compact Personal Info & Languages */}
            <div className={cn(
              "flex flex-wrap gap-2 pt-3 text-xs justify-center md:justify-start",
              isArabic && "md:justify-end"
            )}>
              {/* Personal Info */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <CalendarIcon className="size-3 text-slate-600" />
                <span className="text-slate-700 font-medium">{messages.personalInfo.values.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <HomeIcon className="size-3 text-slate-600" />
                <a 
                  href={RESUME_DATA.personalInfo.placeOfBirthLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 font-medium hover:text-blue-600 hover:underline transition-colors duration-300"
                >
                  {messages.personalInfo.values.placeOfBirth}
                </a>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <FlagIcon className="size-3 text-slate-600" />
                <span className="text-slate-700 font-medium">{messages.personalInfo.values.nationality}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <HeartIcon className="size-3 text-slate-600" />
                <span className="text-slate-700 font-medium">{messages.personalInfo.values.maritalStatus}</span>
              </div>
              
              {/* Language Switcher - Clickable Text */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <LanguagesIcon className="size-3 text-slate-600" />
                <div className="flex items-center gap-2">
                  {locales.map((lang, index) => (
                    <div key={lang} className="flex items-center gap-2">
                      <button
                        onClick={() => setLocale(lang)}
                        className={cn(
                          "text-slate-700 font-medium text-xs hover:text-blue-600 transition-colors duration-200 cursor-pointer px-1 py-0.5 rounded",
                          locale === lang && "text-blue-600 bg-blue-50 font-semibold"
                        )}
                        title={`Switch to ${localeNamesTranslated[locale][lang]}`}
                      >
                        {localeNamesTranslated[locale][lang]}
                      </button>
                      {index < locales.length - 1 && (
                        <span className="text-slate-400 text-xs">|</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={cn(
              "flex gap-x-2 pt-2 font-mono text-sm text-muted-foreground print:hidden justify-center md:justify-start",
              isArabic && "md:justify-end"
            )}>
              {(() => {
                const contactButtons = [];
                
                // Email button
                if (RESUME_DATA.contact.email) {
                  contactButtons.push(
                    <Button
                      key="email"
                      className="size-10 professional-hover hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={`mailto:${RESUME_DATA.contact.email}`}>
                        <MailIcon className="size-5" />
                      </a>
                    </Button>
                  );
                }
                
                // Phone button
                if (RESUME_DATA.contact.tel) {
                  contactButtons.push(
                    <Button
                      key="phone"
                      className="size-10 professional-hover hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={`tel:${RESUME_DATA.contact.tel}`}>
                        <PhoneIcon className="size-5" />
                      </a>
                    </Button>
                  );
                }
                
                // Social media buttons
                RESUME_DATA.contact.social.forEach((social) => {
                  contactButtons.push(
                    <Button
                      key={social.name}
                      className="size-10 professional-hover hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={social.url}>
                        <social.icon className="size-5" />
                      </a>
                    </Button>
                  );
                });
                
                // Return reversed array for Arabic, normal for others
                return isArabic ? contactButtons.reverse() : contactButtons;
              })()}
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px]">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
              {RESUME_DATA.contact.tel ? (
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  <span className="underline">{RESUME_DATA.contact.tel}</span>
                </a>
              ) : null}
            </div>
          </div>

          {/* Avatar Section - appears second on mobile, positioned based on language on desktop */}
          <Avatar className={cn(
            "size-32 sm:size-36 md:size-40 lg:size-44 ring-4 ring-primary/20 ring-offset-2 animate-pulse-glow flex-shrink-0",
            isArabic ? "md:order-first" : "md:order-last"
          )}>
            <AvatarImage alt={messages.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white">
              {messages.initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <Section variant="siemens">
          <div className="classic-divider">
            <span>{messages.sections.workExperience}</span>
          </div>
          {Object.entries(messages.work).map(([key, work]) => {
            const resumeWork = RESUME_DATA.work.find(w => w.company.toLowerCase().includes(key === 'siemens' ? 'siemens' : 'adorsys'));
            const isSiemens = key === 'siemens';
            return (
              <div 
                key={key} 
                className={cn(
                  "mb-6 transition-all duration-300",
                  isSiemens && "relative p-5 rounded-xl bg-gradient-to-r from-blue-50/80 via-slate-50/60 to-teal-50/80 border border-blue-200/40 shadow-sm hover:shadow-md hover:border-blue-300/60"
                )}
              >
                {isSiemens && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 via-teal-400/3 to-blue-400/5 pointer-events-none" />
                )}
                <div className="relative">
                  <div className={cn(
                    "flex flex-col gap-y-2 text-base md:flex-row md:items-center md:justify-between md:gap-y-0",
                    isArabic ? "md:justify-between" : "md:justify-between"
                  )}>
                    <div className={cn(
                      "flex flex-col gap-y-1 md:flex-row md:items-center md:gap-x-2",
                      isArabic ? "md:order-2 items-end md:items-center" : "md:order-1 items-start md:items-center"
                    )}>
                      <h3 className="font-bold leading-none">
                        <a 
                          className={cn(
                            "hover:underline transition-all duration-300 relative",
                            isSiemens ? "text-slate-800 hover:text-blue-700 font-semibold" : "text-slate-800 hover:text-blue-600"
                          )}
                          href={resumeWork?.link}
                        >
                          {resumeWork?.company}
                          {isSiemens && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full shadow-sm" />
                          )}
                        </a>
                      </h3>

                      <div className={cn(
                        "flex flex-wrap gap-1 mt-1 md:mt-0",
                        isArabic ? "justify-end md:justify-start" : "justify-start"
                      )}>
                        {resumeWork?.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="text-[10px] md:text-xs print:text-[8px] print:leading-tight print:px-1 print:py-0.5 transition-all duration-200 px-2 py-0.5"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className={cn(
                      "text-sm tabular-nums font-medium self-start md:self-center",
                      isSiemens ? "text-blue-700 font-semibold" : "text-black",
                      isArabic ? "md:order-1 text-right md:text-left" : "md:order-2 text-left"
                    )}>
                      {resumeWork?.start} - {resumeWork?.end ?? "Present"}
                    </div>
                  </div>

                  <h4 className={cn(
                    "font-semibold text-base leading-none print:text-[12px] mt-1",
                    isSiemens ? "text-slate-700 font-bold" : "text-slate-700",
                    isArabic ? "text-right" : ""
                  )}>
                    {work.title}
                  </h4>
                </div>
                <div className={cn(
                  "mt-3 text-sm print:text-[10px] leading-relaxed",
                  isSiemens ? "text-slate-700" : "text-slate-600",
                  isArabic ? "text-right" : ""
                )}>
                  {work.description}
                </div>
              </div>
            );
          })}
        </Section>
        <Section variant="highlighted">
          <div className="classic-divider">
            <span>{messages.sections.education}</span>
          </div>
          {Object.entries(messages.education).map(([key, education]) => {
            const resumeEducation = RESUME_DATA.education.find(e => 
              key === 'university' ? e.school.toLowerCase().includes('technische') : 
              key === 'abitur' ? e.degree.toLowerCase().includes('abitur') : false
            );
            return (
              <div key={key} className="mb-4">
                <div>
                  <div className={cn(
                    "flex items-center gap-x-2 text-base",
                    isArabic ? "justify-between" : "justify-between"
                  )}>
                    <h3 className={cn(
                      "font-bold leading-none text-slate-800",
                      isArabic ? "order-2" : "order-1"
                    )}>
                      {education.school}
                    </h3>
                    <div className={cn(
                      "text-sm tabular-nums text-black font-medium",
                      isArabic ? "order-1" : "order-2"
                    )}>
                      {resumeEducation?.start} - {resumeEducation?.end}
                    </div>
                  </div>
                </div>
                <div className={`mt-2 print:text-[12px] text-slate-600 font-medium ${
                  isArabic ? 'text-right' : ''
                }`}>
                  {education.degree}
                </div>
                {education.description && (
                  <div className={`mt-1 print:text-[10px] text-slate-500 text-sm ${
                    isArabic ? 'text-right' : ''
                  }`}>
                    {education.description}
                  </div>
                )}
              </div>
            );
          })}
        </Section>
        
        <Section variant="highlighted">
          <div className="classic-divider">
            <span>{messages.sections.recognitions}</span>
          </div>
          {Object.entries(messages.recognitions).map(([key, recognition]) => {
            const resumeRecognition = RESUME_DATA.recognitions.find(r => 
              key === 'scholarship' ? r.title.toLowerCase().includes('scholarship') :
              key === 'sponsorship' ? r.title.toLowerCase().includes('sponsorship') :
              key === 'excellence' ? r.title.toLowerCase().includes('excellent') : false
            );
            return (
              <div key={key} className="mb-4">
                <div>
                  <div className={cn(
                    "flex items-center gap-x-2 text-base",
                    isArabic ? "justify-between" : "justify-between"
                  )}>
                    <h3 className={cn(
                      "font-bold leading-none text-slate-800",
                      isArabic ? "order-2" : "order-1"
                    )}>
                      {recognition.title}
                    </h3>
                    <div className={cn(
                      "text-sm tabular-nums text-black font-medium",
                      isArabic ? "order-1" : "order-2"
                    )}>
                      {resumeRecognition?.date}
                    </div>
                  </div>
                  <div className={`mt-1 text-sm font-medium text-slate-600 ${
                    isArabic ? 'text-right' : ''
                  }`}>
                    {recognition.organization} • {recognition.type}
                  </div>
                </div>
                <div className={`mt-2 print:text-[12px] text-slate-600 text-sm ${
                  isArabic ? 'text-right' : ''
                }`}>
                  {recognition.description}
                </div>
              </div>
            );
          })}
        </Section>
        
        <Section variant="highlighted">
          <div className="classic-divider !my-4">
            <span>{messages.sections.skills}</span>
          </div>
          {/* Optimized grid layout with integrated labels */}
          <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 justify-items-center max-w-6xl mx-auto">
            {RESUME_DATA.skills.map((skill) => {
              return (
                <div
                  key={skill.name}
                  className="relative group"
                >
                  {/* iPhone-like icon container with integrated label */}
                  <div className="skill-icon-container relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-gray-100/50 overflow-hidden flex flex-col">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20"></div>
                    
                    {/* Icon image - positioned in upper portion */}
                    <div className="flex-1 relative">
                      <Image 
                        src={skill.src} 
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="absolute inset-0.5 w-auto h-auto max-w-[calc(100%-4px)] max-h-[calc(100%-4px)] object-contain m-auto top-0 left-0 right-0 bottom-0 transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Elegant label - positioned at bottom */}
                    <div className="px-0.5 py-0.5 bg-gradient-to-t from-gray-50/90 to-transparent">
                      <span className="text-[6px] sm:text-[7px] md:text-[8px] font-medium text-gray-700 text-center leading-none block truncate print:text-[5px]">
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Shine effect overlay */}
                    <div className="shine-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
        
        
        <Section variant="highlighted">
          <div className="classic-divider">
            <span>{messages.sections.interests}</span>
          </div>
          <ul className={cn(
            "list-disc list-inside space-y-2 text-slate-700",
            isArabic && "list-outside text-right"
          )}>
            {messages.interestsList.map((interest, index) => (
              <li key={index} className={cn(
                "text-sm leading-relaxed",
                isArabic && "text-right"
              )}>
                {interest}
              </li>
            ))}
          </ul>
        </Section>

        <Section className="print-force-new-page scroll-mb-16" variant="highlighted">
          <div className="classic-divider">
            <span>{messages.sections.projects}</span>
          </div>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(messages.projects).length > 0 ? Object.entries(messages.projects).map(([key, project]) => {
              const resumeProject = RESUME_DATA.projects.find(p => 
                key === 'iot' ? p.title.toLowerCase().includes('iot') :
                key === 'financial' ? p.title.toLowerCase().includes('financial') :
                key === 'dualStudy' ? p.title.toLowerCase().includes('dual') :
                key === 'portfolio' ? p.title.toLowerCase().includes('portfolio') : false
              );
              return (
                <ProjectCard
                  key={key}
                  title={project.title}
                  description={project.description}
                  tags={resumeProject?.techStack || []}
                  link={resumeProject && "link" in resumeProject ? resumeProject.link.href : undefined}
                />
              );
            }) : (
              <div className="col-span-full text-center py-8 text-slate-500">
                <p className="text-lg font-medium">{messages.footer.comingSoon}</p>
                <p className="text-sm">{messages.footer.focusingOn}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Professional Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center print:hidden">
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>© 2025 {messages.name}</span>
            <span>•</span>
            <span>{messages.footer.builtWith}</span>
            <span>•</span>
            <a 
              href={RESUME_DATA.personalWebsiteUrl}
              className="hover:text-blue-600 transition-colors duration-300"
              target="_blank"
            >
              {messages.footer.visitPortfolio}
            </a>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            This CV is optimized for both digital viewing and printing • Press Ctrl+P to print
          </div>
        </footer>
      </section>

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
