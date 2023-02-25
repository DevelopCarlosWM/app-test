import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { projectsGetAllProjects } from "../redux/selectors/projects.selector";

export const useHaveProjects = (): boolean => {
  const [haveProjects, setHaveProjects] = useState<boolean>(false);
  const { projects } = useSelector(projectsGetAllProjects);

  useEffect(() => {
    if (Object.keys(projects).length) {
      setHaveProjects(true);
    }
  }, [projects]);

  return haveProjects;
};
