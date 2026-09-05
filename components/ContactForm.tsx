"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success state after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <motion.div variants={fadeInUp} className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-6 py-4 glass rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:border-[var(--electric-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)]/50 transition-all peer"
          placeholder="Your Name"
        />
        <label
          className="absolute left-6 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--electric-blue)] bg-[var(--color-dark-900)] px-2"
        >
          Your Name
        </label>
      </motion.div>

      {/* Email Input */}
      <motion.div variants={fadeInUp} className="relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-6 py-4 glass rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:border-[var(--electric-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)]/50 transition-all peer"
          placeholder="Your Email"
        />
        <label
          className="absolute left-6 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--electric-blue)] bg-[var(--color-dark-900)] px-2"
        >
          Your Email
        </label>
      </motion.div>

      {/* Message Textarea */}
      <motion.div variants={fadeInUp} className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-6 py-4 glass rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:border-[var(--electric-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)]/50 transition-all peer resize-none"
          placeholder="Your Message"
        />
        <label
          className="absolute left-6 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--electric-blue)] bg-[var(--color-dark-900)] px-2"
        >
          Your Message
        </label>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        variants={fadeInUp}
        type="submit"
        disabled={status === "loading"}
        className="w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, var(--electric-blue), var(--electric-purple))",
        }}
        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
      >
        <span className="relative z-10">
          {status === "loading" ? "Sending..." : "Send Message"}
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-center"
          >
            ✓ Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-center"
          >
            ✗ {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
