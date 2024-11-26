'use client';

import { useActionState } from 'react';

import { createNoteAction } from '@/core/presentation/actions/create-note.action';
import { ClockIcon } from '@/core/presentation/components/common/icons/clock-icon';
import { TagIcon } from '@/core/presentation/components/common/icons/tag-icon';
import { ErrorMessage } from '@/core/presentation/components/common/ui/error-message';

import { NoteFormState } from '../../schemas/note-form.state';
import { NoteActions, NoteDetail, NoteDivider } from './note-display';
import { NoteFormField } from './note-form-field';
import { NoteTextareaFormField } from './note-textarea-form-field';

type NoteFormProps = {
  userId: string;
};

const placeholders = {
  title: 'Enter a title...',
  tags: 'Add tags separated by commas (e.g. Work, Planning)',
  lastEdited: 'Not yet saved',
  content: 'Write your note here...',
};

export const NoteForm = ({ userId }: NoteFormProps) => {
  const [state, action] = useActionState(
    async (state: NoteFormState, formData: FormData) => createNoteAction(state, formData, userId),
    undefined,
  );

  return (
    <form action={action} className="grid w-full max-w-[70%] grid-rows-[auto_1fr] border-r border-r-gray-200 py-5 pl-6">
      <header className="space-y-4">
        <NoteFormField
          name="title"
          placeholder={placeholders.title}
          variant="title"
          defaultValue={state?.fieldValues?.title}
        />

        <div className="space-y-2">
          <NoteDetail title="Tags" icon={<TagIcon width={16} height={16} />}>
            <NoteFormField
              name="tags"
              placeholder={placeholders.tags}
              variant="detail"
              defaultValue={state?.fieldValues?.tags}
            />
          </NoteDetail>

          <NoteDetail title="Last Edited" icon={<ClockIcon width={16} height={16} />}>
            <NoteFormField name="tags" placeholder={placeholders.lastEdited} variant="edited" disabled />
          </NoteDetail>
        </div>
        <NoteDivider />
      </header>

      <main className="flex min-h-0 flex-col overflow-hidden">
        <NoteTextareaFormField
          name="content"
          placeholder={placeholders.content}
          defaultValue={state?.fieldValues?.content}
        />
      </main>

      <div>
        {state?.errors?.title && <ErrorMessage message={state.errors.title} />}
        {state?.errors?.tags && <ErrorMessage message={state.errors.tags} />}
        {state?.errors?.content && <ErrorMessage message={state.errors.content} />}
      </div>

      <footer>
        <NoteDivider />
        <NoteActions />
      </footer>
    </form>
  );
};
