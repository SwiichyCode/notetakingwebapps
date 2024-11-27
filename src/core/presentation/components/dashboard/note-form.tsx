'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createNoteAction } from '@/core/presentation/actions/create-note.action';
import { ClockIcon } from '@/core/presentation/components/common/icons/clock-icon';
import { TagIcon } from '@/core/presentation/components/common/icons/tag-icon';

import { useToast } from '../../hooks/use-toast';
import { CreateNoteSchema } from '../../schemas/note-form.schema';
import { Form } from '../common/ui/form';
import { NoteActions, NoteDetail, NoteDivider } from './note-display';
import { NoteFormField } from './note-form-field';
import { NoteTextareaFormField } from './note-textarea-form-field';

type NoteFormProps = {
  isCreating: boolean;
};

const placeholders = {
  title: 'Enter a title...',
  tags: 'Add tags separated by commas (e.g. Work, Planning)',
  lastEdited: 'Not yet saved',
  content: 'Write your note here...',
};

export const NoteForm = ({ isCreating }: NoteFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: '',
      tags: [],
      content: '',
    },
  });

  function onSubmit(data: z.infer<typeof CreateNoteSchema>) {
    startTransition(async () => {
      const payload = await createNoteAction({
        ...data,
        tags: data.tags.join(','),
      });

      if (payload?.serverError) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: payload.serverError,
        });
      } else {
        toast({
          title: 'Note saved',
          description: 'Your note has been saved successfully',
        });
      }

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-[70%] grid-rows-[auto_1fr] border-r border-r-gray-200 px-6 py-5"
      >
        <header className="space-y-4">
          <NoteFormField control={form.control} name="title" placeholder={placeholders.title} variant="title" />

          <div className="space-y-2">
            <NoteDetail title="Tags" icon={<TagIcon width={16} height={16} />}>
              <NoteFormField control={form.control} name="tags" placeholder={placeholders.tags} variant="detail" />
            </NoteDetail>

            <NoteDetail title="Last Edited" icon={<ClockIcon width={16} height={16} />}>
              <NoteFormField
                control={isCreating ? undefined : form.control}
                name={'lastEdited'}
                placeholder={placeholders.lastEdited}
                variant="edited"
                disabled={isCreating}
              />
            </NoteDetail>
          </div>
          <NoteDivider />
        </header>

        <main className="flex min-h-0 flex-col overflow-hidden">
          <NoteTextareaFormField name="content" placeholder={placeholders.content} />
        </main>

        <div>
          {/* {state?.errors?.title && <ErrorMessage message={state.errors.title} />}
          {state?.errors?.tags && <ErrorMessage message={state.errors.tags} />}
          {state?.errors?.content && <ErrorMessage message={state.errors.content} />} */}
        </div>

        <footer>
          <NoteDivider />
          <NoteActions isPending={isPending} />
        </footer>
      </form>
    </Form>
  );
};
