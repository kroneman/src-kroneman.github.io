/**
 * Normalize animation frame but give different name to avoid conflict with base
 */
export function requestAnimFrame(callback: FrameRequestCallback) {
  if (typeof window === "undefined") {
    return 0
  }

  return window.requestAnimationFrame(callback);
}

/**
 * Paired with above
 */
export function cancelAnimFrame(handle: number) {
  if (typeof window === "undefined") {
    return () => {}
  }

  return window.cancelAnimationFrame(handle)
}

export function getDevicePixelRatio() {
  if (typeof window === "undefined") {
    return 1;
  }

  return window.devicePixelRatio;
}
