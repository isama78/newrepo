/* ***************************
 * Review Model
 * ************************** */
const pool = require("../database/")

/* Add new review with rating */
async function addReview(review_text, inv_id, account_id, review_rating) {
  try {
    const sql = "INSERT INTO public.review (review_text, inv_id, account_id, review_rating) VALUES ($1, $2, $3, $4) RETURNING *"
    return await pool.query(sql, [review_text, inv_id, account_id, review_rating])
  } catch (error) {
    return error.message
  }
}

/* Update review text AND rating */
async function updateReview(review_id, review_text, review_rating) {
  try {
    const sql = "UPDATE public.review SET review_text = $1, review_rating = $2, review_date = CURRENT_TIMESTAMP WHERE review_id = $3 RETURNING *"
    return await pool.query(sql, [review_text, review_rating, review_id])
  } catch (error) {
    return error.message
  }
}

async function getReviewsByInvId(inv_id) {
  try {
    const sql = `SELECT r.*, a.account_firstname, a.account_lastname 
                 FROM public.review r 
                 JOIN public.account a ON r.account_id = a.account_id 
                 WHERE r.inv_id = $1 ORDER BY r.review_date DESC`
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    return error.message
  }
}

/* Get all reviews by account ID */
async function getReviewsByAccountId(account_id) {
  try {
    const sql = `SELECT r.*, i.inv_make, i.inv_model 
                 FROM public.review r 
                 JOIN public.inventory i ON r.inv_id = i.inv_id 
                 WHERE r.account_id = $1 
                 ORDER BY r.review_date DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getReviewsByAccountId error " + error)
  }
}

/* Get a specific review by ID */
async function getReviewById(review_id) {
  try {
    const sql = "SELECT * FROM public.review WHERE review_id = $1"
    const result = await pool.query(sql, [review_id])
    return result.rows[0]
  } catch (error) {
    return error.message
  }
}

/* Delete a review */
async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM public.review WHERE review_id = $1"
    return await pool.query(sql, [review_id])
  } catch (error) {
    return error.message
  }
}

module.exports = { addReview, getReviewsByInvId, getReviewsByAccountId, getReviewById, updateReview, deleteReview }
