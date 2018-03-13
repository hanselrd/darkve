import Phaser from './phaser';
import { Boot, Preloader, Menu, Play } from './states';

export default class Game extends Phaser.Game {
  constructor(parent?: HTMLDivElement) {
    super(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
      Phaser.AUTO,
      parent
    );

    this.state.add('Boot', Boot);
    this.state.add('Preloader', Preloader);
    this.state.add('Menu', Menu);
    this.state.add('Play', Play);

    this.state.start('Boot');
  }
}
