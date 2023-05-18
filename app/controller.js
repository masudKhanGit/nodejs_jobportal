export const handleHealth = (_req, res) => {
  res.status(200).json({
    status: "OK",
  });
};
