function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hsl2PerceivedLuminance(h, s, l) {
  rgb = hslToRgb(h, s, l);
  return (rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722) / 255;
}

const root = document.documentElement;
var styles = getComputedStyle(document.body);

let h = styles.getPropertyValue("--colorPrimary-h"),
  s = styles.getPropertyValue("--colorPrimary-s").slice(0, -1) / 100,
  l = styles.getPropertyValue("--colorPrimary-l").slice(0, -1) / 100;

luminance = hsl2PerceivedLuminance(h, s, l);
root.style.setProperty("--perceived-luminance", luminance);

if (luminance > 0.4 && luminance < 0.6) {
  console.log(`original: ${luminance}`);
  let dark_step =
      styles.getPropertyValue("--darken-percent").slice(0, -1) / 100,
    light_step =
      styles.getPropertyValue("--lighten-percent").slice(0, -1) / 100,
    sat_step = styles.getPropertyValue("--sat-percent").slice(0, -1) / 100;

  dark_lum = hsl2PerceivedLuminance(h, s, l + dark_step);
  light_lum = hsl2PerceivedLuminance(h, s, l + light_step);
  sat_lum = hsl2PerceivedLuminance(h, s + sat_step, l);
  unsat_lum = hsl2PerceivedLuminance(h, s - sat_step, l);
  dark_sat_lum = hsl2PerceivedLuminance(h, s + sat_step, l + dark_step);

  console.log(`darker: ${dark_lum} | lighter: ${light_lum}`);
  console.log(`sat: ${sat_lum} | unsat: ${unsat_lum}`);
  console.log(dark_sat_lum);

  root.style.setProperty(
    "--perceived-luminance-lighter",
    Math.max(light_lum, unsat_lum)
  );
  root.style.setProperty(
    "--perceived-luminance-darker",
    Math.min(dark_lum, sat_lum)
  );
}
