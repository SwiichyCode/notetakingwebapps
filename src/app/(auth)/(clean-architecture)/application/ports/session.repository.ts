export interface SessionRepository {
  create(data: { userId: string; expiresAt: Date; handle: string }): Promise<{
    userId: string;
    expiresAt: Date;
    handle: string;
  }>;

  delete(handle: string): Promise<void>;
  findByHandle(handle: string): Promise<{
    userId: string;
    expiresAt: Date;
    handle: string;
  } | null>;
}
