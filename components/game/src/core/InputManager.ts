import { CUSTOM_EVENTS } from "../cfg/constants/game-constants";
import { EInputDirection } from "../cfg/enums/EInputDirection";
import { AbstractScene } from "../scenes/AbstractScene";

export class InputManager {

  private isInputEnabled = false;
  private inputDirection: EInputDirection = EInputDirection.NONE;
  private isDesktop = false;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  events: Phaser.Events.EventEmitter;

  constructor(private scene: AbstractScene) {
    this.events = new Phaser.Events.EventEmitter();
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.isDesktop = this.scene.game.device.os.desktop;
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');

    if (!this.isDesktop) {
      this.addTouchListener();
    } else {
      this.addEscapeListener();
    }
  }

  getInputDirection() {
    return this.inputDirection;
  }

  getIsInputEnabled() {
    return this.isInputEnabled;
  }

  setInputEnabled(value: boolean) {
    this.isInputEnabled = value;
  }

  setInputDirection(value: EInputDirection) {
    this.inputDirection = value;
  }

  private handleInput(direction: EInputDirection) {
    if (!this.isInputEnabled) {
      return;
    }
    this.inputDirection = direction;
  }

  private addEscapeListener(): void {
    this.scene.input.keyboard.on('keyup-' + 'ESC', () => {
      console.warn('escape');
      this.events.emit(CUSTOM_EVENTS.ESCAPE);
    });
  }

  private addTouchListener(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const deltaX = pointer.x - pointer.camera.width * 0.5;
      if (deltaX <= 0) {
        this.handleInput(EInputDirection.LEFT);
      } else {
        this.handleInput(EInputDirection.RIGHT);
      }
    });
    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.handleInput(EInputDirection.NONE);
    });
  }

  update(delta: number) {
    if (this.isInputEnabled) {
      if (this.isDesktop) {
        this.inputDirection = EInputDirection.NONE;
        if (this.cursorKeys.left.isDown || this.keyA.isDown) {
          this.inputDirection = EInputDirection.LEFT;
        } else if (this.cursorKeys.right.isDown || this.keyD.isDown) {
          this.inputDirection = EInputDirection.RIGHT;
        }
      }
    }
  }
}