import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Rocket } from 'lucide-react';
import { PCBTraces } from './PCBTraces';

interface Experience {
  id: string;
  type: 'work' | 'education' | 'volunteer' | 'internship';
  startDate: string;
  endDate: string;
  displayDate: { nl: string; en: string };
  organization: { name: string; url: string; logo?: string };
  position: { nl: string; en: string };
  description: { nl: string; en: string };
  priority: number;
  visible: boolean;
}

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  volunteer: Users,
  internship: Rocket,
};

const ledColors = ['amber', 'green', 'orange'] as const;

export function Experience() {
  const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => {
        // Sort all experiences by priority
        const sortedExperiences = data.experiences
          .sort((a: Experience, b: Experience) => a.priority - b.priority);
        setAllExperiences(sortedExperiences);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading experiences:', error);
        setLoading(false);
      });
  }, []);

  // Get visible experiences or all based on showAll state
  const experiences = showAll
    ? allExperiences
    : allExperiences.filter(exp => exp.visible);

  const hiddenCount = allExperiences.filter(exp => !exp.visible).length;

  if (loading) {
    return (
      <section className="py-24 px-4 relative">
        <PCBTraces />
        <div className="max-w-4xl mx-auto text-center text-zinc-500">
          <div className="animate-pulse">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative">
      {/* PCB traces overlay */}
      <PCBTraces />

      {/* Circuit trace */}
      <div className="absolute left-16 top-0 w-0.5 h-32 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
            <h2 className="text-5xl">
              <span className="text-white/90">Professional </span>
              <span className="text-amber-500">Journey</span>
            </h2>
          </div>
          <p className="text-zinc-500 border-l-2 border-green-500/30 pl-4">
            My path through hardware and software development
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline trace */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/20 via-green-500/20 to-orange-500/20" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const led = ledColors[index % ledColors.length];
              const Icon = iconMap[exp.type];
              const ledColor = {
                amber: 'bg-amber-500 shadow-amber-500/50',
                green: 'bg-green-500 shadow-green-500/50',
                orange: 'bg-orange-500 shadow-orange-500/50',
              };
              
              const iconBg = {
                amber: 'from-amber-500 to-amber-600',
                green: 'from-green-500 to-green-600',
                orange: 'from-orange-500 to-orange-600',
              };
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline node */}
                  <div className={`absolute left-5 top-6 w-7 h-7 rounded-full bg-gradient-to-br ${iconBg[led as keyof typeof iconBg]} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* LED indicator on card */}
                  <div className={`absolute left-24 top-2 w-2 h-2 rounded-full ${ledColor[led as keyof typeof ledColor]} shadow-lg`} />

                  <Card className="p-6 bg-zinc-950 border-zinc-800 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden">
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div>
                          <h3 className="text-xl text-white/90">{exp.position.en}</h3>
                          <a
                            href={exp.organization.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-500 hover:text-amber-400 transition-colors"
                          >
                            {exp.organization.name}
                          </a>
                        </div>
                        <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900">
                          {exp.displayDate.en}
                        </Badge>
                      </div>

                      <p className="text-zinc-500">{exp.description.en}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {hiddenCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative px-8 py-4 bg-zinc-950 border-2 border-zinc-800 hover:border-amber-500/50 rounded-lg transition-all duration-300 overflow-hidden"
              >
                {/* Grid pattern background */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* LED indicators */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                </div>

                <div className="relative flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {showAll ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>

                  <div className="text-left">
                    <div className="text-white/90 font-medium">
                      {showAll ? 'Show Less' : `Show ${hiddenCount} More`}
                    </div>
                    <div className="text-zinc-500 text-sm">
                      {showAll ? 'View recent highlights' : 'View full experience history'}
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors rounded-lg" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}