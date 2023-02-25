import { createSelector } from '@reduxjs/toolkit';
import type { ProjectsState } from '../slices/projects.slice';
import { projectsName } from '../slices/projects.slice';
import type { StoreState } from '../store/reducers';

export const projectsRootSelector = (state: StoreState): ProjectsState => state[projectsName];

export const projectsGetAllProjects = createSelector(projectsRootSelector, ({ projects }) => {
  return { projects };
});
