import { notesMock } from '@/config/mocks/notes.mock';
import { NoteForm } from '@/core/presentation/components/dashboard/note-form';
import { NotesList } from '@/core/presentation/components/dashboard/notes-list';

export default async function CreateNotePage() {
  const notes = await Promise.resolve(notesMock);

  return (
    <div className="grid h-screen w-full grid-cols-[20%_80%_20%]">
      <NotesList notes={notes} />
      <NoteForm isCreating={true} />
    </div>
  );
}
