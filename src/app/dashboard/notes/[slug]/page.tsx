import { redirect } from 'next/navigation';

import { notesMock } from '@/config/mocks/notes.mock';
import { routes } from '@/config/routes';

import { NoteActions } from '../../../../core/presentation/components/dashboard/note-actions';
import { NoteDisplay } from '../../../../core/presentation/components/dashboard/note-display';
import { NotesList } from '../../../../core/presentation/components/dashboard/notes-list';

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const note = notesMock.find(note => note.slug === slug);

  if (!note) {
    redirect(routes.dashboard);
  }

  return (
    <div className="grid h-screen w-full grid-cols-[20%_60%_20%]">
      <NotesList />
      <NoteDisplay note={note} />
      <NoteActions note={note} />
    </div>
  );
}
