"use client"

interface OverlappingCirclesProps {
  data: Array<{
    label: string
    value: number
    color: string
    size: "small" | "medium" | "large"
    position: {
      x: number
      y: number
      z: number
    }
  }>
}

export default function OverlappingCircles({ data }: OverlappingCirclesProps) {
  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "w-20 h-20 text-sm"
      case "medium":
        return "w-24 h-24 text-base"
      case "large":
        return "w-32 h-32 text-xl"
      default:
        return "w-24 h-24 text-base"
    }
  }

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute ${getSizeClass(item.size)} ${item.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
          style={{
            transform: `translate(${item.position.x}px, ${item.position.y}px)`,
            zIndex: item.position.z,
          }}
        >
          <div className="text-center">
            <div className="font-bold">{item.value}</div>
            <div className="text-xs opacity-90">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
