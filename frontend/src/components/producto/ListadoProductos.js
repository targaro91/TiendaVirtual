import React, { useState, useEffect } from 'react';
import { Api } from '../../helpers/Api';
import ProductoExhibido from "./ProductoExhibido";

export default function ListadoProductos(props) {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    Api.getProductos().then(result => {
      console.log(result);
      setProductos(result.data);
    })
  }, productos);

  const procesarProductos = () => {
  
    let listRows = [];
    let listElements = [];
  
    productos.forEach(producto => {
      listElements.push(<div key={"col-" + producto.codigo} className="col-lg-4 col-sm-6 col-xs-12" >
        <ProductoExhibido data={producto} />
      </div>);
  
    });
  
    listRows.push(<div key={"row-" + 1} className="row">
      {listElements}
    </div>);
  
    return listRows;
  
  }


  return <div className="container">
    {procesarProductos()}
  </div>;
}


