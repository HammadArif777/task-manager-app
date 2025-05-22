import axios from "axios";

const fetchById = async ({ id }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/tasks/${id}`
    );
    return data;
  } catch (error) {
    console.log("🚀 ~ fetchById ~ error:", error);
  }
};

export { fetchById };
