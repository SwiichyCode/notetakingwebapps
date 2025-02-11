import { redirect } from 'next/navigation';

import { container } from '@/core/infrastructure/config/container';
import { getCurrentSession } from '@/core/presentation/middleware/auth.middleware';

import { NotesList } from '../../../core/presentation/components/dashboard/notes-list';

export default async function NotesPage() {
  const session = await getCurrentSession();
  const notes = await container.getNoteService().findNotesByUserId(session?.userId!);

  // if (notes.length > 0) {
  //   redirect(routes.dashboard + '/' + slugify(notes[0].title));
  // }

  return (
    <div className="grid h-screen w-full grid-cols-[20%_60%_20%]">
      <NotesList notes={notes} />

      <div className="border border-[#CACFD8] bg-transparent"></div>
    </div>
  );
}
