import { WebGLRenderer } from 'three';
import { Size } from './constants';
import { Scenes } from './scene-registry';

export class ActiveRender {
  constructor({canvas, sceneName, height, width, options, useDefaultRendering=true}) {
    if(typeof(options) === 'object') {
      if(options.canvas) {
        canvas = options.canvas;
      }
    }
    this.renderer = new WebGLRenderer(options || {
      antialias: true,
      alpha: true,
      canvas
    });
    this.renderer.setSize(width || Size.width, height || Size.height);
    this.scene = new Scenes[sceneName](canvas, this.renderer);
    this.scene.start();
    const animate = time => {
      this.scene.update(time);
      if(useDefaultRendering) {
        this.renderer.render(this.scene.scene, this.scene.currentCamera);
      }
      this.scene.onAfterRender();
    }
    this.renderer.setAnimationLoop(animate);
  }
}
