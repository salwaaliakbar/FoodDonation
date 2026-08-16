import { motion } from "framer-motion";

function AnimatedSection({ children, className = "", delay = 0, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}

export default AnimatedSection;
