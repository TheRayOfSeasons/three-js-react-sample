import React, { useEffect, useRef } from 'react';
import { Engine } from '../engine';

export const AnimationCanvas = () => {
  const canvasScene = useRef(null);

  useEffect(() => {
    if(canvasScene) {
      Engine.initScene('Main', {
        options: {
          canvas: canvasScene.current,
          antialias: true,
          alpha: true
        },
        sceneName: 'MainScene'
      });
    }
  }, [canvasScene]);

  return (
    <canvas className="animation" ref={canvasScene} id="element"></canvas>
  );
}
