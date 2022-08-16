const cardRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardControllers = require('../controllers/cards');
const { linkRegular } = require('../utils/regularExpressions');

cardRoutes.get('/cards', cardControllers.getCards);
cardRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(linkRegular),
    }),
  }),
  cardControllers.postCard,
);

cardRoutes.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.checkId,
);

cardRoutes.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.deleteCard,
);

cardRoutes.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.checkId,
);
cardRoutes.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.putLikes,
);

cardRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.checkId,
);
cardRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  cardControllers.deleteLikes,
);

module.exports = cardRoutes;
