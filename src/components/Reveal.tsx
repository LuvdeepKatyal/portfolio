import { useReveal } from "../hooks/useReveal";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
};

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: RevealProps) {
  const [ref, visible] = useReveal();
  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}
