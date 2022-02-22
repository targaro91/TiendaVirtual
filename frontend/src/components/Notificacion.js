import React, { Component } from 'react';

import './Notificacion.css';

class Notificacion extends Component {
	render() {
		return (

			<div className="notify">
				<div className="col-md-3 col-sm-3 col-xs-3">
					<div className="notify-img">
						<img src="http://placehold.it/45x45" alt="" />
					</div>
				</div>
				<div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
					Recoger Motor
					<p>Lorem ipsum sit dolor amet consilium.</p>

					<hr />
					<p className="time">Şimdi</p>
				</div>
			</div>

		);
	}


}
export default Notificacion;