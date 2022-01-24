import React, {useEffect, useRef, useState} from 'react';
import useParticleAnimation from "./lib/useParticleAnimation";
import styles from './CanvasAnimation.module.scss';
import useCircleAnimation from "./lib/useCircleAnimation";

type CanvasAnimationProps = {
  animationType: string;
  withSkipAnimation: boolean;
  withReplayAnimation: boolean;
}

type CanvasAnimationState = {
  canvasOpacity: number,
  canvas: null,
  context: null,
  buttonText: {
    skip: string,
    repeat: string,
  },
  isAnimationDone: boolean,
}

type VariationType = {
  [index: string]: any
}

const CanvasAnimation = (props: CanvasAnimationProps) => {
  const {
    animationType = 'Circle',
    withSkipAnimation = false,
    withReplayAnimation = false
  } = props;

  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [animationState, setAnimationState] = useState<CanvasAnimationState>({
    canvasOpacity: 0,
    canvas: null,
    context: null,
    buttonText: {
      skip: 'Skip Sequence',
      repeat: 'Replay Sequence',
    },
    isAnimationDone: false,
  });

  const lowercaseAnimationType = animationType.toLowerCase();
  const isShowRepeatButton = withReplayAnimation && animationState.isAnimationDone;
  const isShowSkipButton = withSkipAnimation && !animationState.isAnimationDone;

  const canvasRef = useRef(null);
  const { init: circleAnimationInit, cleanup: circleAnimationCleanup } = useCircleAnimation({ canvasRef });
  const { init: particleAnimationInit, cleanup: particleAnimationCleanup } = useParticleAnimation({ canvasRef });

  const getInitMethod = () => {
    const variations: VariationType = {
      circle: circleAnimationInit,
      particle: particleAnimationInit,
      // intro: this.introInitAnimation,
      default: () => {},
    };

    return variations[lowercaseAnimationType];
  }

  const getCleanupAnimation = () => {
    const variations: VariationType = {
      circle: circleAnimationCleanup,
      particle: particleAnimationCleanup,
      // intro: this.introInitAnimation,
      default: () => {},
    };

    return variations[lowercaseAnimationType];
  }

  useEffect(() => {
    const init = getInitMethod();
    init();
    setCanvasOpacity(1);

    return () => {
      const cleanup = getCleanupAnimation();
      cleanup();
    };
  }, []);

  return (
    <div className={styles.canvas_animation} style={{ opacity: canvasOpacity }}>
      <canvas className={styles.canvas_animation_canvas} ref={canvasRef} />
    </div>
  );
}

export default CanvasAnimation;
