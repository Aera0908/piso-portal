import React, { useState, useEffect } from "react";

export default function Banner() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from the JSON file
  useEffect(() => {
    fetch("/bannerImages.json")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching banner images:", error));
  }, []);

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        images.length > 0 ? (prevIndex + 1) % images.length : 0
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 flex items-center justify-center bg-gray-200">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
      {/* Slideshow Images */}
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`absolute w-full h-full object-contain transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
