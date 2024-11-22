import { SessionRepository } from '../../(clean-architecture)/application/ports/session.repository';

export class MockSessionRepository implements SessionRepository {
  create = jest.fn();
  delete = jest.fn();
  findByHandle = jest.fn();
}
