const express = require('express');
const authControllers = require('../controllers/auth');
const authMiddlewares = require('../middlewares/auth');
const validateMiddleware = require('../middlewares/validate');
const validateLogin = require('../validations/auth/login');
const validateRegister = require('../validations/auth/register');

const router = express.Router();

const requireAuth = authMiddlewares.requireAuth;
const requireLogin = authMiddlewares.requireLogin;

router.get('/', (req, res, next) => {
  res.json({ success: true, title: 'Auth API Interface' });
});

router.post(
  '/signup',
  validateMiddleware(validateRegister),
  authControllers.signUp,
);
router.post(
  '/signin',
  [validateMiddleware(validateLogin), requireLogin],
  authControllers.signIn,
);
router.post('/signout', requireAuth, authControllers.signOut);
router.post('/user', requireAuth, authControllers.viewProfile);

module.exports = router;
