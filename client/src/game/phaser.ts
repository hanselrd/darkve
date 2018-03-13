import * as Phaser from 'phaser-ce';
(<any>window).PIXI = require('phaser-ce/build/custom/pixi');
(<any>window).p2 = require('phaser-ce/build/custom/p2');
export default <typeof Phaser>((<any>window).Phaser = require('phaser-ce/build/custom/phaser-split'));
