const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userControllers = require('../controllers/users');
const { linkRegular } = require('../utils/regularExpressions');

userRoutes.get('/users', userControllers.getUsers);
userRoutes.get('/users/me', userControllers.getUserMe);

userRoutes.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  userControllers.getUserById,
);

userRoutes.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  userControllers.patchUser,
);
userRoutes.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(linkRegular),
    }),
  }),
  userControllers.patchAvatar,
);

module.exports = userRoutes;
