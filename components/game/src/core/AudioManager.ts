import { GAME_SOUNDS } from '../cfg/constants/game-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class AudioManager {
  scene: AbstractScene;
  private bgSounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();

  constructor(scene: AbstractScene) {
    this.scene = scene;
  }

  initBootAudio(): void {
    // If any audio needs to play in boot scene, add it here.
  }

  initGameAudio(): void {
    for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
      this.sounds.set(
        GAME_SOUNDS[i].key,
        this.scene.sound.add(GAME_SOUNDS[i].key, { volume: 1, loop: GAME_SOUNDS[i].loop })
      );
    }
  }

  play(key: string, shouldStopPrevious = true): void {
    const sound = this.sounds && this.sounds.get(key);
    if (this.sounds && sound) {
      if (shouldStopPrevious) {
        sound.stop();
      }
      sound.play();
    } else {
      console.warn(`Cannot find sound with key: ${key}`);
    }
  }

  playMusic(key: string, shouldStopPrevious = true): void {
    const bgSound = this.bgSounds && this.bgSounds.get(key);
    if (bgSound) {
      if (shouldStopPrevious) {
        bgSound.stop();
      }
      bgSound.play();
    } else {
      console.warn(`Cannot find music with key: ${key}`);
    }
  }

  onceComplete(key: string, callback: () => void): void {
    const sound = this.sounds && this.sounds.get(key);
    if (this.sounds && sound) {
      sound.play();
      sound.once('complete', () => {
        callback();
      });
    } else {
      console.warn(`Cannot find sound with key: ${key}`);
    }
  }

  stopSound(key: string): void {
    const sound = this.sounds && this.sounds.get(key);
    if (this.sounds && sound) {
      sound.stop();
    } else {
      console.warn(`Cannot find sound with key: ${key}`);
    }
  }

  turnOff(): void {
    this.scene.sound.volume = 0;
  }

  turnOn(): void {
    this.scene.sound.volume = 1;
  }
}
