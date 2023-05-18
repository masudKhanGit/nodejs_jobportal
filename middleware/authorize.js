/**
 *
 * @param {string[]} roles
 * @returns
 */

function authorize(roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    
    return res.status(403).json({ success: false, message: "you do not have enough permission" });
  };
}

export default authorize;
