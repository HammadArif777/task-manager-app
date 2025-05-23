import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import { PiEmpty } from "react-icons/pi";

import { items, loading } from "../features/tasks/taskSelectors";
import TaskItem from "../components/TaskItem";
import Loader from "../components/Loader";
import { filterSelector } from "../features/generals/generalSelector";

const ImportantTask = () => {
  const dispatch = useDispatch();
  const loader = useSelector(loading);
  const allTasks = useSelector(items)?.filter((t) => t.important);
  const { title, description, status } = useSelector(filterSelector);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Debounce filter logic
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
    }, 400);
    setIsLoading(false);
    return () => clearTimeout(timeout);
  }, [allTasks, title, description, status]);

  if (loader || isLoading) return <Loader />;

  return (
    <div>
      <div className="h1">{allTasks?.length > 0 && "All Tasks"}</div>
      <ul style={{ listStyle: "none" }} className="d-flex gap-2 flex-wrap">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((t) => (
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
        ) : (
          <div className="h1 no-task-message">
            No Task yet <PiEmpty />
          </div>
        )}
      </ul>
    </div>
  );
};

export default ImportantTask;
