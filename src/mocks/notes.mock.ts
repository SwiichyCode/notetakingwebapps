import { Note } from '@prisma/client';

import { generateRandomUUID } from '@/lib/utils';

export interface NoteMock extends Note {
  slug: string;
}

export const notesMock: NoteMock[] = [
  {
    id: generateRandomUUID(),
    title: 'React Performance Optimization',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    tags: ['React', 'Performance', 'Optimization'],
    slug: 'react-performance-optimization',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: generateRandomUUID(),
  },
  {
    id: generateRandomUUID(),
    title: 'Japan Travel Planning',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    tags: ['Travel', 'Personal'],
    slug: 'japan-travel-planning',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: generateRandomUUID(),
  },
];
