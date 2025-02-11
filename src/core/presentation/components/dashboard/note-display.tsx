import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ReactNode } from 'react';

import { NoteResponseDTO } from '@/core/application/dtos/note.dtos';
import { ClockIcon } from '@/core/presentation/components/common/icons/clock-icon';
import { TagIcon } from '@/core/presentation/components/common/icons/tag-icon';
import { Button } from '@/core/presentation/components/common/ui/button';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

type NotesDisplayProps = {
  note: NoteResponseDTO;
};

export const NoteTitle = ({ title }: { title: string }) => {
  return <h2 className="text-2xl font-bold">{title}</h2>;
};

export const NoteDetail = ({ title, icon, children }: { title?: string; icon: ReactNode; children: ReactNode }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex w-28 items-center gap-2 text-[#2B303B]">
        {icon} <span>{title}</span>
      </div>

      {children}
    </div>
  );
};

export const NoteTags = ({ tags }: { tags: string[] }) => {
  return <span className="text-[#0E121B]">{tags.join(', ')}</span>;
};

export const NoteLastEdited = ({ lastEdited }: { lastEdited: Date }) => {
  return <span>{format(lastEdited, 'dd MMM yyyy', { locale: fr })}</span>;
};

export const NoteDivider = () => {
  return <div className="my-4 h-[1px] w-full bg-[#E0E4EA]" />;
};

export const NoteContent = ({ content }: { content: string }) => {
  return <section className="max-w-none py-4 text-sm text-[#232530]">{content}</section>;
};

export const NoteActions = ({ isPending }: { isPending?: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <ButtonSubmit isPending={isPending}>Save Note</ButtonSubmit>
      <Button variant="outline">Cancel</Button>
    </div>
  );
};

export const NoteDisplay = ({ note }: NotesDisplayProps) => {
  return (
    <article className="grid w-full grid-rows-[auto_1fr] px-6 py-5">
      <header className="space-y-4">
        <NoteTitle title={note?.title} />

        <div className="space-y-2">
          <NoteDetail title="Tags" icon={<TagIcon width={16} height={16} />}>
            <NoteTags tags={note?.tags} />
          </NoteDetail>

          <NoteDetail title="Last Edited" icon={<ClockIcon width={16} height={16} />}>
            <NoteLastEdited lastEdited={note?.createdAt} />
          </NoteDetail>
        </div>
        <NoteDivider />
      </header>

      <main className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-0 overflow-y-auto">
        <NoteContent content={note?.content} />
      </main>

      <footer>
        <NoteDivider />
        <NoteActions />
      </footer>
    </article>
  );
};
