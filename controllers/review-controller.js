const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

const revCont = {}

/* ***************************
 * Add Review
 * ************************** */
revCont.addReview = async function (req, res) {
  const { inv_id, account_id, review_text, review_rating } = req.body
  const reviewResult = await reviewModel.addReview(
    review_text,
    inv_id,
    account_id,
    review_rating
  )

  if (reviewResult) {
    req.flash("notice", "Review added successfully.")
    res.status(201).redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Error adding review.")
    res.status(501).redirect(`/inv/detail/${inv_id}`)
  }
}

/* Build Edit Review View */
revCont.buildEditView = async function (req, res) {
  const review_id = parseInt(req.params.review_id)
  const reviewData = await reviewModel.getReviewById(review_id)
  let nav = await utilities.getNav()
  res.render("review/edit-review", {
    title: "Edit Review",
    nav,
    errors: null,
    review_text: reviewData.review_text,
    review_rating: reviewData.review_rating,
    review_id: reviewData.review_id
  })
}

/* Process Review Update */
revCont.updateReview = async function (req, res) {
  const { review_text, review_id, review_rating } = req.body
  const updateResult = await reviewModel.updateReview(review_id, review_text, review_rating)

  if (updateResult) {
    req.flash("notice", "The review was successfully updated.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.redirect(`/review/edit/${review_id}`)
  }
}

/* Build Delete Review View */
revCont.buildDeleteView = async function (req, res) {
  const review_id = parseInt(req.params.review_id)
  const reviewData = await reviewModel.getReviewById(review_id)
  let nav = await utilities.getNav()
  res.render("review/delete-review", {
    title: "Delete Review",
    nav,
    errors: null,
    review_date: reviewData.review_date,
    review_text: reviewData.review_text,
    review_id: reviewData.review_id
  })
}

/* Process Review Deletion */
revCont.deleteReview = async function (req, res) {
  const review_id = parseInt(req.body.review_id)
  const deleteResult = await reviewModel.deleteReview(review_id)

  if (deleteResult) {
    req.flash("notice", "The review was successfully deleted.")
  } else {
    req.flash("notice", "Sorry, the deletion failed.")
  }
  res.redirect("/account/")
}

module.exports = revCont