import { throttle } from '../lib/throttle';
import { IStorage } from './ports/IStorage';

const STEP_TIME = 10000;
const DEFAULT_FIRST_STEP = 1;

export interface IOptions {
  time?: number;
  onSuccess: () => void;
}
const DEFAULT_OPTIONS: Required<Pick<IOptions, 'time'>> = {
  time: 60,
};

export class App {
  private readonly options: Required<IOptions>;
  private readonly stepsAmount: number;
  private readonly events: Record<string, Array<string>> = {
    document: ['click', 'mousemove', 'touchmove', 'scroll', 'input'],
    input: ['focus', 'blur'],
    button: ['focus', 'blur'],
  };
  private currentStep: number;
  private wasActivity = false;
  private intervalId: NodeJS.Timer | undefined;

  constructor(options: IOptions, private storageService: IStorage) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.stepsAmount = this.options.time / 10;
    this.currentStep = this.storageService.hasItem()
      ? Number(this.storageService.getItem())
      : DEFAULT_FIRST_STEP;

    if (this.stepsAmount === this.currentStep) {
      return;
    }

    this.handleClientActivity = throttle(this.handleClientActivity.bind(this), 500);
    this.start();
  }

  private start(): void {
    this.setListeners();

    this.intervalId = setInterval(() => {
      if (this.currentStep === this.stepsAmount) {
        this.onSuccess();
        return;
      }
      
      if (this.wasActivity) {
        this.currentStep++;
        this.storageService.setItem(this.currentStep);
        this.wasActivity = false;
      }
    }, STEP_TIME);
  }

  private onSuccess(): void {
    this.clear();
    this.options.onSuccess();
  }

  private clear(): void {
    this.removeListeners();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private removeListeners(): void {
    this.handleListeners('remove');
  }

  private setListeners(): void {
    this.handleListeners('set');
  }

  private handleListeners(action: 'remove' | 'set'): void {
    const method = action === 'remove' ? 'removeEventListener' : 'addEventListener';

    Object.entries(this.events).forEach(([element, events]) => {
      events.forEach(event => {
        if (element === 'document') {
          document[method](event, this.handleClientActivity);
        } else {
          document.querySelector(element)?.[method](event, this.handleClientActivity);
        }
      });
    });
  }

  private handleClientActivity(): void {
    if (!this.wasActivity) {
      this.wasActivity = true;
    }
  }
}
