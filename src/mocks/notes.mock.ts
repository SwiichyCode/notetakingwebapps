import { Note } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export interface NoteMock extends Note {
  slug: string;
}

export const notesMock: NoteMock[] = [
  {
    id: uuidv4(),
    title: 'React Performance Optimization',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    tags: ['React', 'Performance', 'Optimization'],
    slug: 'react-performance-optimization',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: uuidv4(),
  },
  {
    id: uuidv4(),
    title: 'Japan Travel Planning',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    tags: ['Travel', 'Personal'],
    slug: 'japan-travel-planning',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: uuidv4(),
  },
];
