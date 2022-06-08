module.exports = (req, res, next) => {
  console.log(req);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        token: "123456 ",
      });
    } else {
      return res.status(400, { message: "登录失败" });
    }
  }
  next();
};
