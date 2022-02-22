import React from 'react';
import ListadoProductos from "./producto/ListadoProductos";

export default function Exibhidor(props) {

    return <div className="container-sm container-md container"> 
    <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 sidebar">
            Menu
        </div>
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-12">
            <ListadoProductos/>
        </div>
    </div>
    </div>   ;
  }
