import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask } from "../features/tasks/taskSlice";
import { items, loading } from "../features/tasks/taskSelectors";
import TaskItem from "../components/TaskItem";
import Loader from "../components/Loader";
const Tasks = () => {
  const dispatch = useDispatch();
  const loader = useSelector(loading);
  const allTasks = useSelector(items);
  console.log("🚀 ~ Tasks ~ allTasks:", allTasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="">
      <div className="h1">All Tasks</div>
      <ul style={{ listStyle: "none" }} className="d-flex gap-2 flex-wrap">
        {allTasks?.length > 0
          ? allTasks.map((t) => (
              <li key={t._id}>
                <TaskItem
                  id={t._id}
                  title={t.title}
                  description={t.description}
                  status={t.status}
                  createdAt={t.createdAt?.slice(0, 10)}
                  deadline={t.deadline?.slice(0, 10)}
                />
              </li>
            ))
          : "No Tasks yet"}
      </ul>
    </div>
  );
};

export default Tasks;
