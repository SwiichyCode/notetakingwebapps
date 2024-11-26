import { PasswordRepository } from '../../application/ports/password.repository';

export class MockPasswordRepository implements PasswordRepository {
  hash = jest.fn();
  verify = jest.fn();
}
