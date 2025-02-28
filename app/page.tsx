"use client";

import { motion } from "framer-motion";
import FramesFormModal from "./components/frames-form-modal";
import { MathPatterns } from "./components/math-patterns";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <MathPatterns />

      {/* Animated background elements */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -180, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-[120px]"
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 fixed top-0 w-full shadow-md z-50">
        <div className="text-sm font-semibold flex items-center">
          <span className="text-pink-400 text-xl">🏗️</span>
          <span className="ml-2 text-lg">Slope Deflection Calculator</span>
        </div>
        <a href="/beam" className="text-white hover:text-pink-400 text-sm">
          Frame Calculator
        </a>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <section className="flex flex-col items-center text-center mt-20">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
            CEG 410 - Slope Deflection Calculator
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
          A powerful tool for structural engineers to analyze frames using the slope deflection method. <br />
          Accurately calculate frame displacements, internal moments, and support reactions, streamlining the analysis of statically indeterminate frames for efficient and precise results.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            {/* <a
              href="/beam"
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg text-lg"
            >
              Beams →
            </a> */}

            {/* "Get Started" Button for Modal */}
            <FramesFormModal />
          </div>
        </section>

        {/* Feature Section */}
        <section className="mt-10 flex justify-center items-center gap-x-8 px-10">
          {[
            {
              icon: "📐",
              title: "Advanced Frame Analysis",
              desc: "Solve statically indeterminate frames using the slope deflection method for precise calculations.",
            },
            {
              icon: "📊",
              title: "Detailed Structural Insights",
              desc: "Compute rotations, fixed-end moments, shear forces, and bending moments. Analyze vertical and horizontal forces, and apply shear equations for accurate structural assessments.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg text-center w-80 border border-gray-700 hover:border-pink-400/50 transition-all"
            >
              <span className="text-blue-400 text-3xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
