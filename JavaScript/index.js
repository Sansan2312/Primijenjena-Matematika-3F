window.onload = () => {
  Particles.init({
    selector: ".background",
    color: ["#1F1C2C", "#928DAB"],
    connectParticles: true,
    maxParticles: 200,
    sizeVariations: 1,
    speed: 0.2,
    minDistance: 170,
    responsive: [
      {
        breakpoint: 800,
        options: {
          maxParticles: 100,
          color: ["#1F1C2C", "#928DAB"],
        },
      },
      {
        breakpoint: 300,
        options: {
          maxParticles: 25,
          color: ["#1F1C2C", "#928DAB"],
        },
      },
    ],
  });
};
