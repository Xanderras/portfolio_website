import { motion } from 'framer-motion';
import { PCBTraces } from './PCBTraces';

const skillCategories = [
  {
    category: 'Web & Mobile',
    color: 'amber',
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'React Native', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Node.js', level: 82 },
    ],
  },
  {
    category: 'IoT & Embedded',
    color: 'green',
    skills: [
      { name: 'Arduino/ESP32', level: 92 },
      { name: 'Raspberry Pi', level: 85 },
      { name: 'MQTT/IoT Protocols', level: 80 },
      { name: 'C/C++', level: 75 },
    ],
  },
  {
    category: 'Hardware Design',
    color: 'orange',
    skills: [
      { name: 'KiCad/Eagle', level: 88 },
      { name: 'Circuit Design', level: 85 },
      { name: 'PCB Layout', level: 82 },
      { name: 'Soldering/Assembly', level: 90 },
    ],
  },
];

export function Skills() {
  return (
    <section className="py-24 px-4 relative">
      {/* PCB traces overlay */}
      <PCBTraces />
      
      {/* Vertical circuit trace */}
      <div className="absolute left-12 top-0 w-0.5 h-32 bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-pulse" />
            <h2 className="text-5xl">
              <span className="text-white/90">Tech </span>
              <span className="text-amber-500">Stack</span>
            </h2>
          </div>
          <p className="text-zinc-500 border-l-2 border-orange-500/30 pl-4">
            Tools and technologies I use to bring projects to life
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const ledColor = {
              amber: 'bg-amber-500 shadow-amber-500/50',
              green: 'bg-green-500 shadow-green-500/50',
              orange: 'bg-orange-500 shadow-orange-500/50',
            };
            
            const textColor = {
              amber: 'text-amber-500',
              green: 'text-green-500',
              orange: 'text-orange-500',
            };
            
            const barColor = {
              amber: 'from-amber-500 to-amber-600',
              green: 'from-green-500 to-green-600',
              orange: 'from-orange-500 to-orange-600',
            };
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="space-y-6 relative"
              >
                {/* Category LED */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-2 h-2 rounded-full ${ledColor[category.color as keyof typeof ledColor]} shadow-lg`} />
                  <h3 className={`text-2xl ${textColor[category.color as keyof typeof textColor]}`}>
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="relative">
                      <div className="flex justify-between mb-2">
                        <span className="text-zinc-300 text-sm">{skill.name}</span>
                        <span className="text-zinc-600 text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.2, 
                            delay: categoryIndex * 0.15 + skillIndex * 0.1,
                            ease: 'easeOut'
                          }}
                          className={`h-full bg-gradient-to-r ${barColor[category.color as keyof typeof barColor]} rounded-full shadow-lg`}
                          style={{
                            boxShadow: `0 0 10px ${category.color === 'amber' ? 'rgba(245, 158, 11, 0.3)' : category.color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}