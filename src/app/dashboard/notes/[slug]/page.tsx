import { redirect } from 'next/navigation';

import { notesMock } from '@/mocks/notes.mock';
import { routes } from '@/routes';

import { NoteActions } from '../../(clean-architecture)/presentation/components/note-actions';
import { NoteDisplay } from '../../(clean-architecture)/presentation/components/note-display';
import { NotesList } from '../../(clean-architecture)/presentation/components/notes-list';

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
