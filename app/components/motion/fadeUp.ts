import type { Variants } from "motion/react";

// Blur-and-rise entrance shared by the hero and the /qr link page.
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};
