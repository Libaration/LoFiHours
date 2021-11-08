export const randomBackground = () => {
  const backgrounds = [
    'https://imgur.com/Mwfucup.jpg',
    'https://i.pinimg.com/originals/1f/bc/50/1fbc503ab461f2dca56e44392c907c1e.gif',
    'https://68.media.tumblr.com/4719fff8e45bc1d6efbc6247404660c9/tumblr_or579kL3iC1ur4m9eo1_1280.gif',
    'https://assets1.ello.co/uploads/asset/attachment/6077368/ello-optimized-a7ee6d77.gif',
    'https://c.tenor.com/GXD2LfOXzI8AAAAd/tom-and-jerry-sad.gif',
    'https://cdnb.artstation.com/p/assets/images/images/019/036/175/original/jatzu-lam-bridge01062019010.gif?1561725331',
    'https://i.imgur.com/bIk8Yw7.gif',
    'https://images.prismic.io/riff-raff-films%2F2ed7bba8-ddd4-4912-949d-7349145dc90a_orange1.gif?auto=compress,format&rect=315,0,544,544&w=1200&h=1200',
    'https://cutewallpaper.org/21/rain-background-gif/Rain-With-Black-Background-GIF.gif',
  ];
  const randomNumber = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomNumber];
};
