const { info } = require('console');

module.exports = {


  friendlyName: 'New',


  description: 'New producto.',

   files: ['mediaFiles'],

  inputs: {
    codigo: {
      type: 'string',
      description: '',
      required : true
    },
    
    mediaFiles : {
      description : "Media files",
      example: '===',
      required : false
     },

    nombre: {
      type: 'string',
      description: '',
      required : true
    },
    precio: {
      type: 'number',
      description: '',
      required : true
    },
    descripcion: {
      type: 'string',
      description: ''
    },
    detalles: {
      type: 'string',
      description: ''
    }
  },


  exits: {

  },


  fn: async function ({codigo, nombre, precio, mediaFiles, detalles, descripcion}) {

    // All done.
    var url = require('url');
    var util = require('util');

    // Upload the image.
    var infoArr = await sails.upload(mediaFiles, {
      maxBytes: 3000000
    })
    // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
    // `maxBytes` for both skipper-disk and skipper-s3.
    .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
    .intercept((err)=>new Error('The photo upload failed: '+util.inspect(err)));

    if(!infoArr) {
      throw 'noFileAttached';
    }

    const info = infoArr[0];
    let fd=info.fd.split("\\");
    let pathpicture=fd[fd.length-1];
    
    // Create a new "thing" record.
    const producto = await Producto.create({
      codigo: codigo,
      nombre: nombre,
      precio: precio,
      pathpicture: pathpicture,
    });
    

    

    // Return the newly-created thing, with its `imageSrc`
    return { OK: "OK"
    };

  }


};
