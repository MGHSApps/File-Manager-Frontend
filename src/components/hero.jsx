import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-accent font-medium">
          The MGHS
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
            MGHS File Manager
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 mb-3">
            This website serves as your central hub for productivity. 
            You'll find all the video resources necessary to complete your tasks 
            efficiently. It also provides an overview of your required 
            submissions, ensuring you stay on track. Additionally, the platform 
            compiles all your submission links for seamless access and 
            navigation.
        </p>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            To go to the main site, click the button!
        </p>
        <button 
            className="bg-accent text-white font-medium py-2 px-4 rounded transition-all 
                    hover:bg-white hover:border hover:border-accent hover:text-accent 
                    cursor-pointer active:scale-95"
            onClick={() => window.location.href = "https://themghs.com/"}
        >
            Main Website
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/assets/office_pics/office1.jpg",
  },
  {
    id: 2,
    src: "/assets/office_pics/office2.jpeg",
  },
  {
    id: 3,
    src: "/assets/office_pics/office3.jpg",
  },
  {
    id: 4,
    src: "/assets/office_pics/office4.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;