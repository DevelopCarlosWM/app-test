import { Paper, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import '../css/globals.css';
import './main-screen.css';
import { useHaveProjects } from '../hooks/useHaveProjects';
import { Project, projectsActions } from '../redux/slices/projects.slice';
import ProjectForm from '../components/ProjectForm';
import { useSelector } from 'react-redux';
import { projectsGetAllProjects } from '../redux/selectors/projects.selector';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const MainScreen = (): React.ReactElement => {
  const { projects } = useSelector(projectsGetAllProjects);
  const navigate = useNavigate();
  const haveProjects = useHaveProjects();
  const dispatch = useDispatch();
  const onSubmit = ({ name, owner }: { name: string; owner: string }): void => {
    dispatch(projectsActions.createProject({ name, owner } as unknown as Project));
  };
  const onCreateNewProject = (): void => {
    navigate('/project/new');
  };
  const goToProject = (name: string) => {
    navigate(`/project/${name}`)
  };
  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
         <Typography variant="h3">Projects</Typography>
         <Button style={{ marginLeft: 20 }} type="button" onClick={onCreateNewProject}>New Project</Button>
      </div>
      {!haveProjects ? (
        <ProjectForm onSubmit={onSubmit} />
      ) : (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper style={{ width: 700, padding: '16px 0px' }}>
            <Typography variant="h5" style={{ paddingLeft: 12 }}>See your projects</Typography>
            {Object.values(projects).map(p => (
              <div className="project-item" onClick={() => goToProject(p?.name ?? '')}>
                <div>
                  <Typography variant="body1">Project name: {p?.name}</Typography>
                </div>
                <div>
                  <Typography variant="body1">Project owner: {p?.owner}</Typography>
                </div>
                <div>
                  <Typography variant="body1">Pending tasks: {p?.tasks.length.toString()}</Typography>
                </div>
              </div>
            ))}
          </Paper>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
