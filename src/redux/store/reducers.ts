import type { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { projectsName, projectsReducer } from '../slices/projects.slice';

export const reducersMapObject = {
  [projectsName]: projectsReducer,
};

export type StoreState = StateFromReducersMapObject<typeof reducersMapObject>;

export default combineReducers(reducersMapObject);