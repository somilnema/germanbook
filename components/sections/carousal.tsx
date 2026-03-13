"use client"

import { useState, useMemo, useEffect } from "react"

export function UniversityCarousel() {
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const universities = [
    { name: "DIT", logo: "/images/DIT.png" },
   
    { name: "RWTH Aachen", logo: "/images/rwth-aachen.png" },
    { name: "TU Berlin", logo: "/images/tu-berlin.svg" },
    { name: "TUHH Hamburg", logo: "/images/tuhh-hamburg.png" },
    { name: "University of Bonn", logo: "/images/university-of-bonn.png" },
        { name: "luh", logo: "/images/luh_logo.svg" },
    { name: "TU", logo: "/images/tu_braunschweig_logo.svg" },
    
    { name: "tud", logo: "/images/tudlogo.svg" },
  ]

  // Memoize the duplicated panel for better performance
  const duplicatedPanel = useMemo(() => {
    return [...universities, ...universities, ...universities, ...universities]
  }, [universities])

  // Get responsive dimensions
  const getDimensions = () => {
    switch (screenSize) {
      case 'mobile':
        return { width: 100, height: 80, gap: 2 }
      case 'tablet':
        return { width: 140, height: 110, gap: 3 }
      default:
        return { width: 160, height: 120, gap: 4 }
    }
  }

  const dimensions = getDimensions()

  return (
    <section className="py-6 md:py-8 overflow-hidden w-full">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center">
          Top Global Universities <span className="text-primary">Cracked</span>
        </h2>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setHoveredPanel(0)}
        onMouseLeave={() => setHoveredPanel(null)}
      >
        <div
          className={`flex items-center animate-scroll-left ${
            hoveredPanel === 0 ? "animation-paused" : ""
          }`}
          style={{
            width: `${duplicatedPanel.length * dimensions.width}px`,
            gap: `${dimensions.gap * 0.25}rem`,
          }}
        >
          {duplicatedPanel.map((university, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-shrink-0 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                padding: `${dimensions.gap * 0.25}rem`,
              }}
            >
              <img
                src={university.logo || "/placeholder.svg"}
                alt={`${university.name} logo`}
                className="w-auto object-contain transition-all duration-300 hover:scale-105"
                style={{ height: `${dimensions.height * 0.6}px` }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
