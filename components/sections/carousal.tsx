"use client"

import * as React from "react"

const images = [
  { name: "Columbia University", src: "/images/columbia-university.png" },
  { name: "Cornell University", src: "/images/cornell-university.png" },
  { name: "Georgia Tech", src: "/images/georgia-tech.png" },
  { name: "Imperial College London", src: "/images/imperial-college-london.png" },
  { name: "Korea University", src: "/images/korea-university.png" },
  { name: "FAU", src: "/images/neues-fau.png" },
  { name: "Wosong", src: "/images/wosong.png" },
]

export function UniversityCarousel() {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images]

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
              className="flex-shrink-0 mx-4 flex items-center justify-center"
              style={{ minWidth: "200px", height: "120px" }}
            >
              <div className="flex items-center justify-center w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow px-4">
                <img
                  src={image.src}
                  alt={image.name}
                  className="object-contain max-h-20 w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
