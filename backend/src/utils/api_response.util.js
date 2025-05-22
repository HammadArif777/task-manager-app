const ApiResponse = ({ data = null, success = true, message = "ok", statusCode = 200 }) => {
  return {
    data,
    success,
    message,
    statusCode,
  };
};
export default ApiResponse;
