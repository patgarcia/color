function rgbaString(color, alpha = 0.6) {
  return `rgba(${Math.floor(color.r)}, ${Math.floor(color.g)}, ${Math.floor(
    color.b
  )}, ${alpha})`;
}

function hslToRgb(h, s = 100, l = 50) {
  // Convert HSL values to 0-1 range
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    // If saturation is 0, the color is achromatic (gray)
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Scale RGB values to 0-255 range and round them
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let band = 0;

for(let h=0; h < 360; h++){
  band = 0;
  for(let l=0; l < 100; l++){
    const color = rgbaString(hslToRgb(h, 100, l), 1)
    console.log({color})
    ctx.fillStyle = color;
    ctx.fillRect(h*10, l*10 + band * 10, 10, 10);
    if(l === 50){
      while(band < 50){
        band++;
        ctx.fillRect(h*10, l*10 + band * 10, 10, 10);
      }
    }
  }
}


