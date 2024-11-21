export type FormState =
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
