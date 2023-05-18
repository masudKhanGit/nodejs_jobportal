export const handleCustomError = (_req, _res, next) => {
  const error = new Error("404 not found");
  error.status = 404;
  next(error);
};

export const handleError = (error, _req, res, _next) => {
  console.log("Error", error);

  if (error.status)
    return res.status(error.status).json({ success: false, message: error.message });

  res.status(500).json({ success: false, message: 'Something went wrong' });
};
