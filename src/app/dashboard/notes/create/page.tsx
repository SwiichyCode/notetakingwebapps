import { notesMock } from '@/config/mocks/notes.mock';
import { NoteForm } from '@/core/presentation/components/dashboard/note-form';
import { NotesList } from '@/core/presentation/components/dashboard/notes-list';
import { getCurrentSession } from '@/core/presentation/middleware/auth.middleware';

export default async function CreateNotePage() {
  const user = await getCurrentSession();
  const notes = await Promise.resolve(notesMock);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="grid h-screen w-full grid-cols-[20%_80%_20%]">
      <NotesList notes={notes} />
      <NoteForm userId={user.userId} />
    </div>
  );
}
