/**
 * Factura.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    fecha: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: '13/1/2022'
    },
    consecutivo: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: '1e2001'
    },
    codigo: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 255,
      example: 'aer3456'
    },
    productosFactura: {
      collection: 'ProductoFactura',
      via: 'factura'
    },
    datosEntrega: {
      collection: 'DatosEntrega',
      via: 'factura'
    },
    estadoFactura: {
      collection: 'EstadoFactura',
      via: 'factura'
    },
    productoFactura: {
      collection: 'ProductoFactura',
      via: 'factura'
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

