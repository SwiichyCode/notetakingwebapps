export class Note {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly content: string,
    public readonly tags: string[],
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}
}
