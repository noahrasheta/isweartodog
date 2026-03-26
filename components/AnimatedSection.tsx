'use client';

import { type ReactNode } from "react";
import { motion, type TargetAndTransition } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in seconds */
  delay?: number;
}

const hidden: TargetAndTransition = {
  opacity: 0,
  y: 24,
};

const visible: TargetAndTransition = {
  opacity: 1,
  y: 0,
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
