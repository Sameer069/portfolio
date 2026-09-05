"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setTimeout(() => setLineHeight(height), 100);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Vertical line: On mobile pinned to left-4 sm:left-6, on desktop centered at left-1/2 */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 w-0.5 h-full bg-white/10 -translate-x-1/2 pointer-events-none">
        {/* Animated line draw */}
        <motion.div
          className="w-full origin-top"
          style={{
            background: "linear-gradient(180deg, var(--accent-pink), var(--electric-purple))",
          }}
          initial={{ height: 0 }}
          animate={isInView ? { height: lineHeight } : { height: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* Timeline items list */}
      <div className="space-y-10 sm:space-y-14 md:space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start md:items-center ${
                isLeft ? "justify-start md:justify-start" : "justify-start md:justify-end"
              }`}
            >
              {/* Content Card Container
                  - Mobile: takes full width with pl-12 sm:pl-16 so it never touches or overlaps the left-4/left-6 line!
                  - Desktop: takes 5/12 width and alternates left and right of the center line
              */}
              <div
                className={`w-full md:w-5/12 pl-12 sm:pl-16 md:pl-0 ${
                  isLeft
                    ? "md:mr-auto md:text-right md:pr-12 lg:pr-16"
                    : "md:ml-auto md:text-left md:pl-12 lg:pl-16"
                }`}
              >
                <motion.div
                  className="glass p-5 sm:p-6 lg:p-7 rounded-2xl border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,31,143,0.3)] transition-all duration-300 relative group"
                  whileHover={{ y: -4 }}
                >
                  {/* Subtle top gradient accent */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-pink)]/40 to-transparent" />

                  {/* Year badge */}
                  <div
                    className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-white mb-3 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                    }}
                  >
                    {item.year}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--accent-pink)] transition-all">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base gradient-text font-semibold mb-2.5">
                    {item.organization}
                  </p>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Timeline Connector Dot
                  - Mobile: sits at left-4 sm:left-6 -translate-x-1/2 (directly on top of the left vertical line)
                  - Desktop: sits at md:left-1/2 -translate-x-1/2 (directly on top of the center vertical line)
                  - top-6 anchors the dot to the header of the card cleanly
              */}
              <motion.div
                className="absolute left-4 sm:left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-[var(--color-dark-900)] z-10 flex items-center justify-center pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Glowing Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                  }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
