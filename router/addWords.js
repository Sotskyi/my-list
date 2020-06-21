const express = require("express");
const router = express.Router();
const { getWords,addWords,translate,sendData,allWords,listName } = require("../controllers/controller");
router
.route("/")
.get(getWords)
.post(addWords)
router.route("/translate")
.post(translate)
// .get(sendData)
router.route("/list")
.get(allWords)
router.route('/listname')
.get(listName)
module.exports = router;
