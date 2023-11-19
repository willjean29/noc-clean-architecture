import axios from 'axios';

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) { }

  async execute(url: string): Promise<boolean> {
    try {
      await axios.get(url);
      this.successCallback();
      return true
    } catch (error) {
      const errorMessage = `Error on check service ${url}`
      this.errorCallback(errorMessage);
      return false;
    }
  }
}