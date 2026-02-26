import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mgoldnye");

  return (
    <section id="contact" className="py-24 relative">
      <div className="watermark-text top-20 right-0">CONTACT</div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind or just want to say hello? I'd love to hear from you.
              Let's create something amazing together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">robertthomaskariankal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+1 (234) 567-8901</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Pala, Kottayam, Kerala</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: Github, link: "https://github.com/RobertThomasKariankal" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/robertthomaskariankal/" },
                { icon: Twitter, link: "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-xl hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism-heavy p-10 space-y-8 border-white/10"
          >
            {state.succeeded ? (
              <div className="text-center space-y-2">
                <p className="text-xl font-bold">Message sent ✅</p>
                <p className="text-muted-foreground">
                  Thanks! I’ll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-primary">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="clay-morphism w-full px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-primary">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="clay-morphism w-full px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-primary">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    className="clay-morphism w-full px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    className="clay-morphism w-full px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="clay-morphism-primary w-full py-5 font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-6 h-6" />
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;