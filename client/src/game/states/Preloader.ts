import Phaser from '../phaser';
import city_png from '../../assets/city.png';
import country_png from '../../assets/country.png';
import map00001_json from '../../assets/maps/00001.json';

export default class Preloader extends Phaser.State {
  background: Phaser.Sprite;
  preloadBar: Phaser.Sprite;

  preload() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.anchor.setTo(0.5);
    this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.camera.follow(this.preloadBar);
    this.load.setPreloadSprite(this.preloadBar);
    this.load.image('city', city_png);
    this.load.image('country', country_png);
    this.load.tilemap(
      'map00001',
      undefined,
      map00001_json,
      Phaser.Tilemap.TILED_JSON
    );
  }

  create() {
    this.state.start('Menu');
  }
}
