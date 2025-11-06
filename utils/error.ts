export const handleError = (error: any) => {
  const generalMessage = "An unexpected error accured";
  let statusCode = 500;
  let statusMessage = "unexpected error";
  let message = generalMessage;
  let data = undefined;

  if (error.response) {
    statusCode = error.response.status;
    statusMessage = error.response.statusMessage;

    if (error.response._data) {
      message = error.response._data && error.response._data.message;
      data =
        error.response._data && error.response.errors
          ? error.response.errors
          : undefined;
    }
  }

  return {
    statusCode,
    statusMessage,
    message,
    data,
  };
};
