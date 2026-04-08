import React from 'react';

const WavyBackground: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* Waves - 3 layers for depth */}
      <svg
        className="absolute inset-0 w-[200%] h-full opacity-20 animate-wave"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          fill="white"
          d="M0,320L48,336C96,352,192,384,288,389.3C384,395,480,373,576,352C672,331,768,309,864,314.7C960,320,1056,352,1152,362.7C1248,373,1344,363,1392,357.3L1440,352L1440,800L0,800Z"
        />
      </svg>

      <svg
        className="absolute inset-0 w-[200%] h-full opacity-15 animate-wave-slow"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          fill="white"
          d="M0,480L48,458.7C96,437,192,395,288,384C384,373,480,395,576,426.7C672,459,768,501,864,496C960,491,1056,437,1152,416C1248,395,1344,405,1392,410.7L1440,416L1440,800L0,800Z"
        />
      </svg>

      <svg
        className="absolute inset-0 w-[200%] h-full opacity-10 animate-wave-slower"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          fill="white"
          d="M0,400L48,420C96,440,192,480,288,485.3C384,491,480,469,576,448C672,427,768,405,864,410.7C960,416,1056,448,1152,458.7C1248,469,1344,459,1392,453.3L1440,448L1440,800L0,800Z"
        />
      </svg>

      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white/10 blur-xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/5 blur-3xl animate-float" />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
          About Our Team
        </h1>

        <p className="text-xl opacity-90 mb-3 animate-fade-in">
          We craft digital experiences with passion.
        </p>

        <p className="text-lg opacity-80 mb-3 animate-fade-in delay-200">
          Our mission is building modern scalable products.
        </p>

        <p className="text-base opacity-70 max-w-md animate-fade-in delay-400">
          Innovation, creativity, and technology drive everything we do.
        </p>
      </div>
    </div>
  );
};

export default WavyBackground;
