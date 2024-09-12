"use client"

import { ParallaxProvider } from "react-scroll-parallax"

export function ParallaxScrollProvider({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>
}
