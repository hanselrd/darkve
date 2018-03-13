import Phaser from '../phaser';

export default class Menu extends Phaser.State {
  background: Phaser.Sprite;
  playKey: Phaser.Key;
  playText: Phaser.Text;
  playButton: Phaser.Button;

  create() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.anchor.setTo(0.5);
    this.playKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    this.playText = this.add.text(0, 0, 'Press [ENTER] to Play!', {
      font: '32px Kanit'
    });
    this.playText.anchor.setTo(0.5);
    this.camera.follow(this.playText);
    this.playButton = this.add.button(0, 50, 'none', () => {
      this.state.start('Play');
    });
    this.playButton.anchor.setTo(0.5);
  }

  update() {
    if (this.playKey.isDown) {
      this.state.start('Play');
    }
  }
}
