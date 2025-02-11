import { SessionRepository } from '../../application/ports/authentication/session.repository';

export class MockSessionRepository implements SessionRepository {
  create = jest.fn();
  delete = jest.fn();
  findByHandle = jest.fn();
}
