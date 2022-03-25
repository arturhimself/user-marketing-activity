import { App, IOptions } from './app';
import { StorageService } from './services/StorageService';

const main = (options: IOptions) => {
  // eslint-disable-next-line
  new App(options, new StorageService());
};

export default main;
