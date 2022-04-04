import { CAM_CENTER } from "../cfg/constants/design-constants";
import { CUSTOM_EVENTS } from "../cfg/constants/game-constants";
import { TWEEN_EASING } from "../cfg/constants/static-constants";
import { Overlay } from "../game-objects/Overlay";
import { AbstractScene } from "../scenes/AbstractScene";
import { SelectionArrow } from "./SelectionArrow";
import { Turtle } from "./Turtle";
import { StartButton } from "./StartButton";
import { TurtleDetails } from "./TurtleDetails";

const TWEEN_DURATION = 150;

export class TurtleSelectionMenu extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private overlay!: Phaser.GameObjects.Image;
  private dragBox!: Phaser.GameObjects.Image;
  private turtleDetails!: TurtleDetails;
  private leftArrow!: SelectionArrow;
  private rightArrow!: SelectionArrow;
  private startButton!: StartButton;

  private showTurtles: Array<Turtle> = [];
  private showTurtlesPositionX: Array<number> = [];
  private currentTurtleIndex = 0;
  private turtlesData: Array<IUserNftWithMetadata> = [];

  private initDragX = 0;
  private isDragEnabled = true;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addOverlay();
    this.setupTurtles();
    this.addTurtleDetails();
    this.addDragBox();
    this.addLeftArrow();
    this.addRightArrow();
    this.addStartButton();
    this.setAlpha(0);
    this.setVisible(false);
    this.addEventListeners();
    this.scene.add.existing(this);
  }

  private addOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'black_overlay');
    this.overlay.setOrigin(0.5);
    this.overlay.setAlpha(0.25);
    this.overlay.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
    this.add(this.overlay);
  }

  private addDragBox() {
    this.dragBox = this.scene.add.image(0, 0, 'black_overlay');
    this.dragBox.setOrigin(0.5);
    this.dragBox.setAlpha(0.01);
    this.dragBox.setPosition(this.showTurtlesPositionX[2], 0);
    this.dragBox.setDisplaySize(
      this.scene.grs.designDim.width * 0.6,
      this.scene.grs.designDim.height * 0.4
    );
    this.add(this.dragBox);
  }

  private addStartButton() {
    this.startButton = new StartButton(this.scene, this.scene.grs.designDim.width * 0.28, this.scene.grs.designDim.height * 0.35);
    this.add(this.startButton);
  }

  private addLeftArrow() {
    this.leftArrow = new SelectionArrow(this.scene, -this.scene.grs.designDim.width * 0.4, 0);
    this.add(this.leftArrow);
  }

  private addRightArrow() {
    this.rightArrow = new SelectionArrow(this.scene, this.scene.grs.designDim.width * 0.1, 0);
    this.rightArrow.setFlipX(true);
    this.add(this.rightArrow);
  }

  private setupTurtles() {
    const startX = -this.scene.grs.designDim.width * 0.45;
    for (let i = 0; i < 5; ++i) {
      this.showTurtles[i] = new Turtle(this.scene, startX + this.scene.grs.designDim.width * 0.15 * i, 0);
      if (i === 0 || i === 4) {
        this.showTurtles[i].setScale(0);
        if (i === 0) {
          this.showTurtles[i].x += this.scene.grs.designDim.width * 0.05;
        } else {
          this.showTurtles[i].x -= this.scene.grs.designDim.width * 0.05;
        }
      } else if (i === 1 || i === 3) {
        this.showTurtles[i].setScale(0.25);
      } else {
        this.showTurtles[i].setScale(0.5);
      }
      this.showTurtlesPositionX[i] = this.showTurtles[i].x;
      this.add(this.showTurtles[i]);
    }
  }

  resetLineUp() {
    const startX = -this.scene.grs.designDim.width * 0.45;
    for (let i = 0; i < 5; ++i) {
      this.showTurtles[i].setPosition(startX + this.scene.grs.designDim.width * 0.15 * i, 0);
      this.showTurtles[i].setScale(1);
      this.showTurtles[i].setVisible(true);
      if (i === 0 || i === 4) {
        this.showTurtles[i].setScale(0);
        if (i === 0) {
          this.showTurtles[i].x += this.scene.grs.designDim.width * 0.05;
        } else {
          this.showTurtles[i].x -= this.scene.grs.designDim.width * 0.05;
        }
      } else if (i === 1 || i === 3) {
        this.showTurtles[i].setScale(0.25);
      } else {
        this.showTurtles[i].setScale(0.5);
      }
      this.showTurtlesPositionX[i] = this.showTurtles[i].x;
    }
  }

  private addTurtleDetails() {
    this.turtleDetails = new TurtleDetails(this.scene, this.scene.grs.designDim.width * 0.275, 0);
    this.add(this.turtleDetails);
  }

  populateTurtles(turtlesData: Array<IUserNftWithMetadata>, mainTurtleIndex: number) {
    this.resetLineUp();
    this.currentTurtleIndex = mainTurtleIndex;
    this.turtlesData = turtlesData;

    if (mainTurtleIndex === 0) {
      this.showTurtles[1].setVisible(false);
    }
    if (mainTurtleIndex === turtlesData.length - 1) {
      this.showTurtles[3].setVisible(false);
    }
    // Middle turtle
    this.showTurtles[2].setupDisplayTurtle(mainTurtleIndex);
    this.turtleDetails.updateTurtleDetails(this.turtlesData[this.currentTurtleIndex]);
    // Left turtle
    if (mainTurtleIndex - 1 >= 0) {
      this.showTurtles[1].setupDisplayTurtle(mainTurtleIndex - 1);
      this.rightArrow.setEnabled(true);
    }
    // Right turtle
    if (mainTurtleIndex + 1 <= turtlesData.length - 1) {
      this.showTurtles[3].setupDisplayTurtle(mainTurtleIndex + 1);
      this.leftArrow.setEnabled(true);
    }
  }

  showMenu() {
    this.showTween();
  }

  private hideMenu() {
    this.hideTween();
  }

  private showTween() {
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 400,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      onStart: () => {
        this.isDragEnabled = true;
        this.startButton.isEnabled = true;
        this.setVisible(true);
      }
    });
  }

  private hideTween() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 400,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      onComplete: () => {
        this.setVisible(false);
      }
    })
  }

  private addEventListeners() {
    this.dragBox.setInteractive(
      { draggable: true }
    ).on('dragstart', (pointer: any) => {
      this.initDragX = pointer.downX;
    }).on('drag', (pointer: any) => {
      if (!this.isDragEnabled) {
        return;
      }
      if (pointer.position.x - this.initDragX > 50 && this.rightArrow.isEnabled) {
        this.initDragX = pointer.position.x;
        this.triggerRightMove();
      } else if (pointer.position.x - this.initDragX < -50 && this.leftArrow.isEnabled) {
        this.initDragX = pointer.position.x;
        this.triggerLeftMove();
      }
    });
    this.leftArrow.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.triggerLeftMove();
    });
    this.rightArrow.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.triggerRightMove();
    });
    this.startButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.leftArrow.setEnabled(false);
      this.rightArrow.setEnabled(false);
      this.isDragEnabled = false;
      this.hideMenu();
      const speedAttrib = this.turtlesData[this.currentTurtleIndex].metadata.attributes.find((attrib) => {
        if (attrib.trait_type === 'speed') {
          return true;
        }
      })
      this.emit(CUSTOM_EVENTS.START_GAME, speedAttrib ? speedAttrib.value : 0, this.currentTurtleIndex);
    });
  }

  private disableDragFewMoments() {
    this.isDragEnabled = false;
    this.scene.time.delayedCall(TWEEN_DURATION, () => {
      this.isDragEnabled = true;
    });
  }

  private triggerLeftMove() {
    this.disableDragFewMoments();
    const nextIndex = this.currentTurtleIndex + 1;
    this.currentTurtleIndex = nextIndex;
    if (nextIndex + 1 <= this.turtlesData.length - 1) {
      this.showTurtles[4].setupDisplayTurtle(nextIndex + 1);
      this.showTurtles[4].setVisible(true);
      this.leftArrow.setEnabled(true);
    } else {
      this.leftArrow.setEnabled(false);
      this.showTurtles[4].setVisible(false);
    }
    this.turtleDetails.updateTurtleDetails(this.turtlesData[this.currentTurtleIndex]);
    this.rightArrow.setEnabled(true);
    this.leftMoveTween();
  }

  private triggerRightMove() {
    this.disableDragFewMoments();
    const nextIndex = this.currentTurtleIndex - 1;
    this.currentTurtleIndex = nextIndex;
    if (nextIndex - 1 >= 0) {
      this.showTurtles[0].setupDisplayTurtle(nextIndex + 1);
      this.showTurtles[0].setVisible(true);
      this.rightArrow.setEnabled(true);
    } else {
      this.rightArrow.setEnabled(false);
      this.showTurtles[0].setVisible(false);
    }
    this.turtleDetails.updateTurtleDetails(this.turtlesData[this.currentTurtleIndex]);
    this.leftArrow.setEnabled(true);
    this.rightMoveTween();
  }

  private leftMoveTween() {
    this.scene.audioManager.play('turtleSwap');
    this.showTurtles[4].x = this.showTurtlesPositionX[4];
    for (let i = 1; i < 5; ++i) {
      if (this.showTurtles[i].visible) {
        this.scene.tweens.add({
          targets: this.showTurtles[i],
          x: this.showTurtlesPositionX[i - 1],
          duration: TWEEN_DURATION,
          ease: TWEEN_EASING.SINE_EASE_IN,
        });
      }
    }

    if (this.showTurtles[1].visible) {
      const turtle = this.showTurtles[1];
      this.scene.tweens.add({
        targets: turtle,
        duration: TWEEN_DURATION,
        scale: 0,
        ease: TWEEN_EASING.SINE_EASE_IN,
        onComplete: () => {
          // turtle.setVisible(false);
        }
      });
    }
    this.scene.tweens.add({
      targets: this.showTurtles[2],
      duration: TWEEN_DURATION,
      scale: 0.25,
      ease: TWEEN_EASING.SINE_EASE_IN,
    });
    this.scene.tweens.add({
      targets: this.showTurtles[3],
      duration: TWEEN_DURATION,
      scale: 0.5,
      ease: TWEEN_EASING.SINE_EASE_IN
    });
    if (this.showTurtles[4].visible) {
      this.scene.tweens.add({
        targets: this.showTurtles[4],
        duration: TWEEN_DURATION,
        scale: 0.25,
        ease: TWEEN_EASING.SINE_EASE_IN
      });
    }
    this.showTurtles.push(this.showTurtles.shift()!);
  }

  private rightMoveTween() {
    this.scene.audioManager.play('turtleSwap');
    this.showTurtles[0].x = this.showTurtlesPositionX[0];
    for (let i = 0; i < 4; ++i) {
      if (this.showTurtles[i].visible) {
        this.scene.tweens.add({
          targets: this.showTurtles[i],
          x: this.showTurtlesPositionX[i + 1],
          duration: TWEEN_DURATION,
          ease: TWEEN_EASING.SINE_EASE_IN,
        });
      }
    }
    if (this.showTurtles[3].visible) {
      const turtle = this.showTurtles[3];
      this.scene.tweens.add({
        targets: turtle,
        duration: TWEEN_DURATION,
        scale: 0,
        ease: TWEEN_EASING.SINE_EASE_IN,
        onComplete: () => {
          // turtle.setVisible(false);
        }
      });
    }
    this.scene.tweens.add({
      targets: this.showTurtles[2],
      duration: TWEEN_DURATION,
      scale: 0.25,
      ease: TWEEN_EASING.SINE_EASE_IN
    });
    this.scene.tweens.add({
      targets: this.showTurtles[1],
      duration: TWEEN_DURATION,
      scale: 0.5,
      ease: TWEEN_EASING.SINE_EASE_IN
    });
    if (this.showTurtles[0].visible) {
      this.scene.tweens.add({
        targets: this.showTurtles[0],
        duration: TWEEN_DURATION,
        scale: 0.25,
        ease: TWEEN_EASING.SINE_EASE_IN
      });
    }
    this.showTurtles.unshift(this.showTurtles.pop()!);

  }

  resizeAndRepositionElements(): void {
    this.overlay.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
  }


}