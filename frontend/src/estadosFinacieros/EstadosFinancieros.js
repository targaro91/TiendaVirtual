import { Calc } from "./DataDinCalc";
import Big from 'big.js';
import axios from 'axios'
import { SERVER_API } from "../helpers/static";


const MAP_TIPO_SALDO = { 'CUENTA': 'maySaldo', 'CUENTA_DEBE': 'mayDebe', 'CUENTA_HABER': 'mayHaber', 'CUENTA_ANTERIOR': 'maySaldoA' };

export class EstadosFinacieros {
    constructor(modelos, balanceArbol, planModelos, periodo) {
        let mapModelos = {};
        modelos.forEach(m => {
            if (m.codigo && m.codigo.length > 0)
                mapModelos[m.codigo] = m;
        });


        let mapPlanModelos = {};
        planModelos.forEach(m => {
            mapPlanModelos[m.codigo] = m;
        });

        this.modelos = mapModelos;// map modelos por codigo
        this.balanceArbol = balanceArbol;
        this.planModelos = mapPlanModelos;
        this.periodo = periodo; //{ano: 2021: mes: 1}


        this.initAux();
    }

    initAux() {
        let aux = {};
        //Implementar verificacion que exista la cuenta
        aux.getFormula = (modelCode, fila, columna) => {
            try {
                let modelo = this.modelos[modelCode];
                let f = modelo.filas[fila - 1];
                let formula = f.formulas[columna - 1].formula
                return formula;
            } catch (error) {
                throw new SyntaxError('No existe formula en el modelo:' + modelCode + " fila:" + fila + " columna:" + columna);
            }

        };

        aux.getPlan = (modeloCode, fila, mes = 0) => {
            try {
                let plan = this.planModelos[modeloCode].planes_indicador[fila - 1].planes_mes[mes - 1].plan;
                return parseFloat(plan);
            } catch (error) {
                throw new SyntaxError('Error al buscar el plan de modelo:' + modeloCode + ' fila:' + fila + ' mes:' + mes);
            }

        };

        aux.getCuenta = (cuenta, tipoSaldo) => {
            cuenta = cuenta.split('.');
            let saldo = new Big(0);

            try {
                let childs = this.balanceArbol;

                for (let index = 0; index < cuenta.length; index++) {
                    const cta = cuenta[index] === '' ? '' : cuenta[index];
                    if (cta === 'X' || /^\d+:\d+/.test(cta)) {

                        Object.keys(childs).forEach(key => {
                            cuenta[index] = key;
                            let nCuenta = cuenta.join('.');
                            if (cta === 'X')
                                saldo = saldo.plus(this.aux.getCuenta(nCuenta, tipoSaldo));
                            else {
                                let arr = cta.split(':');

                                let cuentaIni = parseInt(arr[0]);
                                let cuentaFin = parseInt(arr[1]);
                                if (cuentaIni > cuentaFin)
                                    throw new SyntaxError('Rango incorecto:' + cta);

                                if (parseInt(key) >= cuentaIni && parseInt(key) <= cuentaFin)
                                    saldo = saldo.plus(this.aux.getCuenta(nCuenta, tipoSaldo));
                            }

                        });

                        break;
                    } else if (/^\d+:\d+/.test(cta)) {
                        let arr = cta.split(':');
                        let cuentaIni = parseInt(arr[0]);
                        let cuentaFin = parseInt(arr[1]);
                        if (cuentaIni > cuentaFin) {
                            let syntaxError = new SyntaxError('Rango incorecto:' + cta);
                            syntaxError.syntaxError=true;
                            throw syntaxError;
                        }
                            

                        Object.keys(childs).forEach(key => {
                            if (parseInt(key) >= cuentaIni && parseInt(key) <= cuentaFin) {
                                cuenta[index] = key;
                                let nCuenta = cuenta.join('.');
                                saldo = saldo.plus(this.aux.getCuenta(nCuenta, tipoSaldo));
                            }
                        });

                        break;
                    } else {
                        let child = childs[cta];
                        childs = child.childs;
                        if (index === cuenta.length - 1) {
                            saldo = new Big(child[MAP_TIPO_SALDO[tipoSaldo]]);
                        }
                    }
                }
            } catch (error) { // Implementar: Identificar SyntaxError y lanzarlos.
                //console.log(error);
                
                return 0;
            }
            saldo = saldo.toNumber();
            return saldo;
        };

        aux.sumatoriaPlan = (modelo, fila, mesIni, mesFin) => {
            mesIni = parseInt(mesIni);
            mesFin = parseInt(mesFin);
            mesFin = mesFin > 0 ? mesFin : this.periodo.mes;
            if (mesIni > mesFin)
                throw new SyntaxError('Mes inicio debe ser mayor que mes fin');
            let suma = new Big(0);
            for (let index = mesIni; index <= mesFin; index++) {
                suma = suma.plus(aux.getPlan(modelo, fila, index));
            }
            return suma.toNumber();
        };

        this.aux = aux;
    }

    generar() {
        let partes = [];
        Object.values(this.modelos).forEach(m => {
            let parte = {};
            parte.entidadModeloId = m.EntidadModeloId;
            parte.fecha = this.periodo.ano + '-' + this.periodo.mes + '-' + 1;
            parte.filas = this.calcularModelo(m);
            partes.push(parte);
        });

        console.log(partes);

        this.enviar(partes);

        return true;
    }

    enviar(partes) {
        const url = SERVER_API + "/datosmodelo/entidad"
        axios.post(url, partes)
            .then((response) => {
                console.log("Respuesta de: " + url);
                console.log(response.data);

                if (response.data.ok) {
                    console.log("Mensaje insertado con exito");
                    console.log(response.data.ok);
                } else {
                    console.log(response.data.error);
                }

            }
            ).catch(function (error) {
                console.log(error);
            })
    }


    calcularModelo(modelo) {
        let datosFila = {};
        console.log('Calculando Modelo:' + modelo.codigo);

        modelo.filas.forEach(fila => {
            let datosColumnas = [];

            for (let index = 0; index < modelo.columnas.length; index++) {
                const formula = fila.formulas[index];
                let result = 0;
                if (formula && formula.formula && formula.formula.length > 0) {
                    let calc = new Calc(formula.formula, this.aux, modelo.codigo);

                    console.log(calc.cadena());
                    result = calc.result();
                }
                datosColumnas.push(result);
            }
            datosFila[fila.id] = datosColumnas;
        });

        console.log('Modelo calculado.');

        return datosFila;
    }


}