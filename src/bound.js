export function pointInBox (x, y, width, height, centered) {
  let left = 0
  let right = width
  let top = 0
  let bottom = height
  if (centered) {
    left = -width / 2
    right = width / 2
    top = -height / 2
    bottom = height / 2
  }
  return {
    x: Math.max(left, Math.min(right, x)),
    y: Math.max(top, Math.min(bottom, y))
  }
}

export function aabb (points) {
  let left = points[0].x
  let right = left
  let top = points[0].y
  let bottom = top
  for (let {x, y} of points) {
    left = Math.min(left, x)
    right = Math.max(right, x)
    top = Math.min(top, y)
    bottom = Math.max(bottom, y)
  }
  return {left, top, width: right - left, height: bottom - top}
}

// returns a delta
export function aabbInBox ({x, y}, aabb, width, height, centered) {
  let cx = aabb.left + aabb.width / 2
  let cy = aabb.top + aabb.height / 2
  x += cx
  y += cy
  width -= aabb.width
  height -= aabb.height

  let point = pointInBox(x, y, width, height, centered)

  point.x -= cx
  point.y -= cy
  return point
}
