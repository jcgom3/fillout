// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx, html}"],
  theme: {
    extend: {
      colors: {
        warning: "#F59D0E", // Orange
        action: "#2F72E2", // Blue
        danger: "#EF494F", // Red
        inactive: "#8C93A1", // Inactive tab text/icon
        disabled: "#C0C0C0", // Disabled border/icon
        strong: "#1A1A1A", // Strong black text
        grayblue: "#677289", // Blue-gray background
        lightborder: "#E1E1E1", // Light border
        highlight: "#9DA4B2", // Opacity needed in inline styles
        purewhite: "#FFFFFF",
        pureblack: "#000000",
      },
    },
  },
  plugins: [],
  safelist: ["z-[9999]", "top-full", "left-0", "overflow-visible"],
};
