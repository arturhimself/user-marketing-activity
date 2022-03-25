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
  private currentStep: number;
  private wasActivity = false;
  private intervalId: NodeJS.Timer | undefined;

  constructor(options: IOptions, private storageService: IStorage) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.stepsAmount = this.options.time / 10;
    this.currentStep = this.storageService.hasItem()
      ? Number(this.storageService.getItem())
      : DEFAULT_FIRST_STEP;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.start();
    console.log('started');
  }

  private start(): void {
    this.setListener();

    this.intervalId = setInterval(() => {
      if (this.wasActivity) {
        this.currentStep++;
        this.storageService.setItem(this.currentStep);
        this.wasActivity = false;

        if (this.currentStep === this.stepsAmount) {
          this.onSuccess();
        }
      }
    }, STEP_TIME);
  }

  private onSuccess(): void {
    this.clear();
    this.options.onSuccess();
  }

  private clear(): void {
    this.removeListener();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.storageService.clear();
  }

  private removeListener(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  private setListener(): void {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove(): void {
    this.wasActivity = true;
  }

  // @TODO: add forms and buttons events
}
