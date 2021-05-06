const themeColors = (canvas) => {
  let bar = canvas.getContext("2d");
  let theme_g1 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g1.addColorStop(0, "#0b7d76");
  theme_g1.addColorStop(1, "#0b7d76");
  let theme_g2 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g2.addColorStop(0, "#122066");
  theme_g2.addColorStop(1, "#122066");

  let theme_g3 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g3.addColorStop(0, "#ffba57");
  theme_g3.addColorStop(1, "#ffba57");

  let theme_g4 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g4.addColorStop(0, "#e16e35");
  theme_g4.addColorStop(1, "#e16e35");

  
  let theme_g5 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g5.addColorStop(0, "#1dbfbf");
  theme_g5.addColorStop(1, "#1dbfbf");

  
  let theme_g6 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g6.addColorStop(0, "#3e2c76");
  theme_g6.addColorStop(1, "#3e2c76");
  
  
  let theme_g7 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g7.addColorStop(0, "#333333");
  theme_g7.addColorStop(1, "#333333");

  
  let theme_g8 = bar.createLinearGradient(0, 300, 0, 0);
  theme_g8.addColorStop(0, "#ff3333");
  theme_g8.addColorStop(1, "#ff3333");


  let themes = [];
  themes.push(theme_g1);
  themes.push(theme_g2);
  themes.push(theme_g3);
  themes.push(theme_g4);
  themes.push(theme_g5);
  themes.push(theme_g6);
  themes.push(theme_g7);
  themes.push(theme_g8);

  return {
    themes,
  };
};

export default themeColors;
