// a t^2 + 2b t + c
function smallestQuadraticRootInBounds (a, b, c, isInBounds) {
  function returnIfInBounds (t) {
    return (!isInBounds || isInBounds(t)) ? t : null
  }
  var t
  var D = b * b - a * c // disciminant
  if (D < 0) { // no roots
    return null
  }
  if (D === 0) { // 1 root
    t = -b / a
    if (t >= 0 && t <= 1) { // in bounds
      return returnIfInBounds(t)
    } else { // out of bounds
      return null
    }
  }
  // 2 roots
  var numer
  if (b > 0) {
    numer = -b - Math.sqrt(D)
  } else {
    numer = -b + Math.sqrt(D)
  }
  var t0 = numer / a
  var t1 = c / numer
  var t0_inBounds = t0 >= 0 && t0 <= 1
  var t1_inBounds = t1 >= 0 && t1 <= 1
  if (!t0_inBounds) {
    if (!t1_inBounds) {
      return null
    } else { // t1_inBounds
      return returnIfInBounds(t1)
    }
  } else if (!t1_inBounds) { // t0_inBounds
    return returnIfInBounds(t0)
  }
  // t0_inBounds && t1_inBounds
  t = returnIfInBounds(Math.min(t0, t1))
  if (t !== null) {
    return t
  }
  return returnIfInBounds(Math.max(t0, t1))
}

export var objectVector = {
  lineLineIntersection (a, b) {
    var a_dx = a.q.x - a.p.x
    var a_dy = a.q.y - a.p.y
    var b_dx = b.q.x - b.p.x
    var b_dy = b.q.y - b.p.y

    var denom = a_dx * b_dy - b_dx * a_dy
    if (denom === 0) {
      return null // Collinear
    }
    var denomPositive = denom > 0

    var ab_dx = b.p.x - a.p.x
    var ab_dy = b.p.y - a.p.y
    var s_numer = a_dy * ab_dx - a_dx * ab_dy
    if ((s_numer < 0) === denomPositive) {
      return null // No collision
    }

    var t_numer = b_dy * ab_dx - b_dx * ab_dy
    if ((t_numer < 0) === denomPositive) {
      return null // No collision
    }

    if (((s_numer > denom) === denomPositive) || ((t_numer > denom) === denomPositive)) {
      return null // No collision
    }
    // Collision detected
    var t = t_numer / denom

    return t
  },
  closestPointOnLine (c, l) {
    var dx = l.q.x - l.p.x
    var dy = l.q.y - l.p.y
    var x = c.x - l.p.x
    var y = c.y - l.p.y

    var dot = x * dx + y * dy
    if (dot <= 0) {
      // point is closer to p
      // or p == q
      return l.p
    }

    var lengthSq = dx * dx + dy * dy
    if (dot > lengthSq) {
      // point is closer to q
      return l.q
    }

    // point is closer to line
    var t = dot / lengthSq
    return {
      x: l.p.x + t * dx,
      y: l.p.y + t * dy
    }
  },
  distanceToLine (c, l) {
    return Math.abs(objectVector.signedDistanceToLine(c, l))
  },
  signedDistanceToLine (c, l) {
    var dx = l.q.x - l.p.x
    var dy = l.q.y - l.p.y
    var x = c.x - l.p.x
    var y = c.y - l.p.y

    var dot = x * dx + y * dy
    if (dot <= 0) {
      // point is closer to p
      // or p == q
      return Math.sqrt(x * x + y * y)
    }

    var lengthSq = dx * dx + dy * dy
    if (dot > lengthSq) {
      // point is closer to q
      x = c.x - l.q.x
      y = c.y - l.q.y
      return Math.sqrt(x * x + y * y)
    }

    // point is closer to line
    var cross = x * dy - y * dx
    return cross / Math.sqrt(lengthSq)
  },
  circleLineIntersection (circle, l) {
    var x = l.p.x - circle.x
    var y = l.p.y - circle.y
    var dx = l.q.x - l.p.x
    var dy = l.q.y - l.p.y

    var a = dx * dx + dy * dy // lengthSq
    var b = x * dx + y * dy // dot
    var c = x * x + y * y - circle.r * circle.r // distanceSq - r^2
    return smallestQuadraticRootInBounds(a, b, c)
  },
  pointInsideAABB (c, points) {
    var left = points[0].x
    var right = left
    var top = points[0].y
    var bottom = top
    for (var i = 1; i < points.length; i++) {
      var p = points[i]
      left = Math.min(left, p.x)
      right = Math.max(right, p.x)
      top = Math.min(top, p.y)
      bottom = Math.max(bottom, p.y)
    }
    return left <= c.x && c.x <= right && top <= c.y && c.y <= bottom
  },
  pointInsideHull (c, points) {
    // gift wrapping algo
    var xMin = points[0].x
    var iMin = 0
    for (var i = 1; i < points.length; i++) {
      var p = points[i]
      if (p.x < xMin) {
        xMin = p.x
        iMin = i
      }
    }
    var current = iMin
    do {
      var cx, cy, dx, dy
      var next = (current + 1) % points.length
      var currentPoint = points[current]

      for (var j = 0; j < points.length; j++) {
        cx = points[j].x - currentPoint.x
        cy = points[j].y - currentPoint.y
        dx = points[next].x - currentPoint.x
        dy = points[next].y - currentPoint.y
        if (cx * dy - cy * dx > 0) {
          next = j
        }
      }
      cx = c.x - currentPoint.x
      cy = c.y - currentPoint.y
      dx = points[next].x - currentPoint.x
      dy = points[next].y - currentPoint.y
      if (cx * dy - cy * dx > 0) {
        return false
      }
      current = next
    } while (current !== iMin)
    return true
  },
  pointLineCollision (c, l0, l1) {
    var p0_x = l0.p.x
    var p0_y = l0.p.y
    var q0_x = l0.q.x
    var q0_y = l0.q.y
    var d0_x = q0_x - p0_x
    var d0_y = q0_y - p0_y
    var c_x = c.x - p0_x
    var c_y = c.y - p0_y
    var pd_x = l1.p.x - p0_x
    var pd_y = l1.p.y - p0_y
    var dd_x = (l1.q.x - q0_x) - pd_x
    var dd_y = (l1.q.y - q0_y) - pd_y

    function isInBounds (t) {
      var u_x = c_x - t * pd_x
      var u_y = c_y - t * pd_y
      var v_x = d0_x + t * dd_x
      var v_y = d0_y + t * dd_y

      var udotv = u_x * v_x + u_y * v_y
      var vdotv = v_x * v_x + v_y * v_y
      return vdotv >= udotv && udotv >= 0
    }

    var ma = pd_x * dd_y - pd_y * dd_x // pd x dd
    var mb = pd_x * d0_y - pd_y * d0_x + dd_x * c_y - dd_y * c_x // pd x d0 + dd x c
    var mc = d0_x * c_y - d0_y * c_x // d0 x c

    return smallestQuadraticRootInBounds(ma, mb / 2, mc, isInBounds)
  },
  pointInsideEllipse (c, e) {
    var x = c.x / e.rx
    var y = c.y / e.ry
    return x * x + y * y <= 1
  },
  // MAY FAIL FOR POINTS INSIDE ELLIPSE
  closestPointOnEllipse (c, e, I) {
    I = I || 3 // >= 2 is good enough
    var t = Math.atan2(e.rx * c.y, e.ry * c.x)

    var X = c.x * e.rx
    var Y = c.y * e.ry
    var D = (e.rx * e.rx - e.ry * e.ry)

    for (var i = 0; i < I; i++) {
      // netwon's method: t = t - f(t) / f'(t)
      var cos_t = Math.cos(t)
      var sin_t = Math.sin(t)
      t -= (D * cos_t * sin_t - X * sin_t + Y * cos_t) / (D * (cos_t * cos_t - sin_t * sin_t) - X * cos_t - Y * sin_t)
    }
    return {
      x: e.rx * Math.cos(t),
      y: e.ry * Math.sin(t)
    }
  },
  distanceToEllipse (c, e) {
    var p = objectVector.closestPointOnEllipse(c, e)
    var x = c.x - p.x
    var y = c.y - p.y
    return Math.sqrt(x * x + y * y)
  },
  lineInBox (p1, p2, x1, y1, x2, y2) {
    var p1_L = p1.x < x1
    var p1_R = p1.x > x2
    var p1_T = p1.y < y1
    var p1_B = p1.y > y2
    var p2_L = p2.x < x1
    var p2_R = p2.x > x2
    var p2_T = p2.y < y1
    var p2_B = p2.y > y2

    // both endpoints are totally on one side of the box
    if (p1_L && p2_L || p1_R && p2_R || p1_T && p2_T || p1_B && p2_B) {
      return false;
    }
    // both endpoints are not on one side of the box
    // but between left/right or top/bottom sides
    // or one point inside
    if (
      !p1_L && !p1_R && (!p1_T && !p1_B || !p2_L && !p2_R) ||
      !p2_T && !p2_B && (!p2_L && !p2_R || !p1_T && !p1_B)
    ) {
      return true;
    }

    // TL - BR
    if ((p1_L || p1_B || p2_R || p2_T) && (p1_R || p1_T || p2_L || p2_B)) {
      return lineLineIntersectionCheck(p1.x, p1.y, p2.x, p2.y, x1, y2, x2, y1)
    } else { // TR - BL
      return lineLineIntersectionCheck(p1.x, p1.y, p2.x, p2.y, x1, y1, x2, y2)
    }
  }
}

export function lineLineIntersectionCheck (a_px, a_py, a_qx, a_qy, b_px, b_py, b_qx, b_qy) {
  // adapted from http://stackoverflow.com/a/14795484/2573317
  var a_dx = a_qx - a_px
  var a_dy = a_qy - a_py
  var b_dx = b_qx - b_px
  var b_dy = b_qy - b_py

  var denom = a_dx * b_dy - b_dx * a_dy
  if (denom === 0) {
    return false // Collinear
  }
  var denomPositive = denom > 0

  var ab_dx = b_px - a_px
  var ab_dy = b_py - a_py
  var s_numer = a_dy * ab_dx - a_dx * ab_dy
  if ((s_numer < 0) === denomPositive) {
    return false // No collision
  }

  var t_numer = b_dy * ab_dx - b_dx * ab_dy
  if ((t_numer < 0) === denomPositive) {
    return false // No collision
  }

  if (((s_numer > denom) === denomPositive) || ((t_numer > denom) === denomPositive)) {
    return false // No collision
  }

  return true
}

export function lineLineIntersection (a_px, a_py, a_qx, a_qy, b_px, b_py, b_qx, b_qy) {
  // adapted from http://stackoverflow.com/a/14795484/2573317
  var a_dx = a_qx - a_px
  var a_dy = a_qy - a_py
  var b_dx = b_qx - b_px
  var b_dy = b_qy - b_py

  var denom = a_dx * b_dy - b_dx * a_dy
  if (denom === 0) {
    return null // Collinear
  }
  var denomPositive = denom > 0

  var ab_dx = b_px - a_px
  var ab_dy = b_py - a_py
  var s_numer = a_dy * ab_dx - a_dx * ab_dy
  if ((s_numer < 0) === denomPositive) {
    return null // No collision
  }

  var t_numer = b_dy * ab_dx - b_dx * ab_dy
  if ((t_numer < 0) === denomPositive) {
    return null // No collision
  }

  if (((s_numer > denom) === denomPositive) || ((t_numer > denom) === denomPositive)) {
    return null // No collision
  }
  // Collision detected
  var t = t_numer / denom

  return t
}

export function pointLineDistance (cx, cy, px, py, qx, qy, out) {
  var dx = qx - px
  var dy = qy - py
  var x = cx - px
  var y = cy - py

  var dot = x * dx + y * dy
  if (dot <= 0) {
    // point is closer to p
    // or p == q
    if (out) {
      out.x = px
      out.y = py
    }
    return Math.sqrt(x * x + y * y)
  }

  var lengthSq = dx * dx + dy * dy
  if (dot > lengthSq) {
    // point is closer to q
    if (out) {
      out.x = qx
      out.y = qy
    }
    x = cx - qx
    y = cy - qy
    return Math.sqrt(x * x + y * y)
  }

  // point is closer to line
  if (out) {
    var t = dot / lengthSq
    out.x = px + t * dx
    out.y = py + t * dy
  }
  var cross = x * dy - y * dx
  if (out) {
    // cross > 0 => left side
    // cross < 0 => right side
    // cross == 0 => on the line
    out.side = cross && (cross > 0 ? 1 : -1)
  }
  return Math.sqrt(cross * cross / lengthSq)
}

export function circleLineIntersection (r, cx, cy, px, py, qx, qy, out) {
  var t
  var x = px - cx
  var y = py - cy
  var dx = qx - px
  var dy = qy - py

  // (x + t*dx)^2 + (y + t*dy)^2 = r^2
  // (dx^2 + dy^2)*t^2 + 2*(x*dx + y*dy)*t + (x^2 + y^2 - r^2) = 0
  // a*t^2 + 2*b*t + c = 0
  // t = (-b +- sqrt(b^2 - ac)) / a = c / (-b +- sqrt(b^2 - ac))
  // b > 0 => - ; b < 0 => + (for numerical stability)

  var a = dx * dx + dy * dy // lengthSq
  var b = x * dx + y * dy // dot
  var c = x * x + y * y - r * r // distanceSq - r^2
  var D = b * b - a * c // disciminant
  if (D < 0) { // no intersection
    return null
  }
  if (D === 0) { // tangent
    t = -b / a
    if (t >= 0 && t <= 1) { // in bounds
      if (out) {
        out.x = px + t * dx
        out.y = py + t * dy
      }
      return t
    } else { // out of bounds
      return null
    }
  }
  // two intersections
  var numer
  if (b > 0) {
    numer = -b - Math.sqrt(D)
  } else {
    numer = -b + Math.sqrt(D)
  }
  var t0 = numer / a
  var t1 = c / numer
  var t0_inBounds = t0 >= 0 && t0 <= 1
  var t1_inBounds = t1 >= 0 && t1 <= 1
  if (t0_inBounds) {
    if (t1_inBounds) {
      t = Math.min(t0, t1)
    } else { // !t1_inBounds
      t = t0
    }
  } else if (t1_inBounds) { // !t0_inBounds
    t = t1
  } else {
    return null
  }
  if (out) {
    out.x = px + t * dx
    out.y = py + t * dy
  }
  return t
}

export function pointLineIntersection (x, y, p0_x, p0_y, q0_x, q0_y, pd_x, pd_y, qd_x, qd_y) {
  // c0 = c - p0 ; pd = pd ; d0 = q0 - p0 ; dd = qd - pd
  // 0 = t^2 * (pd x dd) + t * (dd x c0 + d0 x pd) + (c0 x d0)
  var c_x = x - p0_x
  var c_y = y - p0_y
  var d0_x = q0_x - p0_x
  var d0_y = q0_y - p0_y
  var dd_x = qd_x - pd_x
  var dd_y = qd_y - pd_y

  var a = pd_x * dd_y - pd_y * dd_x
  var b = dd_x * c_y - dd_y * c_x + d0_x * pd_y - d0_y * pd_x
  var c = c_x * d0_y - c_y * d0_x
  console.log(a, b, c)
  var D = b * b - a * c // disciminant
  if (D < 0) { // no intersection
    return null
  }
  var t
  if (D === 0) { // tangent
    t = -b / a
    if (t >= 0 && t <= 1) { // in bounds
      return t
    } else { // out of bounds
      return null
    }
  }
  // two intersections
  var numer
  if (b > 0) {
    numer = -b - Math.sqrt(D)
  } else {
    numer = -b + Math.sqrt(D)
  }
  var t0 = numer / a
  var t1 = c / numer
  var t0_inBounds = t0 >= 0 && t0 <= 1
  var t1_inBounds = t1 >= 0 && t1 <= 1
  if (t0_inBounds) {
    if (t1_inBounds) {
      t = Math.min(t0, t1)
    } else { // !t1_inBounds
      t = t0
    }
  } else if (t1_inBounds) { // !t0_inBounds
    t = t1
  } else {
    return null
  }
  return t
}

/*
pd = p1 - p0 ; qd = q1 - q0 ; dd = qd - pd ; d0 = q0 - p0
u(t) = (c - t * pd) ; v(t) = (d0 + t * dd)
0 <= t <= 1
0 <= u . v <= v . v
m = u x v ; n = v . v
distance = (u x v) / sqrt(v . v)
distSq = (u x v)^2 / (v . v)
distSq = m^2 / n

m(t) = u(t) x v(t)
m = 0 => collinear => point-line intersection at t
m = (c - t * pd) x (d0 + t * dd)
m = (pd * t - c) x (dd * t + d0)
m = (pd x dd) * t^2 + (pd x d0 - c x dd) * t + (-c x d0)
m = (pd x dd) * t^2 + (pd x d0 + dd x c) * t + (d0 x c)
ma = pd x dd ; mb = pd x d0 + dd x c ; mc = d0 x c
m = ma * t^2 + mb * t + mc

n(t) = v(t) . v(t)
n = (d0 + t * dd) . (d0 + t * dd)
n = (dd * t + d0) . (dd * t + d0)
n = (dd . dd) * t^2 + 2 * (dd . d0) * t + d0 . d0
na = dd . dd ; nb = 2 * dd . d0 ; nc = d0 . d0
n = na * t^2 + nb * t + nc

m' = 2 * ma * t + mb
n' = 2 * na * t + nb
distSq = m^2 / n
distSq' = m * (2 * n * m' - m * n') / n^2

dist = m / n^0.5
dist' = (n * m' - 0.5 * m * n') / (n^0.5)^3

t_n+1 = t_n - f(t_n) / f'(t_n)
*/
