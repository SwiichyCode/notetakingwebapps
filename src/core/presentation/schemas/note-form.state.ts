export type NoteFormState =
  | {
      errors?: {
        title?: string[];
        tags?: string[];
        content?: string[];
      };
      fieldValues?: {
        title?: string;
        tags?: string;
        content?: string;
      };
      message?: string;
    }
  | undefined;
