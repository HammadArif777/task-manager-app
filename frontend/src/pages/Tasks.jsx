import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import { PiEmpty } from "react-icons/pi";

import { items, loading } from "../features/tasks/taskSelectors";
import TaskItem from "../components/TaskItem";
import Loader from "../components/Loader";
import {
  filterSelector,
  renderStyleSelector,
} from "../features/generals/generalSelector";

const Tasks = () => {
  const dispatch = useDispatch();
  const loader = useSelector(loading);
  const renderStyle = useSelector(renderStyleSelector);
  const allTasks = useSelector(items);
  const { title, description, status } = useSelector(filterSelector);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const filtered = allTasks.filter((task) => {
        const matchesTitle = task.title
          ?.toLowerCase()
          .includes(title.toLowerCase());
        const matchesDescription = task.description
          ?.toLowerCase()
          .includes(description.toLowerCase());
        const matchesStatus = task.status
          ?.toLowerCase()
          .includes(status.toLowerCase());

        return matchesTitle && matchesDescription && matchesStatus;
      });

      setFilteredTasks(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [allTasks, title, description, status]);

  if (loader || isLoading) return <Loader />;

  // 🔹 Group tasks by status
  const pendingTasks = filteredTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  );
  const completedTasks = filteredTasks.filter((task) => task.status === "Done");

  const renderTasks = (tasks) =>
    tasks.map((t) => (
      <div key={t._id} className="mb-3 task-wrapper">
        <TaskItem
          id={t._id}
          title={t.title}
          description={t.description}
          status={t.status}
          createdAt={t.createdAt?.slice(0, 10)}
          deadline={t.deadline?.slice(0, 10)}
        />
      </div>
    ));

  return (
    <>
      {renderStyle === "column" ? (
        <div className="container">
          <div className="row gx-4">
            <div className="col-md-4">
              <h4>Pending</h4>
              {renderTasks(pendingTasks)}
            </div>
            <div className="col-md-3">
              <h4>In Progress</h4>
              {renderTasks(inProgressTasks)}
            </div>
            <div className="col-md-3">
              <h4>Completed</h4>
              {renderTasks(completedTasks)}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="h1">{filteredTasks?.length > 0 && "All Tasks"}</div>
          <ul style={{ listStyle: "none" }} className="d-flex gap-2 flex-wrap">
            {filteredTasks?.length > 0 ? (
              filteredTasks.map((t) => (
                <li key={t._id} className="task-wrapper">
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
            ) : (
              <div className="h1 no-task-message">
                No Task yet <PiEmpty />
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Tasks;
