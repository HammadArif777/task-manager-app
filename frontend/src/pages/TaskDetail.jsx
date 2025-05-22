import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById } from "../features/tasks/taskSlice"; // create this thunk
import { selectedTask, loading } from "../features/tasks/taskSelectors";
import Loader from "../components/Loader";

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const task = useSelector(selectedTask);
  const isLoading = useSelector(loading);

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [id]);

  if (isLoading) return <Loader />;

  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created at: {task.createdAt?.slice(0, 10)}</p>
      <p>Deadline: {task.deadline?.slice(0, 10)}</p>
    </div>
  );
};

export default TaskDetail;
