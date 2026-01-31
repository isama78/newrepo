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
    body("classification_id").notEmpty().withMessage("Seleccione una clasificación."),
    body("inv_make").trim().isLength({ min: 3 }).withMessage("Marca mínima de 3 caracteres."),
    body("inv_model").trim().isLength({ min: 3 }).withMessage("Modelo mínimo de 3 caracteres."),
    body("inv_year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Año inválido."),
    body("inv_description").notEmpty().withMessage("La descripción es obligatoria."),
    body("inv_image").notEmpty().withMessage("La ruta de imagen es obligatoria."),
    body("inv_thumbnail").notEmpty().withMessage("La ruta de miniatura es obligatoria."),
    body("inv_price").isNumeric().withMessage("El precio debe ser un número."),
    body("inv_miles").isNumeric().withMessage("El kilometraje debe ser un número."),
    body("inv_color").trim().notEmpty().withMessage("El color es obligatorio.")
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

module.exports = validate