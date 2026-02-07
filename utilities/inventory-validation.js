const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * Rules for Classification
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlphanumeric()
      .withMessage("The classification cannot contain spaces or special characters.")
      .isLength({ min: 1 })
      .withMessage("Name is required.")
  ]
}

/* **********************************
 * Rules for Inventory
 * ********************************* */
validate.inventoryRules = () => {
  return [
    body("classification_id").notEmpty().withMessage("Select a classification."),
    body("inv_make").trim().isLength({ min: 3 }).withMessage("Minimum 3 characters for make."),
    body("inv_model").trim().isLength({ min: 3 }).withMessage("Minimum 3 characters for model."),
    body("inv_year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Invalid year."),
    body("inv_description").notEmpty().withMessage("Description is obligatory."),
    body("inv_image").notEmpty().withMessage("Image path is obligatory."),
    body("inv_thumbnail").notEmpty().withMessage("Thumbnail path is obligatory."),
    body("inv_price").isNumeric().withMessage("Price must be a number."),
    body("inv_miles").isNumeric().withMessage("Miles must be a number."),
    body("inv_color").trim().notEmpty().withMessage("Color is obligatory.")
  ]
}

validate.newInventoryRules = () => {
  return [
    body("inv_id").notEmpty().withMessage("ID of vehicle is obligatory."),
    body("classification_id").notEmpty().withMessage("Select a classification."),
    body("inv_make").trim().isLength({ min: 3 }).withMessage("Minimum 3 characters for make."),
    body("inv_model").trim().isLength({ min: 3 }).withMessage("Minimum 3 characters for model."),
    body("inv_year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Invalid year."),
    body("inv_description").notEmpty().withMessage("Description is obligatory."),
    body("inv_image").notEmpty().withMessage("Image path is obligatory."),
    body("inv_thumbnail").notEmpty().withMessage("Thumbnail path is obligatory."),
    body("inv_price").isNumeric().withMessage("Price must be a number."),
    body("inv_miles").isNumeric().withMessage("Miles must be a number."),
    body("inv_color").trim().notEmpty().withMessage("Color is obligatory.")
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

validate.checkInventoryData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
    })
    return
  }
  next()
}
 
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/edit-inventory", {
      errors,
      title: "Update Vehicle",
      nav,
      classificationSelect,
      inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
    })
    return
  }
  next()
}

module.exports = validate