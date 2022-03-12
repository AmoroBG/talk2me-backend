// REQUIRE PACKAGES - EXTERNAL
const express = require("express");
const router = express.Router();
// REQUIRE MODULES - INTERNAL
const user = require("../controllers/user");

router.post("/user/register", user.registerUser);
router.get("/users", user.getUsers)
router.get("/user/:userId", user.getUser)
router.delete("/users", user.deleteUsers)
router.delete("/user/:userId", user.deleteUser)
router.put("/user/:userId", user.updateUserRecords)
router.patch("/user/:userId", user.updateUserRecords)
router.post("/user/login", user.userLogin)
router.get("/user/logout", user.userLogout)

module.exports = router;
