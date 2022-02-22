// import React, { Component } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

// import TabPlanEntidadModelo from '../components/Section/PlanEntidad/TabPlanEntidadModelo';

// class FactoryRouteMenu {

// 	constructor(rol) {
// 		this.rol=rol;
// 		this.route;
// 		this.menu;

// 	}

// 	factory() {
// 		switch (this.rol) {
// 			case value:
				
// 				break;
		
// 			default:
// 				break;
// 		}
// 	}

// 	SectionPlanEntidad() {
// 		let mainPath="/plan";

// 		const rutas = () => {
// 			let arr = [];
// 			let redirect;
// 			this.props.profile.clasificacionesmodelo.forEach(element => {
// 				switch (element) {
// 					case PARTE_PRODUCTIVO:
// 					case PARTE_ENERGIA:
// 					case PARTE_ENTREGAS:
// 					case PARTE_COBERTURA_CALCULADO:
// 						arr.push(<Route exact path={mainPath + "/plan/" + element} render={(props) => <TabPlanEntidadModelo {...props} tipo={ComponentTabPlan} clasificacionparte={element} />} />)
// 						if (!redirect)
// 							redirect = <Redirect exact path={mainPath} to={mainPath + '/plan/' + element} />
// 						break

// 				}

// 			})

// 			arr.push(redirect)


// 			return arr
// 		}

// 		this.route=


// 	}

// 	render() {
// 		console.log("Renderisando SectionReports ")
// 		console.log("Match :")
// 		console.log(this.props.match)
// 		/* return(
// 			<h1>SectionParteEmpresa</h1>
// 		); */

// 		return (
// 			<React.Fragment>
// 				{ this.props.empresas && this.props.date && <Switch>
// 					<Route exact path={this.props.match.path + "/partesproductivos/:dia/:mes/:ano"} render={(props) => <ReportePartesProductivos {...props} clasificacionparte={PARTE_PRODUCTIVO} />}/>
					
// 					<Route exact path={this.props.match.path + "/partesproductivosministro/:dia/:mes/:ano"} component={ReportePartesProductivosMinistro} />
					
// 					<Route exact path={this.props.match.path + "/partesproductivos/comportamiento/:modeloParteId/:ano/:mes"} render={(props) => <ComportamientoMesFiltred {...props} clasificacionparte={PARTE_PRODUCTIVO} />}/>

// 					<Route exact path={this.props.match.path + "/partesentregas/:dia/:mes/:ano"} render={(props) => <ReportePartesProductivos {...props} clasificacionparte={PARTE_ENTREGAS} />}/>
			
// 					<Route exact path={this.props.match.path + "/partesentregas/comportamiento/:modeloParteId/:ano/:mes"} render={(props) => <ComportamientoMesFiltred {...props} clasificacionparte={PARTE_ENTREGAS} />}/>

// 					<Route exact path={this.props.match.path + "/partesenergia/:dia/:mes/:ano"} render={(props) => <ReportePartesProductivos {...props} clasificacionparte={PARTE_ENERGIA} />}/>
	
// 					<Route exact path={this.props.match.path + "/partesenergia/comportamiento/:modeloParteId/:ano/:mes"} render={(props) => <ComportamientoMesFiltred {...props} clasificacionparte={PARTE_ENERGIA} />}/>
					
// 					<Route exact path={this.props.match.path + "/partescoberturaharina/:dia/:mes/:ano"} render={(props) => <ReportePartesCoberturaHarina {...props} clasificacionparte={PARTE_COBERTURA}/>}/>

// 					<Redirect exact path={this.props.match.path} to={ this.props.match.path + "/partesproductivos/"+this.props.date.dia+"/"+this.props.date.mes+"/"+this.props.date.ano} />
// 					<Route component={NoMatchPage} />
// 				</Switch>}
// 			</React.Fragment>
// 		);
// 	}


// }

// const mapDispatchToProps = dispatch => ({})

// export default FactoryRouteMenu;