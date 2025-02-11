import { Note } from '@/core/domain/entities/note.entity';
import { ArchiveIcon } from '@/core/presentation/components/common/icons/archive-icon';
import { DeleteIcon } from '@/core/presentation/components/common/icons/delete-icon';
import { Button } from '@/core/presentation/components/common/ui/button';

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
