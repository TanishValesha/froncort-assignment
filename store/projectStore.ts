// /store/projectStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { projects as seedProjects, Project } from "@/data/data";

type ProjectState = {
  projects: Project[];
  currentProjectId: string | null;
  setCurrentProject: (id: string | null) => void;
  createProject: (name: string, description?: string) => Project;
  getCurrentProject: () => Project | null;
  deleteProject: (id: string) => void;
  renameProject: (id: string, newName: string) => void;
};

const STORAGE_KEY = "projects";

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects:
        typeof window !== "undefined"
          ? (() => {
              const raw = localStorage.getItem(STORAGE_KEY);
              if (raw) {
                try {
                  const parsed = JSON.parse(raw) as Project[];
                  if (parsed.length > 0) return parsed;
                } catch {}
              }
              localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
              return seedProjects;
            })()
          : seedProjects,

      currentProjectId:
        typeof window !== "undefined"
          ? localStorage.getItem("current_project") ||
            seedProjects[0]?.id ||
            null
          : seedProjects[0]?.id || null,

      setCurrentProject: (id) => {
        set({ currentProjectId: id });
        if (typeof window !== "undefined") {
          if (id) localStorage.setItem("current_project", id);
          else localStorage.removeItem("current_project");
        }
      },

      createProject: (name, description = "") => {
        const id = "p_" + Math.random().toString(36).slice(2, 9);
        const newProject: Project = { id, name, description };

        set((state) => {
          const updated = [newProject, ...state.projects];
          if (typeof window !== "undefined")
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return { projects: updated, currentProjectId: id };
        });

        return newProject;
      },

      getCurrentProject: () => {
        const { projects, currentProjectId } = get();
        return projects.find((p) => p.id === currentProjectId) ?? null;
      },

      deleteProject: (id) => {
        set((state) => {
          const updated = state.projects.filter((p) => p.id !== id);
          if (typeof window !== "undefined")
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          const newActive =
            state.currentProjectId === id
              ? updated[0]?.id ?? null
              : state.currentProjectId;
          if (newActive)
            localStorage.setItem("current_project", newActive);
          else localStorage.removeItem("current_project");
          return { projects: updated, currentProjectId: newActive };
        });
      },

      renameProject: (id, newName) => {
        set((state) => {
          const updated = state.projects.map((p) =>
            p.id === id ? { ...p, name: newName } : p
          );
          if (typeof window !== "undefined")
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return { projects: updated };
        });
      },
    }),
    {
      name: "projects-storage", // Zustand's internal storage key
      getStorage: () => localStorage,
    }
  )
);
