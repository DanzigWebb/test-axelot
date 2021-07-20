import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type StorageState = Record<string, any>;

interface AbstractStorageImpl {
  storage: Storage;
  key: string;
  setItem: <T>(key: string, value: T) => void;
  getItem: <T>(key: string) => T | undefined;
  removeItem: (key: string) => void;
  clear: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AbstractStorage implements AbstractStorageImpl {
  storage: Storage;
  key: string = 'global';
  state: StorageState;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.storage = doc.defaultView!.localStorage;
    this.state = this.getLocal();
  }

  setItem<T>(key: string, value: T) {
    this.state[key] = value;
    this.update();
  }

  clear(): void {
    this.state = {};
    this.update();
  }

  getItem<T>(key: string): T | undefined {
    return this.state[key];
  }

  removeItem(key: string): void {
    delete this.state[key];
    this.update();
  }

  private update() {
    try {
      this.storage.setItem(this.key, JSON.stringify(this.state));
    } catch (e) {
      console.error(e);
    }
  }

  private getLocal(): StorageState {
    try {
      const storage = this.storage.getItem(this.key);
      return JSON.parse(storage || '{}');
    } catch (e) {
      return {};
    }
  }
}
