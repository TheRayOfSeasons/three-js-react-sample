import { Group } from 'three';

/** Base class for all behaviours present in a scene. */
export class Behaviour {
  /** Called at the beginning of a scene to setup the behaviour. */
  start() {}

  /**
   * Called every frame.
   * @param {Number} time - A reference to the time since the scene was first rendered.
   */
  update(time) {}

  /** Whatever this returns will be added to the scene. */
  exportAsSceneObject() {}

  /**
   * Whatever this returns will be added to the scene as a group.
   * NOTE: Currently, this is only used for the SceneObject as a
   * collector of all Monobehaviours under it. Don't use this in
   * any other way unless the abstraction is revised.
   */
  exportObjectGroup() {}
}

/** A component of a SceneObject */
export class Component extends Behaviour {}

/**
 * A collection of MonoBehaviours interacting with each other
 * to build up one full behaviour. This is the counterpart
 * to Unity's GameObject.
 */
export class SceneObject extends Behaviour {
  monobehaviours = {}
  components = {}

  constructor({ scene }) {
    super();
    this.scene = scene;
    this.group = new Group();
  }

  /**
   * Add a MonoBehaviour into the object, which in turn is reflected into the scene.
   * @param {string} key - The key to be used when the instance is passed as a component. 
   * @param {class} monobehaviour - A class that extends MonoBehaviour containing the logic.
   */
  addComponent({ key, monobehaviour }) {
    const component = new monobehaviour({ parentBehaviour: this, scene: this.scene });
    this.components[key] = component;
    component.start();
    const exportedSceneObject = component.exportAsSceneObject();
    if(exportedSceneObject) {
      this.group.add(exportedSceneObject);
    }
  }

  start() {
    this.group = new Group();
    Object.entries(this.monobehaviours).forEach(([key, monobehaviour]) => {
      this.addComponent({ key, monobehaviour });
    });
  }

  update(time) {
    Object.values(this.components).forEach(component => component.update(time));
  }

  exportObjectGroup() {
    return this.group;
  }
}

/** A singular piece of a behaviour. */
export class MonoBehaviour extends Component {
  constructor({ parentBehaviour, scene }) {
    super();
    this.scene = scene;
    this.parentBehaviour = parentBehaviour;
  }

  /**
   * Returns a reference to the instance of a sibling component or monobehaviour.
   * @param {string} type - The key to the component.
   */
  getComponent(type) {
    return this.parentBehaviour.components[type];
  }
}
