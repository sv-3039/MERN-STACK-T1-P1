import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useToast } from '../context/ToastContext';
import './contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { showToast } = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.", 'success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Contact Us" sub="Questions, feedback, or bulk orders — we'd love to hear from you." />

      <section className="section contact-section">
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-info-card">
              <FiMapPin />
              <div>
                <h4>Visit Us</h4>
                <p>Scoop &amp; Co., Lulu Mall, Hyderabad, Telangana 500081</p>
              </div>
            </div>
            <div className="contact-info-card">
              <FiPhone />
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-info-card">
              <FiMail />
              <div>
                <h4>Email Us</h4>
                <p>hello@scoopandco.in</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <label>
              Name
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required value={form.message} onChange={handleChange} placeholder="How can we help?" />
            </label>
            <button type="submit" className="btn btn-primary btn-ripple">
              Send Message <FiSend />
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
