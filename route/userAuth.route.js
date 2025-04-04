const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middleware/jwt.middleware");
const roleAuthorize = require("../middleware/role.middleware");
const { ratelimiter } = require("../middleware/rateLimiter.middleware");

// controllers
const {
  createUserAuth,
  login,
  allUsers,
  registeredUserDetails,
  updateUserDetailsById,
  getUserDataById,
  userDeleteById,
} = require("../controller/userAuth.controller");
// routes

router.get("/hello", (req, res) => {
  res.send("welcome users...");
});

router.post("/register", createUserAuth);

// login route
router.post("/login", login);

router.get("/all_users", ratelimiter, allUsers);

// get customer role data
router.get(
  "/registered_customer",
  verifyToken,
  roleAuthorize("customer"),
  registeredUserDetails
);

// admin
router.get(
  "/registered_admin",
  verifyToken,
  roleAuthorize("admin"),
  registeredUserDetails
);

// registered employee
router.get(
  "/registered_employee",
  verifyToken,
  roleAuthorize("employee"),
  registeredUserDetails
);

// get users by role dynamically
router.get(
  "/users_by_role/:role",
  verifyToken,
  roleAuthorize("employee"),
  registeredUserDetails
);

// endpoint : http://localhost:4001/api/v2/update/user/details/67ec2d425176e8c8b5f324a8
router.put("/update/user/details/:id", updateUserDetailsById);

// get user by id for all roles
// endpoint : http://localhost:4001/api/v2/userId/:id
router.get("/userId/:id", ratelimiter, verifyToken, getUserDataById);

// delete user by id
router.delete(
  "/delete_user",
  verifyToken,
  roleAuthorize("admin"),
  userDeleteById
);

router.get("/protected", verifyToken, roleAuthorize("customer"), (req, res) => {
  res.status(200).send("Access granted to protected route");
});

module.exports = router;


