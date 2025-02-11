import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, slugify } from '@/config/libs/utils';
import { NoteMock } from '@/config/mocks/notes.mock';
import { routes } from '@/config/routes';
import { Note } from '@/core/domain/entities/note.entity';

export const NotesNavigation = ({ notes }: { notes: Note[] }) => {
  const pathname = usePathname();

  return (
    <nav>
      {notes.map(({ id, title, tags }, index) => {
        const isActive = pathname === routes.dashboard + '/' + slugify(title);
        const isLastItem = index === notes.length - 1;

        return (
          <div key={id}>
            <Link
              href={routes.dashboard + '/' + slugify(title)}
              className={cn(
                'flex flex-col gap-1 rounded-md p-2 hover:bg-[#F3F5F8]',
                isActive && 'bg-[#F3F5F8] transition-colors duration-200',
              )}
            >
              <h3 className="font-semibold">{title}</h3>

              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="rounded-md bg-[#E0E4EA] px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            {!isLastItem && <div className="my-2 h-[1px] w-full bg-[#E0E4EA]" />}
          </div>
        );
      })}
    </nav>
  );
};
