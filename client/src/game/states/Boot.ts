import Phaser from '../phaser';
import background_jpg from '../../assets/background.jpg';
import preload_png from '../../assets/preload.png';

export default class Boot extends Phaser.State {
  init() {
    this.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.input.maxPointers = 1;
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setBoundsToWorld(false, false, false, false, false);
    this.physics.p2.gravity.y = 0;
    this.physics.p2.applyGravity = false;
    this.camera.bounds = <any>null;
    this.game.canvas.oncontextmenu = event => {
      event.preventDefault();
    };
    window.addEventListener('resize', () => {
      this.scale.setGameSize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
      );
    });
  }

  preload() {
    this.load.image('background', background_jpg);
    this.load.image('preloadBar', preload_png);
  }

  create() {
    this.state.start('Preloader');
  }
}
