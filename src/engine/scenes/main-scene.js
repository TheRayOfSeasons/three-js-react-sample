import { HemisphereLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DefaultCamera } from '../cameras/default-camera';
import { InteractiveScene } from '../core';
import { AbstractWave } from '../scene-objects/abstract-wave';
import { Galaxy } from '../scene-objects/galaxy';
import { MouseLight } from '../scene-objects/mouse-light';


export class MainScene extends InteractiveScene {
  sceneObjects = {
    MouseLight,
    AbstractWave,
    Galaxy
  }
  cameras = {
    DefaultCamera,
  }
  defaultCamera = 'DefaultCamera';

  onSceneAwake() {
    this.currentCamera.position.x = -0.5;
    this.currentCamera.position.y = 0.5;
    this.currentCamera.position.z = 0.5;

    const hemiLight = new HemisphereLight('#ffffff', '#ffffff');
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);

    this.overlay = document.getElementById('element');
    this.controls = new OrbitControls(this.currentCamera, this.overlay);
    this.controls.enableDamping = true;
  }

  onSceneStart() {
    const galaxy = this.instances.Galaxy.components.GalaxyParticle;
    galaxy.group.position.y = 5;
    galaxy.group.position.z = 10;
  }

  onAfterRender() {
    this.controls.update();
  }
}
