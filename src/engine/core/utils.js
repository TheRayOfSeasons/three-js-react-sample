export const CustomMath = {
  radiansToDegrees: angle => {
    return angle * Math.PI / 180
  },
  lerp: (a, b, t) => {
    return ((1 - t) * a + t * b);
  },
  clamp: (value, min, max) => {
    if(value < min)
      return min;
    else if(value > max)
      return max;
    return value;
  }
}
