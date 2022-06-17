const Boom = require('@hapi/boom');
const Joi = require('joi');

const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const failAction = (request, h, err) => {
  const error = Boom.badRequest(err);
  delete error.output.payload.statusCode;
  delete error.output.payload.error;
  error.output.payload.status = 'fail';
  throw error;
}

const addSchema = Joi.object({
  name: Joi.string().required().error(
    new Error(`Gagal menambahkan buku. Mohon isi nama buku`)
  ),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().max(Joi.ref('pageCount')).required().error(
    new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')
  ),
  reading: Joi.boolean().required(),
});

const editSchema = Joi.object({
  name: Joi.string().required().error(
    new Error(`Gagal memperbarui buku. Mohon isi nama buku`)
  ),
  year: Joi.number().optional(),
  author: Joi.string().optional(),
  summary: Joi.string().optional(),
  publisher: Joi.string().optional(),
  pageCount: Joi.number().optional(),
  readPage: Joi.number().max(Joi.ref('pageCount')).optional().error(
    new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')
  ),
  reading: Joi.boolean().optional(),
});

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      validate: {
        payload: addSchema,
        failAction,
      },
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
    options: {
      validate: {
        payload: editSchema,
        failAction
      }
    }
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  }
];

module.exports = routes;
