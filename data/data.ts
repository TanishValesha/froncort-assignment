// /data/seed.ts

export type User = {
  id: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  color?: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
};

export const users: User[] = [
  { id: 'u_1', name: 'Luka (Owner)', role: 'owner', color: '#ef4444' },
  { id: 'u_2', name: 'Kobe (Admin)', role: 'admin', color: '#8b5cf6' },
  { id: 'u_3', name: 'James (Editor)', role: 'editor', color: '#06b6d4' },
  { id: 'u_4', name: 'Victor (Viewer)', role: 'viewer', color: '#f59e0b' },
];

export const projects: Project[] = [
  {
    id: 'p_1',
    name: 'Alpha Project',
    description: 'Docs + Kanban for core team',
  },
  {
    id: 'p_2',
    name: 'Beta Project',
    description: 'Testing ground for experiments',
  },
];
