import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function FloatingBackground() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      const lines = gridRef.current.querySelectorAll(".grid-line")
      
      // Create subtle shine/glow animation for each line
      lines.forEach((line, index) => {
        const tl = gsap.timeline({ repeat: -1 })
        
        // Animate opacity for subtle shine effect
        tl.to(line, {
          opacity: 0.15,
          duration: 2,
          ease: "sine.inOut",
          delay: index * 0.1,
        })
        .to(line, {
          opacity: 0.08,
          duration: 2,
          ease: "sine.inOut",
        })
        .to(line, {
          opacity: 0.12,
          duration: 1.5,
          ease: "sine.inOut",
        })
      })
    }
  }, [])

  // Generate grid lines
  const gridSize = 60 // spacing between lines
  const verticalLines = Math.ceil(2000 / gridSize)
  const horizontalLines = Math.ceil(2000 / gridSize)

  return (
    <div 
      ref={gridRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ 
        background: 'transparent',
      }}
    >
      {/* Vertical lines */}
      {Array.from({ length: verticalLines }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="grid-line absolute top-0 bottom-0 w-px"
          style={{
            left: `${i * gridSize}px`,
            background: 'linear-gradient(to bottom, transparent, #404040, transparent)',
            opacity: 0.15,
            boxShadow: '0 0 1px rgba(64, 64, 64, 0.4)',
          }}
        />
      ))}
      
      {/* Horizontal lines */}
      {Array.from({ length: horizontalLines }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="grid-line absolute left-0 right-0 h-px"
          style={{
            top: `${i * gridSize}px`,
            background: 'linear-gradient(to right, transparent, #404040, transparent)',
            opacity: 0.15,
            boxShadow: '0 0 1px rgba(64, 64, 64, 0.4)',
          }}
        />
      ))}
    </div>
  )
} 