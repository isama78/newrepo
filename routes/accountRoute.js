/* ******************************************
 * Account routes
 * Unit 4, deliver login view activity
 * ******************************************/
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

/* ******************************************
 * Deliver Login View
 * Unit 4, deliver login view activity
 * ******************************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ******************************************
 * Deliver Registration View
 * Unit 4, deliver registration view activity
 * ******************************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/* ******************************************
 * Process registration
 * Unit 4, process registration  activity
 * ******************************************/
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ******************************************
 * Process login
 * Unit 4, process login activity
 * ******************************************/
//router.post("/login", utilities.handleErrors(accountController.loginAccount))

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.loginAccount)
)

module.exports = router