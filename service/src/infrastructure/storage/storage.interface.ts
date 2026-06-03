export interface StorageService {
  upload(): Promise<string>;
  delete(): Promise<void>;
}
