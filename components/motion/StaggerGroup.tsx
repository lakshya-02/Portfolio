"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
