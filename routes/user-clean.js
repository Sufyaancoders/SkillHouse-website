const express = require('express');
const router = express.Router();

// Debug route to verify router is working
router.get('/ping', (req, res) => {
  res.json({ message: "Router is working!" });
});

// Export ONLY the router
module.exports = router;