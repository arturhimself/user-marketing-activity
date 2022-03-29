import { App, IOptions } from './app';
import { StorageService } from './services/StorageService';

const main = (options: IOptions) => {
  // eslint-disable-next-line
  new App(options, new StorageService());
};

if (process.env.NODE_ENV === 'development') {
  console.log('Test plugin');

  main({
    time: 20,
    devMode: true,
    onSuccess() {
      console.log('Goal');
    },
  });
}

export default main;
