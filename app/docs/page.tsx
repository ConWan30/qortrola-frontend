"use client"

import { motion } from "framer-motion"
import { SdkCard } from "@/components/docs/sdk-card"
import { Download, Server, BookOpen } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

export default function DocsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Documentation & SDKs</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center">
          Your guide to integrating the Qortrola API and tools for every platform.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SdkCard
          icon={BookOpen}
          title="API Reference (Swagger)"
          description="Interactive API documentation to explore all endpoints."
          link="https://qortrola-api-production.up.railway.app/docs"
        />
        <SdkCard
          icon={Server}
          title="API Reference (ReDoc)"
          description="Alternative, clean documentation view for all endpoints."
          link="https://qortrola-api-production.up.railway.app/redoc"
        />
        <SdkCard
          icon={Download}
          title="Windows SDK"
          description="Download the native SDK for Windows (x64)."
          link="https://qortrola-api-production.up.railway.app/download/sdk/windows"
          isDownload
        />
        <SdkCard
          icon={Download}
          title="macOS SDK"
          description="Download the native SDK for macOS (ARM & Intel)."
          link="https://qortrola-api-production.up.railway.app/download/sdk/mac"
          isDownload
        />
        <SdkCard
          icon={Download}
          title="Linux SDK"
          description="Download the native SDK for Linux (x64)."
          link="https://qortrola-api-production.up.railway.app/download/sdk/linux"
          isDownload
        />
        <SdkCard
          icon={Download}
          title="Unreal Engine Plugin"
          description="Integrate directly with your Unreal Engine project."
          link="https://qortrola-api-production.up.railway.app/download/sdk/unreal"
          isDownload
        />
      </motion.div>
    </div>
  )
}
