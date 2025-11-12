import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { PCBTraces } from './PCBTraces';
import { ImageWithFallback } from './ImageWithFallback';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  priority: number;
}

const ledColors = ['amber', 'green', 'orange'] as const;

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        // Sort projects by priority
        const sortedProjects = data.projects
          .sort((a: Project, b: Project) => a.priority - b.priority);
        setProjects(sortedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 relative">
        <PCBTraces />
        <div className="max-w-6xl mx-auto text-center text-zinc-500">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative">
      {/* PCB traces overlay */}
      <PCBTraces />

      {/* Circuit decorations */}
      <div className="absolute right-16 top-12 w-0.5 h-24 bg-gradient-to-b from-amber-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
            <h2 className="text-5xl">
              <span className="text-white/90">Featured </span>
              <span className="text-amber-500">Projects</span>
            </h2>
          </div>
          <p className="text-zinc-500 border-l-2 border-amber-500/30 pl-4">
            A selection of recent work spanning hardware and software
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => {
            const led = ledColors[index % ledColors.length];
            const ledColor = {
              amber: 'bg-amber-500 shadow-amber-500/50',
              green: 'bg-green-500 shadow-green-500/50',
              orange: 'bg-orange-500 shadow-orange-500/50',
            };

            const borderColor = {
              amber: 'hover:border-amber-500/50',
              green: 'hover:border-green-500/50',
              orange: 'hover:border-orange-500/50',
            };

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`bg-zinc-950 border-zinc-800 ${borderColor[led as keyof typeof borderColor]} overflow-hidden transition-all duration-300 h-full flex flex-col group relative`}>
                  {/* LED indicator */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${ledColor[led as keyof typeof ledColor]} shadow-lg z-10`} />

                  <div className="relative h-48 bg-zinc-900 overflow-hidden">
                    <ImageWithFallback
                      src={project.image.startsWith('/')
                        ? project.image
                        : `https://source.unsplash.com/600x400/?${project.image}`
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl mb-2 text-white/90">{project.title}</h3>
                    <p className="text-zinc-500 mb-4 flex-1 text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(project.link || project.github) && (
                      <div className="flex gap-2">
                        {project.link && (
                          <Button
                            size="sm"
                            variant="outline"
                            className={`${project.github ? 'flex-1' : 'w-full'} border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-amber-500 hover:border-amber-500/30`}
                            asChild
                          >
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-2" />
                              View
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            className={`${project.link ? 'flex-1' : 'w-full'} border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-amber-500 hover:border-amber-500/30`}
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
