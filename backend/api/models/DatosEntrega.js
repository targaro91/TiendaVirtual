/**
 * DatosEntrega.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: 'Carlos Gonzales'
    },
    ci: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: '91081920908'
    },
    direccion: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: 'calle c #40'
    },
    telefono: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: '23446789, 52167890'
    },
    recojerentienda: {
      type: 'number',
      required: true,
      example: 0
    },
    factura: {
      model: 'Factura',
      unique: true,
      columnName: 'Facturaid'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

