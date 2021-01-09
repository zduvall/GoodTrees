const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { asyncHandler } = require("./utils");

router.post("/",
  asyncHandler(async (req, res) => {
    const {
      climbStatus,
      userId,
      treeId,
      deleteFC
    } = req.body;

    // Check if it already exists and store in variable. Will be object or null
    const existingFC = await db.ForestConnection.findOne({
      where: {
        userId,
        treeId
      }
    })

    if (deleteFC) {
      await existingFC.destroy()
      res.json({ existingFC });
      
    } else if (existingFC) {
      await existingFC.update({
        climbStatus,
      });
      res.json({ existingFC });

    } else {
      const newFC = await db.ForestConnection.create({
        climbStatus,
        userId,
        treeId
      });
      res.json({ newFC });
    }
  })
);

module.exports = router;