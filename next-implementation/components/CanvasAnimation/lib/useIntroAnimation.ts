import {useRef} from "react";
import {cancelAnimFrame, requestAnimFrame, getDevicePixelRatio} from "./animation";
import {debounce, getScreenSize} from "../../../utils";

interface IScreenSize {
  width: number;
  height: number;
}

const SECOND = 1000;
const DURATION = 15 * SECOND;
const listText = [
  'while(isAwake)',
  'research()',
  'design()',
  'prototype()',
  'test()',
  'bugfix()',
  'commit()',
  'refactor()',
  'review()',
  'enjoy()',
  'learn()',
  'repeat()',
];

type UseIntroAnimationProps = {
  canvasRef: any,
  onDone: () => void,
  onResize: () => void
}

function useIntroAnimation(props: UseIntroAnimationProps) {
  const {canvasRef, onDone, onResize} = props
  const canvas = canvasRef;
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const screenSize = useRef<IScreenSize | undefined>();
  const currentPhaseIndex = useRef<number>(0);
  const isAnimationDone = useRef<boolean>(false);
  const introAnimationFrameSet = useRef<number>(0);
  const timeStamp = useRef<number>(Date.now());
  const startedTimeStamp = useRef<number>(Date.now());
  const canvasOpacity = useRef<number>(0);

  const timePassed = () => Date.now() - startedTimeStamp.current;
  const introAnimationIsDone = () => timePassed() > DURATION;

  const setPhase = (startAtTime: number, index: number) => {
    if (timePassed() > startAtTime && currentPhaseIndex.current < index) {
      canvasOpacity.current = 0;
      currentPhaseIndex.current = index;
    }
  }

  const introSetCanvasBounds = () => {
    const { width, height } = getScreenSize(true) as IScreenSize;
    const deviceRatio = getDevicePixelRatio();

    requestAnimFrame(() => {
      canvas.current.style.width = `${width}px`;
      canvas.current.style.height = `${height}px`;
      canvas.current.width = width * deviceRatio;
      canvas.current.height = height * deviceRatio;

      if(context.current) {
        context.current.scale(deviceRatio, deviceRatio);
      }
    });
  }

  const introDrawText = ({x, y, currentItem}: { x: number, y: number, currentItem: any }) => {
    if (!context.current) {
      return;
    }

    const {width, height} = getScreenSize(true) as IScreenSize;
    const fontSize = width / 10;
    // @ts-ignore
    context.current.stroke = '#fff';
    context.current.fillStyle = '#fff';
    context.current.font = `${fontSize}px serif`;

    context.current.clearRect(0, 0, width, height);
    const textSize = context.current.measureText(`${currentItem}`);
    const xAdjustedToCenter = x - (textSize.width / 2);
    context.current.fillText(`${currentItem}`, xAdjustedToCenter, y);
  }

  const introDraw = () => {
    const {width, height} = getScreenSize(true) as IScreenSize;
    const x = width / 2;
    const y = height / 2;

    isAnimationDone.current = introAnimationIsDone();
    if(isAnimationDone.current) {
      onDone();
    }

    listText.forEach((text, i) => {
      if (i === 0) {
        return;
      }

      const len = listText.length;
      const atTime = Math.floor(DURATION / len) * i;
      setPhase(atTime, i);
    });

    requestAnimFrame(() => {
      introDrawText({
        x,
        y,
        currentItem: listText[currentPhaseIndex.current],
      });


      if (canvasOpacity.current !== 1) {
        canvasOpacity.current = 1;
      }
    });
  }

  const introAnimationFrame = () => {
    if (isAnimationDone.current) {
      cancelAnimFrame(introAnimationFrameSet.current);
      introAnimationFrameSet.current = 0;
      return () => {};
    }

    if (Date.now() < (timeStamp.current + Math.floor(2000 / 15))) {
      cancelAnimFrame(introAnimationFrameSet.current);
      introAnimationFrameSet.current = requestAnimFrame(introAnimationFrame);
      return introAnimationFrameSet.current;
    }

    introDraw();

    timeStamp.current = Date.now();
    cancelAnimFrame(introAnimationFrameSet.current);
    introAnimationFrameSet.current = requestAnimFrame(introAnimationFrame);
    return introAnimationFrameSet.current;
  }

  const introSkipAnimation = () => {
    const len = listText.length;
    currentPhaseIndex.current = len - 1;
    startedTimeStamp.current -= DURATION;
  }

  const introReplayAnimation = () => {
    context.current = canvas.current.getContext('2d');

    isAnimationDone.current = false;
    currentPhaseIndex.current = 0;
    startedTimeStamp.current = Date.now();
    timeStamp.current = startedTimeStamp.current;

    introSetCanvasBounds();
    introAnimationFrame();
  }

  const onAnimationResize = debounce(function onIntroAnimationResize() {
    const newScreenSize = getScreenSize(true) as IScreenSize;

    // mobile devices trigger resize when scrolling and address bar shows / hides
    if (screenSize.current && (screenSize.current.width === newScreenSize.width)) {
      return;
    }

    onResize();
    screenSize.current = newScreenSize;
    introReplayAnimation();
  })

  const init = (callback: () => void) => {
    onAnimationResize();
    window.addEventListener('resize', onAnimationResize);
    callback();
  }

  const cleanup = () => {
    window.removeEventListener('resize', onAnimationResize);
  }

  return {
    init,
    cleanup,
    skip: introSkipAnimation,
    restart: introReplayAnimation
  }
}

export default useIntroAnimation;
