module.exports = {
  responsive: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: -20,
          max: 20
        },
      },
    ],
    xAxes: [
      {
        type: "time",
      },
    ],
  },

  plugins: {
    zoom: {
      // Container for pan options
      pan: {
        // Boolean to enable panning
        enabled: true,
      },
      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Enable drag-to-zoom behavior
        drag: false,
        mode: "x",

        // Speed of zoom via mouse wheel
        // (percentage of zoom on a wheel event)
        speed: 0.1,

        // Minimal zoom distance required before actually applying zoom
        threshold: 1,

        // On category scale, minimal zoom level before actually applying zoom
        sensitivity: 1,
      },
    },
  },
};
