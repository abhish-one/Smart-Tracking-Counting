const self = module.exports = {
  isInsideArea: function(area, point) {
    const xMin = area.x
    const xMax = area.x + area.w;
    const yMin = area.y
    const yMax = area.y + area.h;
    
    if(point.x >= xMin &&
      point.x <= xMax &&
      point.y >= yMin &&
      point.y <= yMax) {
      return true;
    } else {
      return false;
    }
  },

  isInsideSomeAreas: function(areas, point, idDisplay) {
    const isInside = areas.some((area) => self.isInsideArea(area, point));
    return isInside;
  },

  computeLineBearing: function(x1,y1,x2,y2) {
    var angle = Math.atan((x2-x1)/(y1-y2))/(Math.PI/180)
    if ( angle > 0 ) {
      if (y1 < y2)
        return angle;
      else
        return 180 + angle;
    } else {
      if (x1 < x2)
        return 180 + angle;
      else
        return 360 + angle;
    }
  },

  // Reference: https://jsfiddle.net/justin_c_rounds/Gd2S2/light/ 
  checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) 
    // and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
  }
}
