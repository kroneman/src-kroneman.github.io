import {useRef} from "react";
import {debounce, getScreenSize} from "../../../utils";
import {cancelAnimFrame, requestAnimFrame, getDevicePixelRatio} from "./animation";

interface IScreenSize {
  width: number;
  height: number;
}

type UseCircleAnimationProps = {
  canvasRef: any
}

function useCircleAnimation(props: UseCircleAnimationProps) {
  const {canvasRef} = props;

  // Refs
  const canvas = canvasRef;
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const screenSize = useRef<IScreenSize | undefined>();
  const deviceRatio = useRef<number>();
  const canvasOpacity = useRef(0);
  const circleAnimationRef = useRef<number>();
  const circleAnimationRadius = useRef(0);

  const getCircleCenter = () => {
    const {width, height} = screenSize.current as IScreenSize;
    return {
      x: width / 2,
      y: height / 2,
    };
  }

  const createCircle = () => {
    if (!context.current) {
      return;
    }

    const {x, y} = getCircleCenter();
    circleAnimationRadius.current += 20;
    const radius = circleAnimationRadius.current;
    const startAngle = Math.PI * Math.random();
    const endAngle = Math.PI * Math.random() * 2;

    context.current.beginPath();
    context.current.arc(
      x,
      y,
      radius,
      startAngle,
      endAngle,
    );

    const lineOpacity = Math.random();
    const lineWidth = Math.floor(Math.random() * 20 + 4);
    context.current.strokeStyle = `rgba(0, 0, 0, ${lineOpacity})`;
    context.current.lineWidth = lineWidth;

    context.current.stroke();
    drawCircle();
  }

  const drawCircle = () => {
    const minDimension = canvas.current.height;
    const isRunning = circleAnimationRadius.current < (minDimension / window.devicePixelRatio);

    if (isRunning) {
      circleAnimationRef.current = requestAnimFrame(createCircle);
    } else {
      if (circleAnimationRef.current) {
        cancelAnimFrame(circleAnimationRef.current);
      }

      circleAnimationRef.current = undefined;
      canvasOpacity.current = 0.1;
    }
  }

  const setCircleCanvasBounds = () => {
    if (!screenSize.current) {
      return;
    }

    const {width, height} = screenSize.current;
    requestAnimFrame(() => {
      canvas.current.style.width = `${width}px`;
      canvas.current.style.height = `${height}px`;
      canvas.current.width = width;
      canvas.current.height = height;
    });
  }

  const onResize = debounce(function onCircleAnimationResize() {
    const newScreenSize = getScreenSize(true) as IScreenSize;
    // mobile devices trigger resize when scrolling and address bar shows / hides
    if (screenSize.current && (screenSize.current.width === newScreenSize.width)) {
      return;
    }

    canvasOpacity.current = 0.1;
    screenSize.current = newScreenSize;
    context.current = canvas.current.getContext('2d');

    circleAnimationRadius.current = 8;
    if (!context.current) {
      return;
    }

    context.current.clearRect(0, 0, screenSize.current.width, screenSize.current.height);
    setCircleCanvasBounds();
    drawCircle();
  }, 100)

  const cleanup = () => {
    window.removeEventListener('resize', onResize);
  }

  const init = () => {
    deviceRatio.current = getDevicePixelRatio();
    onResize();
    window.addEventListener('resize', onResize);
  }

  return {
    init,
    cleanup
  }
}

export default useCircleAnimation;
