import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { PCBTraces } from './PCBTraces';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'xander.ras001@gmail.com',
    href: 'mailto:xander.ras001@gmail.com',
    led: 'amber',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+32 474 32 05 33',
    href: 'tel:+32474320533',
    led: 'green',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '9230 Wetteren, Belgium',
    href: '#',
    led: 'orange',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Integrate with email service (EmailJS, Formspree, etc.)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* PCB traces overlay */}
      <PCBTraces />
      
      {/* Circuit decorations */}
      <div className="absolute right-20 top-16 w-0.5 h-24 bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
            <h2 className="text-5xl">
              <span className="text-white/90">Get In </span>
              <span className="text-amber-500">Touch</span>
            </h2>
          </div>
          <p className="text-zinc-500 border-l-2 border-orange-500/30 pl-4">
            Let's build something amazing together
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => {
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
                <Card
                  key={info.label}
                  className="p-6 bg-zinc-950 border-zinc-800 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* LED indicator */}
                  <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${ledColor[info.led as keyof typeof ledColor]} shadow-lg`} />
                  
                  <a href={info.href} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${iconBg[info.led as keyof typeof iconBg]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm mb-1">{info.label}</p>
                      <p className="text-white/90">{info.value}</p>
                    </div>
                  </a>
                </Card>
              );
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Card className="p-8 bg-zinc-950 border-zinc-800 relative overflow-hidden">
              {/* Grid pattern */}
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
              
              {/* LEDs on corners */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500/50 ${
                        errors.name ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500/50 ${
                        errors.email ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    className={`bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500/50 ${
                      errors.subject ? 'border-red-500/50' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className={`bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500/50 resize-none ${
                      errors.message ? 'border-red-500/50' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                    Failed to send message. Please try again or contact me directly via email.
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 pt-8 border-t border-zinc-900 relative"
        >
          {/* Final LED indicators */}
          <div className="flex justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-zinc-600">
            © 2025 Xander Rasschaert. Handcrafted with code and solder.
          </p>
        </motion.div>
      </div>
    </section>
  );
}