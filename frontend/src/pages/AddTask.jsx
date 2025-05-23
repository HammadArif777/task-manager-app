// src/components/AddTaskForm.js
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import RequiredField from "../components/RequiredField";
import Select from "react-select";
import { emptyTask, TASK_STATUS } from "../constants/general.constant";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, createTask } from "../features/tasks/taskSlice";
import { fetchById } from "../../utils/general.utils";
import { themeSelector } from "../features/generals/generalSelector";

const AddTaskForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { themeColor, fontColor } = useSelector(themeSelector);
  const { id } = useParams();
  const [formData, setFormData] = useState(emptyTask);

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.value,
    }));
  };
  useEffect(() => {
    const fetchEditObj = async () => {
      if (id) {
        try {
          const { data } = await fetchById({ id });
          setFormData(data);
        } catch (error) {
          console.log("🚀 ~ useEffect ~ error:", error);
        }
      } else {
        setFormData(emptyTask);
      }
    };
    fetchEditObj();
  }, [id]);
  const [errors, setErrors] = useState({});

  const selectTheme = themeColor !== "whitesmoke" ? "bg-dark" : "bg-light";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    if (name === "title" && value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be at most 100 characters",
      }));
    } else if (name === "description" && value.length > 500) {
      setErrors((prev) => ({
        ...prev,
        description: "Description must be at most 500 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check
    const newErrors = {};
    if (formData.title.trim().length === 0) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be at most 100 characters";
    }

    if (formData.description.trim().length === 0) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be at most 500 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // ✅ Show the new validation errors
      return;
    }

    try {
      if (id) {
        dispatch(updateTask({ id, task: formData }));
      } else {
        dispatch(createTask(formData));
      }
      toast.success(`Task is ${id ? "updated" : "created"} successfully!`);
      setFormData({
        title: "",
        description: "",
        deadline: "",
        status: "To Do",
      });

      setErrors({}); // Also clear any previous errors
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="h1">{id ? "Update task" : "Create task"}</div>
      <ToastContainer />
      <form
        style={{ backgroundColor: themeColor, color: fontColor }}
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm"
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
            <RequiredField />
          </label>
          <input
            style={{ backgroundColor: themeColor, color: fontColor }}
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength="100"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
            <RequiredField />
          </label>
          <textarea
            style={{ backgroundColor: themeColor, color: fontColor }}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
            rows="4"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            Deadline
          </label>
          <input
            style={{ backgroundColor: themeColor, color: fontColor }}
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            Status
          </label>
          <Select
            options={TASK_STATUS}
            value={TASK_STATUS.find(
              (option) => option.value === formData.status
            )}
            onChange={handleStatusChange}
          />
        </div>
        <button
          type="submit"
          className="btn text-white"
          style={{ backgroundColor: "#B95CF4" }}
        >
          {id ? "Update task" : "Add task"}
        </button>
      </form>
    </>
  );
};

export default AddTaskForm;
