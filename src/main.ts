import { App } from './app';
import { StorageService } from './services/StorageService';

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App(
      {
        onSuccess: () => console.log('Goal'),
      },
      new StorageService(),
    );
  });
};

main();
