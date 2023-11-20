export interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}
export type SuccessCallback = () => void;
export type ErrorCallback = (error: string) => void;