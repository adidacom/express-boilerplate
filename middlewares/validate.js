module.exports = validate => (req, res, next) => {
  const { errors, isValid } = validate(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  next();
};
