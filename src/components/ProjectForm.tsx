import { Paper, Typography } from "@mui/material";
import Button from "./Button";
import Input from "./Input";
import { Formik, Form } from "formik";
import React from 'react';
import * as Yup from 'yup';

interface Props {
  onSubmit: ({ name, owner }: { name: string; owner: string }) => void;
  haveProjects?: boolean;
}

const ProjectForm = ({ onSubmit, haveProjects }: Props): React.ReactElement => {
  return (
    <div style={{ width: 700, padding: 16 }}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5">
          {haveProjects ? 'Register a new project' : "Seems like you don't have projects yet. Register a new one"}
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Formik
            initialValues={{
              name: "",
              owner: "",
            }}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Mandatory")
                .typeError("Value must be a string"),
              owner: Yup.string()
                .required("Mandatory")
                .typeError("Value must be a string"),
            })}
          >
            <Form>
              <Input label="Project Name" name="name" />
              <Input label="Owner Name" name="owner" />
              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
        </div>
      </Paper>
    </div>
  );
};

export default ProjectForm;
