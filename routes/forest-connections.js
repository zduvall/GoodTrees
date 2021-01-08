const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { asyncHandler } = require("./utils");

router.post("/",
  asyncHandler(async (req, res) => {
    const {
      climbStatus,
      favStatus,
      userId,
      treeId
    } = req.body;
    
    const forestConnection = await db.ForestConnection.create({
      climbStatus,
      favStatus,
      userId,
      treeId
    });
    res.json({ forestConnection });
  })
);

module.exports = router;