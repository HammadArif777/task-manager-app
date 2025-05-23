import React, { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import axios from "axios";
import { toast } from "react-toastify";
const isDeadlineExceeded = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

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
  const isOverdue = isDeadlineExceeded(deadline);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteTaskItem = () => {
    try {
      dispatch(deleteTask(id));
      setIsModalOpen(false); // Close modal after deleting
      toast.success("Task is deleted successfully");
    } catch (error) {
      console.log("🚀 ~ handleDeleteTaskItem ~ error:", error);
      toast.error(error.message);
    }
  };
  const handleImportantTask = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/tasks/${id}`
      );
    } catch (error) {
      console.log("🚀 ~ handleImportantTask ~ error:", error);
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
            <span>
              {status}{" "}
              {isOverdue && (
                <span className="badge bg-danger">Deadline Passed</span>
              )}
            </span>
            <span
              className="cursor-pointer"
              role="button"
              onClick={() => handleImportantTask(id)}
            >
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
