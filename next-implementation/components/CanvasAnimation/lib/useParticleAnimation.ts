import { throttle, isInViewport, getScreenSize } from '../../../utils';

import Particle, { colorPalette } from './Particle';
import {useRef} from "react";
import { requestAnimFrame, cancelAnimFrame } from "./animation";

interface IScreenSize {
  width: number;
  height: number;
}

interface UseParticleAnimationProps {
  particleNumber?: number;
  canvasRef: any // fix this later
}

interface RGBColor {
  r: number,
  g: number,
  b: number
}

function useParticleAnimation(props: UseParticleAnimationProps) {
  const { particleNumber = 150, canvasRef } = props;

  // Using refs so updating them doesn't cause a re-render
  const canvas = canvasRef;
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particleAnimationStarted = useRef(false);
  const particleAnimationFrameRef = useRef<number>();
  const timeStamp = useRef<null | number>(null);
  const particleArray = useRef<Particle[]>([]);
  const screenSize = useRef<IScreenSize | null>(null);
  const canvasOpacity = useRef<number>(0);


  const particleAnimationDrawBackground = (color: RGBColor) => {
    if(!context.current) {
      return;
    }

    context.current.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    context.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }

  const createParticles = (amount = 0, x?: number, y?: number) => {
    let numParticles = amount;
    while (numParticles > 0) {
      particleArray.current.push(
        new Particle(canvas.current, x, y),
      );
      numParticles -= 1;
    }

    particleArray.current.forEach(
      (p) => p.draw(context.current),
    );
  };

  const setParticleCanvasBounds = () => {
    const newScreenSize = getScreenSize(true) as IScreenSize;
    const oldScreenSize = screenSize.current;

    // mobile devices trigger resize when scrolling and address bar shows / hides
    if (oldScreenSize && (oldScreenSize.width === newScreenSize.width)) {
      return;
    }


    requestAnimFrame(() => {
      screenSize.current = newScreenSize;

      const { width, height } = getScreenSize(true) as IScreenSize;
      canvas.current.style.width = `${width}px`;
      canvas.current.style.height = `${height}px`;
      canvas.current.width = width;
      canvas.current.height = height;
      if (particleArray.current.length) {
        particleArray.current = particleArray.current.map((p: Particle) => p.onResize(canvas.current));
      }
    });
  }

  const particleAnimationFrame = () => {
    if (!timeStamp.current) {
      return requestAnimFrame(particleAnimationFrame);
    }

    if (Date.now() < (timeStamp.current + Math.floor(1000 / 15))) {
      return requestAnimFrame(particleAnimationFrame);
    }


    particleAnimationDrawBackground(colorPalette.bg);
    particleArray.current = particleArray.current.map((p) => p.updatePath());

    particleArray.current.forEach((p) => p.draw(context.current));

    timeStamp.current = Date.now();
    return requestAnimFrame(particleAnimationFrame);
  }

  const scrollHandler = throttle(function onScroll() {
    if (particleAnimationStarted.current) {
      window.removeEventListener('scroll', scrollHandler);
      return;
    }

    if (!isInViewport(canvas.current, 1000)) {
      return;
    }

    particleAnimationStarted.current = true;
    setParticleCanvasBounds();

    if(particleAnimationFrameRef.current) {
      cancelAnimFrame(particleAnimationFrameRef.current);
    }

    particleAnimationFrameRef.current = particleAnimationFrame();
    createParticles(particleNumber);
  }, 100)

  const init = (callback: () => void) => {
    if(!canvasRef.current) {
      return;
    }

    context.current = canvasRef.current.getContext('2d');
    timeStamp.current = Date.now();
    canvasOpacity.current = 1;
    particleAnimationFrameRef.current = particleAnimationFrame();
    createParticles(particleNumber);

    window.addEventListener('resize', setParticleCanvasBounds);
    window.addEventListener('scroll', scrollHandler);
    callback();
  }

  const cleanup = () => {
    window.removeEventListener('resize', setParticleCanvasBounds);
    window.removeEventListener('scroll', scrollHandler);

    if(particleAnimationFrameRef.current) {
      cancelAnimFrame(particleAnimationFrameRef.current);
    }
  };

  const stop = () => {
    if(particleAnimationFrameRef.current) {
      cancelAnimFrame(particleAnimationFrameRef.current);
    }
  }

  return {
    init,
    stop,
    cleanup,
    canvas,
    context,
    particleAnimationStarted,
    particleAnimationFrameRef,
    timeStamp,
    particleArray,
    screenSize,
    canvasOpacity
  }
}

export default useParticleAnimation;
