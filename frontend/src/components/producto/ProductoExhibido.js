import React from 'react';
import { SERVER_PICTURE } from '../../helpers/static';

export default function ProductoExhibido(props) {

    return <div className='container productoExhibido'>
        <div >
            <img className='portafolio' src={SERVER_PICTURE+"/"+props.data.pathpicture} />
        </div>
        <div className='caption'>
            <a className='tituloProductoExhibidor' href="" >{props.data.nombre}</a>
            <div className='descripcionProductoExhibido'>
                <p >{props.data.descripcion}</p>
            </div>

        </div>
        <div class="d-flex justify-content-end">
            <div >
                <button type="button" class="btn btn-addcart ">
                    <i class="bi bi-cart3"></i>
                </button>
            </div>
            <span>&nbsp;</span>
            <div >
                <button type="button" class="btn btn-pay">
                    <i class="bi bi-credit-card-2-back"></i>
                </button>
            </div>
        </div>

    </div>;
}
