import React, { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
const changeStatusColor = (status) => {
  switch (status) {
    case "To Do":
      return "text-warning";

    case "In Progress":
      return "text-primary";
    case "Done":
      return "text-success";
  }
};
const TaskItem = ({ id, title, description, createdAt, status, deadline }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteTaskItem = () => {
    try {
      dispatch(deleteTask(id));
      setIsModalOpen(false); // Close modal after deleting
    } catch (error) {
      console.log("🚀 ~ handleDeleteTaskItem ~ error:", error);
    }
  };
  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          modalDescription={"Do you want to delete this task?"}
          modalTitle={"Are you sure?"}
          onHandleSaveChanges={handleDeleteTaskItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="card" style={{ width: "450px" }}>
        <div className={`card-header ${changeStatusColor(status)}`}>
          <div className="d-flex justify-content-between">
            <span>{status}</span>
            <span>
              <TfiHeart />
            </span>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title ellipsis">{title}</h5>
          <p className="card-text ellipsis">{description}</p>
          <p className="card-text">Created At: {createdAt}</p>
          <p className="card-text">Deadline {deadline ?? "-"}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => setIsModalOpen(true)}
            >
              <IoTrashBinOutline size={30} />
            </span>
            <span>
              <Link to={`/tasks/update-task/${id}`}>
                <FaRegEdit size={30} />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
