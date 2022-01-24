import React, {useEffect, useRef, useState} from 'react';
import useParticleAnimation from "./lib/useParticleAnimation";
import styles from './CanvasAnimation.module.scss';
import useCircleAnimation from "./lib/useCircleAnimation";
import useIntroAnimation from "./lib/useIntroAnimation";

type CanvasAnimationProps = {
  animationType: string;
  withSkipAnimation: boolean;
  withReplayAnimation: boolean;
}

type CanvasAnimationState = {
  buttonText: {
    skip: string,
    repeat: string,
  },
  isAnimationDone: boolean,
}

type VariationType = {
  [index: string]: {
    init: (callback: () => void) => void;
    cleanup: () => void,
    opacity: number
  }
}

const CanvasAnimation = (props: CanvasAnimationProps) => {
  const {
    animationType = 'Circle',
    withSkipAnimation = false,
    withReplayAnimation = false
  } = props;

  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [animationState, setAnimationState] = useState<CanvasAnimationState>({
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
  const { init: introInit, cleanup: introCleanup } = useIntroAnimation({ canvasRef });

  const getVariation = () => {
    const variations: VariationType = {
      circle: {
        init: circleAnimationInit,
        cleanup: circleAnimationCleanup,
        opacity: 0.1
      },
      particle: {
        init: particleAnimationInit,
        cleanup: particleAnimationCleanup,
        opacity: 1
      },
      intro: {
        init: introInit,
        cleanup: introCleanup,
        opacity: 1
      },
      // intro: this.introInitAnimation,
      default: {
        init: () => {},
        cleanup: () => {},
        opacity: 0.1
      }
    };

    return variations[lowercaseAnimationType];
  }


  useEffect(() => {
    const { init, cleanup, opacity } = getVariation();
    if(!init) {
      return;
    }

    init(() => {
      setCanvasOpacity(opacity);
    });


    return () => {
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
