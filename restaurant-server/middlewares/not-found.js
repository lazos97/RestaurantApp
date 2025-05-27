export const notFound = (req, res) =>
  res.status(404).json({ message: "The path doesn't exists!" })
