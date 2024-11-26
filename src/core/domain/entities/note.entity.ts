export class Note {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly tags: string[],
    public readonly userId: string,
  ) {}
}
