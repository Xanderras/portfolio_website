import { Card } from './ui/card';
import { Code2, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PCBTraces } from './PCBTraces';

const features = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building responsive web and mobile applications with modern frameworks',
    color: 'amber',
  },
  {
    icon: Cpu,
    title: 'IoT Systems',
    description: 'Developing connected devices and embedded systems for smart solutions',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'PCB Design',
    description: 'Creating custom circuit boards from schematic to production',
    color: 'orange',
  },
];

export function About() {
  return (
    <section className="py-24 px-4 relative">
      {/* PCB traces overlay */}
      <PCBTraces />
      
      {/* Circuit trace connecting to next section */}
      <div className="absolute right-12 top-0 w-0.5 h-24 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <h2 className="text-5xl">
              <span className="text-white/90">What I </span>
              <span className="text-amber-500">Do</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-2xl border-l-2 border-green-500/30 pl-4">
            Specializing in creating seamless experiences across hardware and software. 
            From concept to deployment, I bring ideas to life.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connection lines between cards */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          {features.map((feature, index) => {
            const colorClasses = {
              amber: 'border-amber-500/30 hover:border-amber-500/50 shadow-amber-500/5',
              green: 'border-green-500/30 hover:border-green-500/50 shadow-green-500/5',
              orange: 'border-orange-500/30 hover:border-orange-500/50 shadow-orange-500/5',
            };
            
            const iconBg = {
              amber: 'bg-amber-500/10',
              green: 'bg-green-500/10',
              orange: 'bg-orange-500/10',
            };
            
            const iconColor = {
              amber: 'text-amber-500',
              green: 'text-green-500',
              orange: 'text-orange-500',
            };
            
            const ledColor = {
              amber: 'bg-amber-500 shadow-amber-500/50',
              green: 'bg-green-500 shadow-green-500/50',
              orange: 'bg-orange-500 shadow-orange-500/50',
            };

            const iconBorder = {
              amber: 'border-amber-500/20',
              green: 'border-green-500/20',
              orange: 'border-orange-500/20',
            };

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* LED indicator */}
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${ledColor[feature.color as keyof typeof ledColor]} shadow-lg`} />

                <Card className={`p-6 bg-zinc-950 border ${colorClasses[feature.color as keyof typeof colorClasses]} transition-all duration-300 h-full shadow-lg relative overflow-hidden group`}>
                  {/* Grid pattern overlay */}
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
                    <div className={`w-14 h-14 rounded-lg ${iconBg[feature.color as keyof typeof iconBg]} flex items-center justify-center mb-4 border ${iconBorder[feature.color as keyof typeof iconBorder]}`}>
                      <feature.icon className={`w-7 h-7 ${iconColor[feature.color as keyof typeof iconColor]}`} />
                    </div>
                    <h3 className="text-xl mb-2 text-white/90">{feature.title}</h3>
                    <p className="text-zinc-500">{feature.description}</p>
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