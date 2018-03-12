import * as React from 'react';
import * as THREE from 'three';

class Game extends React.Component {
  canvasRef: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  cube: THREE.Mesh;

  componentDidMount() {
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef });
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true
    });

    this.cube = new THREE.Mesh(geometry, material);
    scene.add(this.cube);

    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37: // left
          this.cube.position.x--;
          break;
        case 38: // up
          this.cube.position.z--;
          break;
        case 39: // right
          this.cube.position.x++;
          break;
        case 40: // down
          this.cube.position.z++;
          break;
        default:
      }
    });

    this.camera.position.z = 3;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const update = () => {
      this.cube.rotation.x += 0.005;
      this.cube.rotation.y += 0.008;
      this.setState({});
    };

    const render = () => {
      renderer.render(scene, this.camera);
    };

    const gameLoop = () => {
      requestAnimationFrame(gameLoop);
      update();
      render();
    };

    gameLoop();
  }

  render() {
    return (
      <div className="Game">
        <canvas
          className="Game-canvas"
          ref={(canvas: HTMLCanvasElement) => (this.canvasRef = canvas)}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <div
          className="Game-ui-top"
          style={{ position: 'absolute', color: 'white' }}
        >
          {this.cube && (
            <p>
              Cube Position: ({`${this.cube.position.x}, ${
                this.cube.position.y
              }, ${this.cube.position.z}`})
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
        <div
          className="Game-ui-bottom"
          style={{ position: 'absolute', bottom: 0 }}
        >
          <button onClick={() => alert('You clicked me!')}>Click Me</button>
        </div>
      </div>
    );
  }
}

export default Game;
