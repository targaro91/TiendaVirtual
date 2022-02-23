module.exports = {


  friendlyName: 'Index',


  description: 'Index producto.',


  inputs: {

    query: {
      type: 'string',
      description: ''
    },
    skip: {
      type: 'number',
      description: ''
    },
    limit: {
      type: 'number',
      description: ''
    },

  },


  exits: {

  },


  fn: async function ({query='', skip, limit}) {

    // All done.
    let productos = await Producto.find().where({ 'nombre' : { contains : query } }).skip(skip).limit(limit);

    return productos;

  }


};
