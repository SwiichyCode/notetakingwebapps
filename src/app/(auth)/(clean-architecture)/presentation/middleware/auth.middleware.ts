'use server';

import { redirect } from 'next/navigation';

import { container } from '../../infrastructure/config/container';

const sessionService = container.getSessionService();

export async function getCurrentSession() {
  return sessionService.getCurrentSession();
}

export async function logout() {
  await sessionService.delete();
  redirect('/login');
}
