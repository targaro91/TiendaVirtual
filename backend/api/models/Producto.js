/**
 * Producto.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const ProductoDespacho = require("./ProductoDespacho");

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    nombre: {
      type: 'string',
      required: true,
      maxLength: 255,
      example: 'Camaron 200g'
    },
    codigo: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 255,
      example: '23a45f'
    },
    precio: {
      type: 'number',
      required: true,
      example: 12.95
    },
    pathpicture: {
      type: 'string',
      maxLength: 255,
      example: 'camaron200.jpg'
    },
    descripcion: {
      type: 'string',
      maxLength: 255,
      example: 'Camaron congelado'
    },
    detalles: {
      type: 'string',
      maxLength: 255,
      example: 'x100g \n calorias: 500 \n grasas: 3.4g'
    },
    clasificacion:{
      model:'Clasificacion',
      columnName: 'Clasificacionid'
    },
    productoAlmacen: {
      collection:'ProductoAlmacen',
      via: 'producto'
    },
    productoDespacho: {
      collection:'ProductoDespacho',
      via: 'producto'
    },
    productoReservado: {
      collection:'ProductoReservado',
      via: 'producto'
    },
    productoFactura: {
      collection:'ProductoFactura',
      via: 'producto'
    }
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

