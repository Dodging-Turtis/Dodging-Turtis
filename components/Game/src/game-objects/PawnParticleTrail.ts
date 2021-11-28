import { CAM_CENTER } from '../cfg/constants/design-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class PawnParticleTrail {
  scene: AbstractScene;
  emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  particle!: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.addEmitter();
    // this.playEmitterTween();
  }

  addEmitter() {
    this.particle = this.scene.add.particles('bubble');
    const { height } = this.scene.grs.designDim;

    this.emitter = this.particle.createEmitter({
        x: CAM_CENTER.x,
        y: { start: CAM_CENTER.y + 0, end: CAM_CENTER.y + 560, steps: 256 },
        lifespan: 2000,
        speed: 120,
        quantity: 4,
        alpha: { start: 0.3, end: 0, ease: 'Power3'},
        scale: { start: 0.4, end: 0.1, ease: 'Power3' },
        angle: { min: 65, max: 115 },
        // blendMode: 'ADD'
    });
  }

}