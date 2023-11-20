export interface SendLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}
