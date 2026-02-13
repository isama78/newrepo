const express = require("express")
const router = new express.Router()
const revCont = require("../controllers/review-controller")
const revValidate = require("../utilities/review-validation")
const utilities = require("../utilities/")

// Route to process new review
router.post(
  "/add",
  utilities.checkLogin, // Make sure user is logged in
  revValidate.reviewRules(),
  revValidate.checkReviewData,
  utilities.handleErrors(revCont.addReview)
)

// Deliver Edit View
router.get("/edit/:review_id", utilities.checkLogin, utilities.handleErrors(revCont.buildEditView))

// Process Review Update
router.post("/update", 
    utilities.checkLogin, 
    revValidate.reviewRules(), 
    revValidate.checkReviewData, 
    utilities.handleErrors(revCont.updateReview)
)

// Deliver Delete Confirmation View
router.get("/delete/:review_id", utilities.checkLogin, utilities.handleErrors(revCont.buildDeleteView))

// Process Delete
router.post("/delete", utilities.checkLogin, utilities.handleErrors(revCont.deleteReview))

module.exports = router