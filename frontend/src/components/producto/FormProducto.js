import React, { useState, useEffect } from 'react';
import { Api } from '../../helpers/Api';

export default function FormProducto(props) {

    const [nombre, setNombre] = useState();
    const [codigo, setCodigo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [detalles, setDetalles] = useState();
    const [precio, setPrecio] = useState();

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = [];
        images.forEach(image => {
            let url = URL.createObjectURL(image);
            newImageURLs.push(url);
        });
        setImageURLs(newImageURLs);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function handleSubmit(event) {
        console.log("Enviando");

        const formData = new FormData();
        images.forEach(image => {
            formData.append(
                'mediaFiles',
                image,
                image.name
            );

        });
        formData.append(
            'codigo', codigo
        );
        formData.append(
            'nombre', nombre
        );
        formData.append(
            'precio', precio
        );


        Api.postProductoNew(formData).then(result => {
            console.log(result);

        }
        ).catch(error => console.log(error));
    
    }

    return <div className='container'>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(e) }}>
            <h6>Inserte Producto</h6>
            <br />
            <div class="form-group mb-3">
                <label class="form-label">Código</label>
                <input type="text" class="form-control" onChange={e => setCodigo(e.target.value)} />
                <small class="text-muted">ej. "12a56"</small>
            </div>
            <div class="form-group mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" onChange={e => setNombre(e.target.value)} />
                <small class="text-muted">ej. "Papa Frita 500g"</small>
            </div>
            <div class="form-group">
                <label class="form-label">Precio</label>
                <input type="number" class="form-control" onChange={e => setPrecio(e.target.value)} />
                <small class="text-muted">ej. "12.95"</small>
            </div>
            <br />

            <div className=''>
                <input type="file" multiple accept='image/*' onChange={onImageChange} />
                {imageURLs.map(imageSrc => <img key={imageSrc} src={imageSrc} />)}

            </div>
            <input type="submit" value="Enviar" />

        </form>



    </div>;
}


