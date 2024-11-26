import { redirect } from 'next/navigation';

import { notesMock } from '@/config/mocks/notes.mock';
import { routes } from '@/config/routes';

import { NotesList } from '../../../core/presentation/components/dashboard/notes-list';

// Documentation: Cette page affiche uniquement la navigation.
// si il existe une note, redirige vers la note en question.

// FIXME: Gérer le temps de chargement de la page

export default async function NotesPage() {
  // Fake l'appel à la base de données
  const notes = await Promise.resolve(notesMock);

  if (notes.length > 0) {
    redirect(routes.dashboard + '/' + notes[0].slug);
  }

  return (
    <div className="grid h-screen w-full grid-cols-[20%_60%_20%]">
      <NotesList notes={notes} />

      <div className="border border-[#CACFD8] bg-transparent"></div>
    </div>
  );
}
