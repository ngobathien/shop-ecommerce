const isAdmin = (req, res, next) => {
  //   console.log(req.user.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Chỉ admin mới được phép thực hiện hành động này." });
  }
};
export default isAdmin;
