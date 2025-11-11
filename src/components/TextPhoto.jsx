import React, { useRef, useState } from 'react'  // ✅ Correct

const TextPhoto = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const textRefs = useRef([]);

    const services = [
        {
            title: "Social Media",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop"
        },
        {
            title: "frontend Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop"
        },
        {
            title: "Graphic Designer",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop"
        },
        {
            title: "UI/UX Developer",
            image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=400&fit=crop"
        }
    ];


   const getMaxPosition = (textLength, index) => {
  const basePosition = textLength * 0.6; // Text ke end tak position
  const imageWidth = window.innerWidth > 768 ? 384 : 128; // Image width in px (w-96 = 384px, w-32 = 128px)
  const screenWidth = window.innerWidth;
  const textElement = textRefs.current[index];
  
  if (textElement) {
    const textRect = textElement.getBoundingClientRect();
    const textLeft = textRect.left;
    const calculatedImagePosition = textLeft + (basePosition * 16); // 16px = 1em
    
    // Check agar image screen se bahar ja rahi hai
    if (calculatedImagePosition + imageWidth > screenWidth - 50) {
      // Screen se 50px pehle rok do
      return (screenWidth - textLeft - imageWidth - 50) / 16;
    }
  }
  
  return basePosition; // Normal case - text ke end tak jaye
};

    return (
        <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
            <style>{`
           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
           
           .luxury-text {
             font-family: 'Playfair Display', serif;
             letter-spacing: 0.05em;
             position: relative;
             display: inline-block;
           }
           
           .hover-image {
             position: absolute;
             top: 50%;
             left: 0;
             transform: translateY(-50%);
             opacity: 0;
             transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
             pointer-events: none;
              z-index: 10;
           }
           
           .service-item:hover .hover-image {
             opacity: 1;
           }
           
           .service-item {
             position: relative;
           }
         `}</style>

            <div className="space-y-8 px-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-item relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="relative inline-block">
                            <h2
                                ref={el => textRefs.current[index] = el}
                                className="luxury-text text-6xl md:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 hover:from-yellow-300 hover:via-amber-100 hover:to-yellow-300 transition-all duration-500 cursor-pointer"
                            >
                                {service.title}
                                {hoveredIndex === index && (
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="hover-image w-32 h-32 md:w-96 md:h-96 object-cover rounded-lg shadow-2xl"
                                        style={{
                                            left: `${getMaxPosition(service.title.length, index)}em`,
                                            animation: `slideIn ${service.title.length * 0.12}s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                                        }}
                                    />
                                )}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
           @keyframes slideIn {
  from {
    left: 0;
    opacity: 0;
  }
  to {
    left: ${hoveredIndex !== null ? `${getMaxPosition(services[hoveredIndex].title.length, hoveredIndex)}em` : '0'};  // ← YE LINE CHANGE KARO
    opacity: 1;
  }
}
         `}</style>
        </div>
    );
}

export default TextPhoto