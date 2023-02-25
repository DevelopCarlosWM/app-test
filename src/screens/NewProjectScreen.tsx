import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { Project, projectsActions } from '../redux/slices/projects.slice';


const NewProjectScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = ({ name, owner }: { name: string; owner: string }): void => {
    dispatch(projectsActions.createProject({ name, owner } as unknown as Project));
    navigate('/');
  };

  return (
    <ProjectForm onSubmit={onSubmit} haveProjects />
  );
};

export default NewProjectScreen;
