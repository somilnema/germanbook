"use client"

import * as React from "react"

const images = [
  { name: "DIT", src: "/images/DIT.png" },
  { name: "Imperial College London", src: "/images/imperial-college-london.png" },
  { name: "RWTH Aachen", src: "/images/rwth-aachen.png" },
  { name: "TU Berlin", src: "/images/tu-berlin.svg" },
  { name: "TUHH Hamburg", src: "/images/tuhh-hamburg.png" },
  { name: "University of Bonn", src: "/images/university-of-bonn.png" },
]

export function UniversityCarousel() {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images, ...images]

  return (
    <section className="py-6 md:py-8 bg-secondary/50 overflow-hidden w-full">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center">
          Top Global Universities <span className="text-primary">Cracked</span>
        </h2>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex university-scroll">
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-1 sm:mx-2 md:mx-3 flex items-center justify-center h-[80px] sm:h-[100px] md:h-[110px] lg:h-[120px] min-w-[80px] sm:min-w-[110px] md:min-w-[140px] lg:min-w-[160px]"
            >
              <div className="flex items-center justify-center w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow px-2 sm:px-3 md:px-4">
                <img
                  src={image.src}
                  alt={image.name}
                  className="object-contain max-h-12 sm:max-h-16 md:max-h-20 lg:max-h-24 w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
