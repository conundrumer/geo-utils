function makeDragHandler (moveEvent, endEvent, handleEvent) {
  return (e, {down, move, up}) => {
    handleEvent(e, down)
    let handleMove = (e) => {
      handleEvent(e, move)
    }
    let handleUp = (e) => {
      handleEvent(e, up)
      window.removeEventListener(moveEvent, handleMove)
      window.removeEventListener(endEvent, handleUp)
    }
    window.addEventListener(moveEvent, handleMove)
    window.addEventListener(endEvent, handleUp)
  }
}

let handleMouseDrag = makeDragHandler('mousemove', 'mouseup', (e, handler) => {
  e.preventDefault()
  if (handler) handler(e.x, e.y)
})

let handleTouchDrag = makeDragHandler('touchmove', 'touchend', (e, handler) => {
  e.preventDefault()
  if (handler) handler(e.touches[0].x, e.touches[0].y)
})

export {
  handleMouseDrag,
  handleTouchDrag
}
