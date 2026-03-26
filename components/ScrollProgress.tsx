'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#818CF8", "#C9A84C", "#C9A84C"]
  );

  return (
    <motion.div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ scaleX, transformOrigin: '0%', backgroundColor }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
    />
  );
}
