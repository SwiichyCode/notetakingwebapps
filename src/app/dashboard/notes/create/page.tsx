import { getUser } from '@/app/(auth)/(clean-architecture)/presentation/middleware/auth.middleware';
import { notesMock } from '@/mocks/notes.mock';

import { NoteForm } from '../../(clean-architecture)/presentation/components/note-form';
import { NotesList } from '../../(clean-architecture)/presentation/components/notes-list';

export default async function CreateNotePage() {
  const user = await getUser();
  const notes = await Promise.resolve(notesMock);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="grid h-screen w-full grid-cols-[20%_80%_20%]">
      <NotesList notes={notes} />
      <NoteForm userId={user.id} />
    </div>
  );
}
