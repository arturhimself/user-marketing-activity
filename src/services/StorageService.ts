import { IStorage } from '../app/ports/IStorage';

const STORAGE_NAME = 'activityStep';

export class StorageService implements IStorage {
  getItem() {
    return Number(localStorage.getItem(STORAGE_NAME));
  }

  setItem(value: number) {
    return localStorage.setItem(STORAGE_NAME, JSON.stringify(value));
  }

  hasItem(): boolean {
    return Boolean(localStorage.getItem(STORAGE_NAME));
  }
}
