export interface IStorage {
  getItem: () => number | null;
  setItem: (value: number) => void;
  hasItem: () => boolean;
}
