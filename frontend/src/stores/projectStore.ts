import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
}));
