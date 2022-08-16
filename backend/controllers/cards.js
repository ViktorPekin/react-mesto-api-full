const Card = require('../models/card');
const NotFoundError = require('../utils/NotFoundError');
const AccessError = require('../utils/AccessError');
const BadRequestError = require('../utils/BadRequestError');

exports.checkId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточки с данным _id не существует');
      }
      next();
    }).catch(next);
};

exports.getCards = (req, res, next) => {
  Card.find({}).then((card) => res.send({ card }))
    .catch(next);
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardDel) => res.send({ cardDel }))
          .catch(next);
      } else {
        const accessError = new AccessError('Удаление чужой карточки запрещено');
        next(accessError);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточки с данным _id не существует'));
      } else {
        next(err);
      }
    });
};

exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неправельно введены данные'));
      } else {
        next(err);
      }
    });
};

exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточки с данным _id не существует'));
      } else {
        next(err);
      }
    });
};

exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточки с данным _id не существует'));
      } else {
        next(err);
      }
    });
};
