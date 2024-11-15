import { User } from '@prisma/client';

import prisma from '@/lib/prisma';

export async function retrieveUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
