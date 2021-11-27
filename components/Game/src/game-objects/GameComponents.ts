import { CAM_CENTER } from '../cfg/constants/design-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';
import { Background } from './Background';
import { CollectiblesManager } from './Collectibles/CollectiblesManager';
import { ObstacleManager } from './Obstacles/ObstacleManager';
import { Overlay } from './Overlay';
import { EInputDirection, Pawn } from './Pawn';
import { PawnParticleTrail } from './PawnParticleTrail';
import { RiverLines } from './RiverLines';
import { Shore } from './Shore';

const SPEED_INCREASE_THRESHOLD = 5000;
const SPEED_INCREASE = 0.05;
const INIT_SPEED = 0.15;

export class GameComponents {
  scene: AbstractScene;


  grd: CanvasRenderingContext2D | null;
  scrollSpeedTween: Phaser.Tweens.Tween | null = null;


  background: Background;
  shore: Shore;
  riverLines: RiverLines;
  pawnParticleTrail: PawnParticleTrail;
  obstacleManager: ObstacleManager;
  collectibleManager: CollectiblesManager;
  pawn: Pawn;
  overlay: Overlay;


  scrollSpeed = INIT_SPEED;
  speedIncreaseThreshold = 5000;  // ms;
  scrollSpeedBeforeDeath = INIT_SPEED;


  constructor(scene: AbstractScene) {
    this.scene = scene;

    if (this.scene.sys.renderer.type === Phaser.WEBGL) {
      this.grd = this.scene.textures.createCanvas('grd').getContext();
    } else {
      this.grd = this.scene.sys.canvas.getContext('2d');
    }

    this.background = new Background(this.scene);
    this.shore = new Shore(this.scene);
    this.riverLines = new RiverLines(this.scene);
    this.pawnParticleTrail = new PawnParticleTrail(this.scene);
    this.obstacleManager = new ObstacleManager(this.scene);
    this.collectibleManager = new CollectiblesManager(this.scene);
    this.pawn = new Pawn(this.scene);
    this.overlay = new Overlay(this.scene);

    this.pawnParticleTrail.emitter.startFollow(this.pawn);

    this.pawn.on('direction', (direction: EInputDirection) => {
      if (direction === EInputDirection.NONE) {
        this.pawnParticleTrail.emitter.setAngle({ min: 65, max: 115 })
      } else {
        this.pawnParticleTrail.emitter.setAngle({ min: 0, max: 360 });
      }
    })
  }

  handlePawnCollision() {
    this.overlay.showOverlay();
    this.pawnParticleTrail.emitter.stop();
    this.stopScrollTween();
    this.scrollSpeedBeforeDeath = this.scrollSpeed * 0.75;
    this.speedIncreaseThreshold = SPEED_INCREASE_THRESHOLD;
    this.scrollSpeed = INIT_SPEED;
    this.pawn.playPawnCollidedTween();
    this.deathCameraEffects();
  }

  deathCameraEffects() {
    const currZoom = this.scene.cameras.main.zoom;
    this.scene.cameras.main.zoomTo(currZoom + 0.1, 500, TWEEN_EASING.SINE_EASE_IN);
    this.scene.cameras.main.pan(CAM_CENTER.x - (CAM_CENTER.x - this.pawn.x) * 0.2, CAM_CENTER.y, 500, TWEEN_EASING.SINE_EASE_IN);
    this.scene.cameras.main.shake(500, 0.005);
    window.navigator.vibrate(500);
  }

  resetCamera() {
    this.overlay.hideOverlay();
    const currZoom = this.scene.cameras.main.zoom;
    this.scene.cameras.main.zoomTo(currZoom - 0.1, 500, TWEEN_EASING.SINE_EASE_OUT);
    this.scene.cameras.main.pan(CAM_CENTER.x, CAM_CENTER.y, 500, TWEEN_EASING.SINE_EASE_OUT);
    this.scene.cameras.main.once('camerapancomplete', (camera: Phaser.Cameras.Scene2D.Camera) => {
      this.pawn.playPawnReviveTween();
      this.pawnParticleTrail.emitter.start();
    });
  }

  stopScrollTween() {
    if (this.scrollSpeedTween && this.scrollSpeedTween.isPlaying()) {
      this.scrollSpeedTween.stop();
      this.scrollSpeedTween = null;
    }
  }

  tweenScrollSpeedBackToUsual() {
    this.scene.tweens.add({
      targets: this,
      scrollSpeed: this.scrollSpeedBeforeDeath,
      duration: 4000,
      ease: TWEEN_EASING.SINE_EASE_OUT,
    })
  }

  increaseScrollSpeed() {
    this.scrollSpeedTween = this.scene.tweens.add({
      targets: this,
      scrollSpeed: `+=${SPEED_INCREASE}`,
      duration: 4000,
      ease: TWEEN_EASING.SINE_EASE_OUT,
    })
  }

  resizeAndRepositionElements() {
    this.background.resizeAndRepositionElements();
    this.shore.resizeAndRepositionElements();
    this.pawn.resizeAndRepositionElements();
    this.overlay.resizeAndRepositionElements();
  }

  update(delta: number) {
    const scrollSpeed = delta * this.scrollSpeed
    this.pawn.update(delta);
    this.shore.scroll(scrollSpeed);
    this.riverLines.scroll(scrollSpeed);
    this.obstacleManager.update(scrollSpeed);
    this.collectibleManager.update(scrollSpeed);
    this.speedIncreaseThreshold -= delta;
    if (this.speedIncreaseThreshold <= 0) {
      this.speedIncreaseThreshold = SPEED_INCREASE_THRESHOLD;
      this.increaseScrollSpeed();
    }
  }
}
