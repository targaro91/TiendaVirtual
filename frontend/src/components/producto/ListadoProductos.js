import React from 'react';
import ProductoExhibido from "./ProductoExhibido";

export default function ListadoProductos(props) {

  return <div className="container">
    {procesarProductos()}
  </div>;
}


const procesarProductos = (list = []) => {
  list = [{ codigo: "Papa 500g", descripcion: 'Papa 500g \n250 kcal\n12g grasas' },
  { codigo: "Gel de bano para despues de dcuharse etc", srcimg: "https://static.katapulk.com/variants/7ssgh5ybwddqj75bwc43ztpz32ly/5d6ad88bd48642fdcc9ac85baaf60ed99a3ae29a6ed69eb0dd3c61c387500a81" }, { codigo: "puerco" }, { codigo: "pepino 123" },
  { codigo: "camaron" }, { codigo: "jurel" }, { codigo: "Troncho" }, { codigo: "Aceite Pomo 2lt" }, { codigo: "langosta 123" }];

  let listRows = [];
  let listElements = [];

  list.forEach(producto => {
    producto.srcimg = !producto.srcimg ? "https://static.katapulk.com/variants/im1ix1rsp23hfyi44nvnu64099vc/5d6ad88bd48642fdcc9ac85baaf60ed99a3ae29a6ed69eb0dd3c61c387500a81" : producto.srcimg

    listElements.push(<div key={"col-" + producto.codigo} className="col-lg-4 col-sm-6 col-xs-12" >
      <ProductoExhibido data={producto} />
    </div>);

  });

  listRows.push(<div key={"row-" + 1} className="row">
    {listElements}
  </div>);

  return listRows;

}