"use client"

import type React from "react"
import { motion, type MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  as?: React.ElementType
  motionProps?: MotionProps
}

export function HolographicCard({
  className,
  children,
  as: Comp = "div",
  motionProps,
  ...props
}: HolographicCardProps) {
  const MotionComp = motion(Comp)

  return (
    <MotionComp
      className={cn(
        "relative rounded-lg p-px overflow-hidden",
        "bg-gradient-to-b from-primary/20 to-secondary/20",
        "transition-all duration-300 ease-in-out",
        className,
      )}
      {...motionProps}
      {...props}
    >
      <div className="relative bg-card/80 backdrop-blur-sm rounded-[7px] h-full w-full p-6">{children}</div>
    </MotionComp>
  )
}
