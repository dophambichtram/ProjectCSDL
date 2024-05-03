const express = require("express");
const router = express.Router();
const UserAdminController = require("../../controllers/admin/user.controller");

router.get("/", UserAdminController.getListUser);
router.patch("/:userId", UserAdminController.updateUser);
router.delete("/:userId", UserAdminController.deleteUser);

module.exports = router;
