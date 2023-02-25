import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// types
export interface Task {
  priority: number;
  title: string;
  description: string;
  effort: number;
  imageDescription?: string;
  state: 'backlog' | 'in progress' | 'ready for testing' | 'in testing' | 'done';
}
export interface Project {
  name: string;
  tasks: Array<Task>;
  owner: string;
  state: 'in progress' | 'done';
}
export interface ProjectsState {
  projects: {
    [key: string]: Project;
  };
}

export const getProjectsInitialState = (): ProjectsState => ({
  projects: {},
});

export const {
  actions: projectsActions,
  name: projectsName,
  reducer: projectsReducer,
} = createSlice({
  initialState: getProjectsInitialState(),
  name: 'ProjectsState',
  reducers: {
    createProject(state, { payload }: PayloadAction<Project>) {
      state.projects[payload.name] = { ...payload, tasks: payload.tasks ?? [] };
    },
    editProject(state, { payload }: PayloadAction<Project>) {
      state.projects[payload.name] = { ...payload };
    },
    deleteProject(state, { payload }: PayloadAction<string>) {
      delete state.projects[payload];
    },
  },
});
