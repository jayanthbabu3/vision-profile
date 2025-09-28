import React, { useMemo } from "react";
import PremiumTemplateCarousel from "./PremiumTemplateCarousel";
import { templateRegistry } from "@/lib/template-registry";
// Import to ensure templates are registered
import "@/lib/template-schemas";

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
}

type StatsTone = "primary" | "accent" | "neutral";

const CategoryTemplatesView = () => {
  // Collect templates once so downstream sections stay in sync
  const templates: Template[] = useMemo(() => {
    return templateRegistry.getAllTemplates().map(template => ({
      id: template.id,
      name: template.name,
      category: template.category,
      image: getTemplateImage(template.category, template.id)
    }));
  }, []);

  function getTemplateImage(category: string, id: string) {
    return "/assets/resume-template.png";
  }

  const templateCount = templates.length;
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(templates.map((template) => template.category))).length;
  }, [templates]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-x-0 -bottom-24 h-64 bg-primary/20 blur-3xl opacity-60" />
        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Signature Collection
            </div>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              Resume templates refined for modern professionals
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Thoughtfully designed layouts that mirror the style of our platform—crisp typography, elevated color accents, and the perfect balance of white space.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Carousel */}
      <PremiumTemplateCarousel templates={templates} />

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <StatsCard
              tone="primary"
              value={`${templateCount}+`}
              title="Handcrafted Templates"
              description="Every layout keeps our Inter-based typography, intentional spacing, and signature accents."
            />
            <StatsCard
              tone="accent"
              value={String(uniqueCategories)}
              title="Distinct Style Families"
              description="Move from executive polish to creative flair without stepping outside the ResumeAI design language."
            />
            <StatsCard
              tone="neutral"
              value="100%"
              title="ATS-First Structure"
              description="High-contrast type, semantic hierarchy, and our default font stack keep parsing engines and recruiters aligned."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryTemplatesView;

interface StatsCardProps {
  tone: StatsTone;
  value: string;
  title: string;
  description: string;
}

const toneStyles: Record<StatsTone, {
  glow: string;
  circle: string;
  ring: string;
  inner: string;
  text: string;
}> = {
  primary: {
    glow: "from-primary/20 via-transparent to-primary/5",
    circle: "bg-gradient-to-br from-primary/25 via-primary/10 to-primary/5",
    ring: "border-primary/40",
    inner: "bg-white/70",
    text: "text-primary",
  },
  accent: {
    glow: "from-accent/25 via-transparent to-primary/8",
    circle: "bg-gradient-to-br from-accent/30 via-accent/15 to-primary/10",
    ring: "border-accent/35",
    inner: "bg-white/70",
    text: "text-accent",
  },
  neutral: {
    glow: "from-foreground/20 via-transparent to-primary/5",
    circle: "bg-gradient-to-br from-foreground/15 via-muted/20 to-primary/5",
    ring: "border-foreground/25",
    inner: "bg-white/80",
    text: "text-foreground",
  },
};

function StatsCard({ tone, value, title, description }: StatsCardProps) {
  const styles = toneStyles[tone];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl backdrop-blur">
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${styles.glow} opacity-80`} />
      <div className="relative flex items-center gap-5">
        <div className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full shadow-inner ${styles.circle}`}>
          <div className={`absolute inset-0 rounded-full border ${styles.ring}`} />
          <div className={`absolute inset-2 rounded-full ${styles.inner}`} />
          <span className={`relative font-heading text-2xl font-semibold ${styles.text}`}>
            {value}
          </span>
        </div>
        <div className="text-left">
          <p className="font-heading text-lg font-semibold text-foreground">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
