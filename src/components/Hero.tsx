import { Button } from './ui/button';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEDMatrix } from './LEDMatrix';
import { PCBTraces } from './PCBTraces';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      {/* PCB traces background */}
      <PCBTraces />
      
      {/* LED indicators */}
      <div className="absolute top-8 right-8 flex gap-3">
        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 relative"
          >
            {/* Circuit trace decoration */}
            <div className="absolute -left-8 top-1/2 w-2 h-32 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                <p className="text-amber-500/80 tracking-wider uppercase text-sm">System Online</p>
              </div>
              
              {/* LED Matrix Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <LEDMatrix text="XANDER" color="amber" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl">
                <span className="text-amber-500">Rasschaert</span>
              </h1>
            </div>
            
            <div className="border-l-2 border-amber-500/30 pl-4">
              <p className="text-zinc-400 text-lg">
                Web & App Developer • IoT Engineer • PCB Designer
              </p>
              <p className="text-zinc-500 mt-2">
                Building the bridge between hardware and software, one circuit at a time.
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/20"
                asChild
              >
                <a href="/assets/documents/CV-XanderRasschaert.pdf" download>
                  Download CV
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                asChild
              >
                <a href="#contact">
                  Let's Connect
                </a>
              </Button>
            </div>
            
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/Xanderras" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded blur group-hover:bg-amber-500/30 transition-colors" />
                <div className="relative text-zinc-400 hover:text-amber-500 transition-colors p-2">
                  <Github className="w-5 h-5" />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/xander-rasschaert-06673223a/" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded blur group-hover:bg-amber-500/30 transition-colors" />
                <div className="relative text-zinc-400 hover:text-amber-500 transition-colors p-2">
                  <Linkedin className="w-5 h-5" />
                </div>
              </a>
              <a href="#contact" className="group relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded blur group-hover:bg-amber-500/30 transition-colors" />
                <div className="relative text-zinc-400 hover:text-amber-500 transition-colors p-2">
                  <Mail className="w-5 h-5" />
                </div>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
          >
            {/* Corner LEDs */}
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" style={{ animationDelay: '0.3s' }} />
            
            <div className="relative">
              <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full" style={{ transform: 'scale(1.05)' }} />
              <div className="absolute inset-0 border border-green-500/20 rounded-full" style={{ transform: 'scale(1.1)' }} />
              
              <img
                src="/assets/images/profile.jpg"
                alt="Xander Rasschaert"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-zinc-900 shadow-2xl"
              />
              
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-0.5 h-16 bg-gradient-to-b from-amber-500/50 to-transparent" />
        <ChevronDown className="w-6 h-6 text-amber-500/50 animate-bounce" />
      </motion.div>
    </section>
  );
}