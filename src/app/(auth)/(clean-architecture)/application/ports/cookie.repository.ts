export interface CookieRepository {
  encrypt(payload: any): Promise<string>;
  decrypt<T>(token: string | null): Promise<T | null>;
  setCookie(token: string): Promise<void>;
  getCookie(): Promise<string | undefined>;
  removeCookie(): Promise<void>;
}
