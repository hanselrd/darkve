import Phaser from '../phaser';

export default class Play extends Phaser.State {
  player: Phaser.Sprite;
  playerName: Phaser.Text;
  cursorKeys: Phaser.CursorKeys;
  map: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;

  create() {
    this.stage.backgroundColor = 0x000000;

    this.map = this.add.tilemap('map00001');
    this.map.addTilesetImage('city');
    this.map.addTilesetImage('country');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    this.player = this.add.sprite(0, 0, 'none');
    this.player.anchor.setTo(0.5);
    this.physics.p2.enable(this.player);
    this.player.body.fixedRotation = true;
    this.camera.follow(this.player);

    this.playerName = this.add.text(0, -25, '[GM] Hansel', {
      fill: 'purple',
      font: '20px Kanit'
    });
    this.playerName.anchor.setTo(0.5);
    this.player.addChild(this.playerName);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.layer.resizeWorld();
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursorKeys.left.isDown) {
      this.player.body.velocity.x = -150;
    }
    if (this.cursorKeys.up.isDown) {
      this.player.body.velocity.y = -150;
    }
    if (this.cursorKeys.right.isDown) {
      this.player.body.velocity.x = 150;
    }
    if (this.cursorKeys.down.isDown) {
      this.player.body.velocity.y = 150;
    }
  }

  render() {
    this.game.debug.cameraInfo(this.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 170);
    this.game.debug.inputInfo(32, 230);
  }
}
