import React, { useState } from 'react';

export default function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
                className="luxury-text text-6xl md:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 hover:from-yellow-300 hover:via-amber-100 hover:to-yellow-300 transition-all duration-500 cursor-pointer"
              >
                {service.title}
                {hoveredIndex === index && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="hover-image w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-2xl"
                    style={{
                      left: `${service.title.length * 0.6}em`,
                      animation: 'slideIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
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
            left: ${hoveredIndex !== null ? `${services[hoveredIndex].title.length * 0.6}em` : '0'};
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}