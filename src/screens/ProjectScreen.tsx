import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import TaskForm from '../components/TaskForm';
import { projectsGetAllProjects } from '../redux/selectors/projects.selector';
import { projectsActions, Task } from '../redux/slices/projects.slice';
import './main-screen.css';

const ProjectScreen = (): React.ReactElement => {
  const [defaultTask, setDefaultTask] = React.useState<Task>(undefined as unknown as Task);
  const [adding, setAdding] = React.useState<boolean>(false);
  const { projectName } = useParams();
  const { projects } = useSelector(projectsGetAllProjects);
  const dispatch = useDispatch();
  const addNewTask = (task: Task): void => {
    if (projects[projectName ?? '']?.tasks.some(val => val.title === task.title)) {
      const oldTask = {...projects[projectName ?? '']?.tasks.find((el) => el.title === task.title) } as unknown as Task;
      const projectTaskIndex = projects[projectName ?? '']?.tasks.findIndex(t => t.title === oldTask.title);
      const copy = [...projects[projectName ?? '']?.tasks];
      console.log(projectTaskIndex);
      copy[projectTaskIndex] = task;
      const project = { ...projects[projectName ?? ''], tasks: [...copy] };
      dispatch(projectsActions.editProject(project));
      setAdding(false);
      return
    }
    const project = { ...projects[projectName ?? ''], tasks: [...projects[projectName ?? '']?.tasks ?? [], task] }
    dispatch(projectsActions.editProject(project))
    setAdding(false);
  };
  const onEditTask = (task: Task): void => {
    setAdding(true);
    console.log(task);
    setDefaultTask(task);
  };
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3">Project {projectName}</Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Paper style={{ padding: 16, width: 700 }}>
          <Typography variant="h5">Tasks</Typography>
          <Divider />
          {projects[projectName ?? ''].tasks.length ? (
            <div>
              {projects[projectName ?? ''].tasks.map(task => (
                <div>
                  <div>
                    <Typography variant="h6">{task.title}</Typography>
                  </div>
                  <div>
                    <Typography variant="body1">State: {task.state}</Typography>
                  </div>
                  <div>
                    <Typography variant="body1">Effort: {task.effort}</Typography>
                  </div>
                  <div>
                    <Typography variant="body1">Priority: {task.priority}</Typography>
                  </div>
                  <div>
                    <Typography variant="body1">Description: {task.description}</Typography>
                  </div>
                  <div>
                    <img src={task.imageDescription} alt="desc img" style={{ height: 200, width: 200, borderRadius: 6 }} />
                  </div>
                  <Button type="button" onClick={() => onEditTask(task)}>Edit</Button>
                </div>
              ))}
            </div>
          ) : null}
        </Paper>
        <div style={{ padding: 16, width: 500, marginLeft: 20 }}>
          {adding ? <TaskForm onSubmit={addNewTask} defaultValues={defaultTask} /> : null}
        </div>
      </div>
      <Button type="button" onClick={() => setAdding(true)}>Add new task</Button>
    </div>
  );
};

export default ProjectScreen;
