import React, {useEffect, useRef, useState} from 'react';
import styles from './CanvasAnimation.module.scss';
import useIntroAnimation from "./lib/useIntroAnimation";

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

type CanvasAnimationProps = {
  animationType?: string;
  withSkipAnimation?: boolean;
  withReplayAnimation?: boolean;
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
  const { init: introInit, cleanup: introCleanup } = useIntroAnimation({ canvasRef });

  const getVariation = () => {
    const variations: VariationType = {
      intro: {
        init: introInit,
        cleanup: introCleanup,
        opacity: 1
      },
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
