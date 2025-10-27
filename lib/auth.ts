import { User, users } from "@/data/data";


const USER_KEY = 'current_user';

export function getMockUsers(): User[] {
  return users;
}

export function setCurrentUser(user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}


export function logoutUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}
