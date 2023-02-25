import { Paper, Typography } from "@mui/material";
import Button from "./Button";
import Input from "./Input";
import Select from './Select';
import { Formik, Form, FormikHelpers } from "formik";
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Task } from "../redux/slices/projects.slice";

interface Props {
  onSubmit: (task: Task) => void;
  defaultValues?: Task;
}

const TaskForm = ({ onSubmit, defaultValues }: Props): React.ReactElement => {
  const [img, setImg] = useState('');
  const handleTransformToSubmit = (task: Task, { resetForm }: FormikHelpers<Task>): void => {
    const formattedTask: Task = {
      ...task,
      effort: Number(task.effort),
      priority: Number(task.priority),
      imageDescription: img,
    }
    onSubmit(formattedTask);
    resetForm();
  };
  const handleImageChange = (e: any) => {
    const imageDescription = URL.createObjectURL(e.currentTarget.files[0])
    setImg(imageDescription);
  };
  return (
    <div style={{ width: 500, padding: 16 }}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5">
          Register a new task
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Formik
            initialValues={defaultValues ?? {
              title: '',
              effort: 0,
              description: '',
              state: 'backlog',
              priority: 0,
            }}
            onSubmit={handleTransformToSubmit}
            validationSchema={Yup.object({
              title: Yup.string()
                .required("Mandatory")
                .typeError("Value must be a string"),
              description: Yup.string()
                .required("Mandatory")
                .typeError("Value must be a string"),
              state: Yup.string()
                .required("Mandatory")
                .typeError("Value must be a string"),
              effort: Yup.number()
                .required("Mandatory")
                .typeError("Value must be a number"),
              priority: Yup.number()
                .required("Mandatory")
                .typeError("Value must be a number"),
              
            })}
          >
            <Form>
              <Input label="Title" name="title" />
              <Input label="Description" name="description" />
              <Input label="Priority" name="priority" />
              <input placeholder="Image" type="file" accept="image/png,image/gif,image/jpeg" name="imageDescription" onChange={handleImageChange} />
              <div style={{ height: 20 }} />
              <Select name="state" label="State">
                <option value="">Select a state</option>
                <option value="backlog">backlog</option>
                <option value="in progress">in progress</option>
                <option value="ready for testing">ready for testing</option>
                <option value="in testing">in testing</option>
                <option value="done">done</option>
              </Select>
              <Button style={{ marginTop: 20 }} type="submit">Submit</Button>
              <Button style={{ marginTop: 20 }} type="reset" value="reset">Reset</Button>
            </Form>
          </Formik>
        </div>
      </Paper>
    </div>
  );
};

export default TaskForm;
