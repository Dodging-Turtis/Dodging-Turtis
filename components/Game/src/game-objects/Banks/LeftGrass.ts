import { CAM_CENTER } from '../../cfg/constants/design-constants';
import type { AbstractScene } from '../../scenes/AbstractScene';

export class LeftGrass extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private grasses: Array<Phaser.GameObjects.Image>;
  // private grassShadows: Array<Phaser.GameObjects.Image>;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.grasses = [];
    // this.grassShadows = [];
    this.addGrass();
    // this.addGrassShadow();
    // this.add(this.grassShadows);
    this.add(this.grasses);
    this.scene.add.existing(this);
  }

  private addGrass() {
    const initialStartX = 1.5; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.grasses[i] = this.scene.add.image(0, 0, 'grass_1');
      this.grasses[i].x = -width * 0.5;
      if (i === 0) {
        this.grasses[i].y = height * initialStartX;
      } else {
        this.grasses[i].y = this.grasses[i - 1].getTopCenter().y;
      }
      this.grasses[i].setOrigin(0.6, 1);
    }
  }

  private addGrassShadow() {
    // for (let i = 0; i < 3; ++i) {
    //   this.grassShadows[i] = this.scene.add.image(0, 0, 'grass_1');
    //   let grass = this.grasses[i];
    //   this.grassShadows[i].setPosition(grass.x, grass.y);
    //   this.grassShadows[i].setOrigin(grass.originX, grass.originY);
    //   this.grassShadows[i].setScale(1.01).setTint(0x000000).setAlpha(0.35);
    // }
  }

  private grassScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < 3; ++i) {
      if (this.grasses[i].y > (height * 0.5) + this.grasses[i].height) {
        const previousIndex = (i === 0) ? this.grasses.length - 1 : i - 1;
        this.grasses[i].y = this.grasses[previousIndex].getTopCenter().y;
        // this.grassShadows[i].y = this.grasses[previousIndex].getTopCenter().y;
      }
      this.grasses[i].y += speed;
      // this.grassShadows[i].y += speed + (speed * 0.01);
    }
  }

  scroll(speed: number) {
    this.grassScroll(speed);
  }
}
