const backgroundColorMain = "#5603ad";
const backgroundColorSecondary = "#ccfbfe";
window.onload = () => {
  Particles.init({
    selector: ".background",
    color: [backgroundColorMain, backgroundColorSecondary],
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
          color: [backgroundColorMain, backgroundColorSecondary],
        },
      },
      {
        breakpoint: 300,
        options: {
          maxParticles: 25,
          color: [backgroundColorMain, backgroundColorSecondary],
        },
      },
    ],
  });
};
