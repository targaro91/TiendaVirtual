const { info } = require('console');

module.exports = {


  friendlyName: 'New',


  description: 'New producto.',

  files: ['mediaFiles'],

  inputs: {
    codigo: {
      type: 'string',
      description: '',
      required: true
    },

    mediaFiles: {
      description: "Media files",
      example: '===',
      required: false
    },

    nombre: {
      type: 'string',
      description: '',
      required: true
    },
    precio: {
      type: 'number',
      description: '',
      required: true
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


  fn: async function ({ codigo, nombre, precio, mediaFiles, detalles, descripcion }) {
    
    // All done.
    var util = require('util');

    // Upload the image.
    let filename = undefined;
    if (mediaFiles && mediaFiles._files[0] ) {
      let stream = mediaFiles._files[0].stream;
      let extname = stream.filename.split('.')[1];
      filename = codigo + '.' + extname;
      const basedir=sails.config.appPath+'\\.tmp\\public\\productpicture';
      var infoArr = await sails.uploadOne(stream, {
        saveAs: basedir+'\\'+filename,
      })
        .intercept((err) => new Error('The photo upload failed: ' + util.inspect(err)));

      if (!infoArr) {
        throw 'noFileAttached';
      }

    }

    // Create a new "thing" record.
    const producto = await Producto.create({
      codigo: codigo,
      nombre: nombre,
      precio: precio,
      pathpicture: filename,
    });




    // Return the newly-created thing, with its `imageSrc`
    return {
      OK: "OK"
    };

  }


};
