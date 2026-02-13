const utilities = require(".")
const invModel = require("../models/inventory-model")
const reviewModel = require("../models/review-model")
const { body, validationResult } = require("express-validator")
const validate = {}

/* Review Data Validation Rules */
validate.reviewRules = () => {
  return [
    body("review_text")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Review text is required."),
    body("review_rating")
      .trim()
      .escape()
      .notEmpty()
      .isInt({ min: 1, max: 5 })
      .withMessage("Please select a rating between 1 and 5 stars."),
  ]
}

/* Check Review Data */
validate.checkReviewData = async (req, res, next) => {
  const { inv_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    // If there are errors, we need to reload the inventory item
    // to display the detail view correctly
    const data = await invModel.getInventoryById(inv_id)
    const reviews = await reviewModel.getReviewsByInvId(inv_id)
    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      nav,
      item: data,
      reviews,
      errors,
    })
    return
  }
  next()
}

module.exports = validate