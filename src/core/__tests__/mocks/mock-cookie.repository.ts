import { CookieRepository } from '../../application/ports/cookie.repository';

export class MockCookieRepository implements CookieRepository {
  encrypt = jest.fn();
  decrypt = jest.fn();
  setCookie = jest.fn();
  getCookie = jest.fn();
  removeCookie = jest.fn();
}
