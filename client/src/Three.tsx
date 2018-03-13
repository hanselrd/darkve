import * as React from 'react';
import './Three.css';
import * as _THREE from 'three';
import Player from './Player';
import crate0_bump from './assets/crate0/crate0_bump.png';
import crate0_diffuse from './assets/crate0/crate0_diffuse.png';
import crate0_normal from './assets/crate0/crate0_normal.png';
import naturePack_obj from './assets/models/naturePack_175.obj';
const THREE: typeof _THREE = { ..._THREE, ...require('three-addons') };

class Player extends THREE.Mesh {
  speed: number;

  constructor(position?: THREE.Vector3, speed?: number) {
    super(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({ color: 0xff4444 })
    );
    this.receiveShadow = true;
    this.castShadow = true;
    if (position) {
      this.position.set(position.x, position.y, position.z);
    }
    this.speed = speed || 0.2;
  }
}

interface Keyboard {
  left?: boolean;
  up?: boolean;
  right?: boolean;
  down?: boolean;
  w?: boolean;
  a?: boolean;
  s?: boolean;
  d?: boolean;
}

class Three extends React.Component {
  canvasRef: HTMLCanvasElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  player: Player;
  floor: THREE.Mesh;
  crate: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  keyboard: Keyboard;

  constructor(props: {}) {
    super(props);
    this.keyboard = {};
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.player = new Player(new THREE.Vector3(0, 1, 0));
    this.scene.add(this.player);

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20, 20, 20),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    this.floor.rotation.x -= Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-3, 6, -3);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 25;
    this.scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const crateMap = textureLoader.load(crate0_diffuse);
    const crateBumpMap = textureLoader.load(crate0_bump);
    const crateNormalMap = textureLoader.load(crate0_normal);

    this.crate = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: crateMap,
        bumpMap: crateBumpMap,
        normalMap: crateNormalMap
      })
    );
    this.crate.position.set(2.5, 3 / 2, 2.5);
    this.crate.receiveShadow = true;
    this.crate.castShadow = true;
    this.scene.add(this.crate);

    const objLoader = new THREE.OBJLoader();
    objLoader.load(naturePack_obj, meshes => {
      meshes.traverse(mesh => {
        if (mesh instanceof THREE.Mesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      meshes.position.set(-5, 0, 4);
      this.scene.add(meshes);

      const clone = meshes.clone();
      clone.position.set(-5, 0, 10);
      this.scene.add(clone);
    });

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    window.addEventListener('keydown', event =>
      this.handleKeyboardEvent(event, true)
    );
    window.addEventListener('keyup', event =>
      this.handleKeyboardEvent(event, false)
    );

    this.camera.position.set(0, this.player.position.y, -5);
    this.camera.lookAt(this.player.position);

    const gameLoop = () => {
      requestAnimationFrame(gameLoop);

      this.player.rotation.x += 0.005;
      this.player.rotation.y += 0.008;
      this.crate.rotation.y += 0.008;
      if (this.keyboard.left) {
        this.camera.rotation.y -= Math.PI * 0.01;
      }
      // if (this.keyboard.up) {
      // }
      if (this.keyboard.right) {
        this.camera.rotation.y += Math.PI * 0.01;
      }
      // if (this.keyboard.down) {
      // }
      if (this.keyboard.w) {
        this.camera.position.x -=
          Math.sin(this.camera.rotation.y) * this.player.speed;
        this.camera.position.z +=
          Math.cos(this.camera.rotation.y) * this.player.speed;
      }
      if (this.keyboard.a) {
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
        this.camera.position.z -=
          Math.cos(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
      }
      if (this.keyboard.s) {
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y) * this.player.speed;
        this.camera.position.z -=
          Math.cos(this.camera.rotation.y) * this.player.speed;
      }
      if (this.keyboard.d) {
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
        this.camera.position.z -=
          Math.cos(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
      }
      this.forceUpdate();

      this.renderer.render(this.scene, this.camera);
    };

    gameLoop();
  }

  handleKeyboardEvent(event: KeyboardEvent, pressed: boolean) {
    switch (event.keyCode) {
      case 37: // left
        this.keyboard.left = pressed;
        break;
      case 38: // up
        this.keyboard.up = pressed;
        break;
      case 39: // right
        this.keyboard.right = pressed;
        break;
      case 40: // down
        this.keyboard.down = pressed;
        break;
      case 87: // w
        this.keyboard.w = pressed;
        break;
      case 65: // a
        this.keyboard.a = pressed;
        break;
      case 83: // s
        this.keyboard.s = pressed;
        break;
      case 68: // d
        this.keyboard.d = pressed;
        break;
      default:
    }
  }

  render() {
    return (
      <div className="Three">
        <canvas
          className="Three-canvas"
          ref={(canvas: HTMLCanvasElement) => (this.canvasRef = canvas)}
        />
        <div className="Three-ui-top">
          {this.player && (
            <p>
              Player Position: ({`${this.player.position.x}, ${
                this.player.position.y
              }, ${this.player.position.z}`})
            </p>
          )}
          {this.camera && (
            <p>
              Camera Position: ({`${this.camera.position.x}, ${
                this.camera.position.y
              }, ${this.camera.position.z}`})
            </p>
          )}
        </div>
        <div className="Three-ui-bottom">
          <button onClick={() => alert('You clicked me!')}>Click Me</button>
        </div>
      </div>
    );
  }
}
export default Three;
