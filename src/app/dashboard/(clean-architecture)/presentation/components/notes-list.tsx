'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { NoteMock, notesMock } from '@/mocks/notes.mock';
import { routes } from '@/routes';

import { NotesNavigationEmpty } from './notes-navigation-empty';
import { NotesNavigation } from './notes-navigations';

export const NotesList = ({ notes = notesMock }: { notes?: NoteMock[] }) => {
  return (
    <aside className="space-y-4 border-r border-[#E0E4EA] p-5">
      <Link href={routes.createNote}>
        <Button className="w-full">+ Create New Note</Button>
      </Link>

      {notes.length > 0 ? <NotesNavigation notes={notes} /> : <NotesNavigationEmpty />}
    </aside>
  );
};
