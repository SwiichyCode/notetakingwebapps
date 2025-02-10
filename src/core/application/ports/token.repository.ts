export interface TokenRepository {
  create(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
