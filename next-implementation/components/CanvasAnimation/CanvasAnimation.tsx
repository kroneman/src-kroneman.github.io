import React, {useEffect, useRef, useState} from 'react';
import styles from './CanvasAnimation.module.scss';
import useIntroAnimation from "./lib/useIntroAnimation";
import CustomButton from "../CustomButton";

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
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const buttonText = {
    skip: 'Skip Sequence',
    repeat: 'Replay Sequence',
  };

  const lowercaseAnimationType = animationType.toLowerCase();
  const isShowRepeatButton = withReplayAnimation && isAnimationDone;
  const isShowSkipButton = withSkipAnimation && !isAnimationDone;

  const canvasRef = useRef(null);
  const onAnimationDone = () => {
    setIsAnimationDone(true);
  }

  const onAnimationResize = () => {
    setIsAnimationDone(false);
  }

  const {init: introInit, cleanup: introCleanup, skip: introSkip, restart: introRestart} = useIntroAnimation({
    canvasRef,
    onDone: onAnimationDone,
    onResize: onAnimationResize
  });

  const skip = () => {
    introSkip();
    setIsAnimationDone(true);
  }

  const restart = () => {
    introRestart();
    setIsAnimationDone(false);
  }

  const getVariation = () => {
    const variations: VariationType = {
      intro: {
        init: introInit,
        cleanup: introCleanup,
        opacity: 1
      },
      default: {
        init: () => {
        },
        cleanup: () => {
        },
        opacity: 0.1
      }
    };

    return variations[lowercaseAnimationType];
  }


  useEffect(() => {
    const {init, cleanup, opacity} = getVariation();
    if (!init) {
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
    <div className={styles.canvas_animation} style={{opacity: canvasOpacity}}>
      <canvas className={styles.canvas_animation_canvas} ref={canvasRef}/>
      {isShowSkipButton ? (
        <CustomButton className={`${styles.canvas_animation_button} mr-4`} onClick={skip}>
          {buttonText.skip}
        </CustomButton>
      ) : null}
      {isShowRepeatButton ? (
        <CustomButton className={`${styles.canvas_animation_button} mr-4`} onClick={restart}>
          {buttonText.repeat}
        </CustomButton>
        ) : null}
    </div>
  );
}

export default CanvasAnimation;
