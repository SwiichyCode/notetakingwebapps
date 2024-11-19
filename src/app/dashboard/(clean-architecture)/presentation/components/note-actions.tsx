import { Note } from '@prisma/client';

import { ArchiveIcon } from '@/components/icons/archive-icon';
import { DeleteIcon } from '@/components/icons/delete-icon';
import { Button } from '@/components/ui/button';

type NoteActionsProps = {
  note: Note;
};

export const NoteActions = ({ note }: NoteActionsProps) => {
  return (
    <aside className="space-y-4 border-l border-[#E0E4EA] p-5">
      <Button variant="secondary" className="w-full justify-start">
        <ArchiveIcon width={20} height={20} />
        <span>Archive Note</span>
      </Button>
      <Button variant="secondary" className="w-full justify-start">
        <DeleteIcon width={20} height={20} />
        <span>Delete Note</span>
      </Button>
    </aside>
  );
};
