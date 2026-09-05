"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsVisualizationProps {
  skills: Skill[];
}

export default function SkillsVisualization({ skills }: SkillsVisualizationProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={fadeInUp}
          className="group"
        >
          {/* Skill name and percentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-white">{skill.name}</span>
            <span className="text-sm text-gray-400">{skill.level}%</span>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            {/* Animated fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--electric-blue), var(--electric-purple))",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
            />

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(90deg, var(--electric-blue), var(--electric-purple))",
                filter: "blur(8px)",
              }}
            />
          </div>

          {/* Category tag */}
          <div className="mt-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {skill.category}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
