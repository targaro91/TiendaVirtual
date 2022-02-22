import Big from 'big.js';

const CUENTA = 'CUENTA';
const CUENTA_DEBE = 'CUENTA_DEBE';
const CUENTA_HABER = 'CUENTA_HABER';
const CUENTA_ANTERIOR = 'CUENTA_ANTERIOR';
const BINARY_OPERATOR = 'BINARY_OPERATOR';
const PLAN = 'PLAN';
const PARENT_OPEN = 'PARENT_OPEN';
const MODULO = 'MODULO';
const PARENT_CLOSE = 'PARENT_CLOSE';
const NUM = 'NUM';
const END = 'END';
const SUMATORIA_PLAN = "SUMATORIA_PLAN";

const MATCH_NUM = /[+-]?\d+(\.\d+)?/;
const MATCH_CUENTA = /CC((\d+:\d+)|\d+|X)(\.((\d+:\d+)|\d+|X)){0,3}/; //Acepta cuentas desconocidas CC101.0100.X
const MATCH_CUENTA_DEBE = /CD((\d+:\d+)|\d+|X)(\.((\d+:\d+)|\d+|X)){0,3}/; //Acepta cuentas desconocidas CD101.0100.X
const MATCH_CUENTA_HABER = /CH((\d+:\d+)|\d+|X)(\.((\d+:\d+)|\d+|X)){0,3}/;
const MATCH_CUENTA_ANTERIOR = /CA((\d+:\d+)|\d+|X)(\.((\d+:\d+)|\d+|X)){0,3}/;
//const MATCH_CUENTA = /C\d+(\.\d+){0,3}/;   
const MATCH_FORMULA = /F\d+C\d+/;
const MATCH_SUM_FILA_FORMULA = /F\d+:F\d+C\d+/;
const MATCH_SUM_FILA_FORMULA_EXTERNA = /M\d+->F\d+:F\d+C\d+/;
const MATCH_FORMULA_EXTERNA = /M\d+->F\d+C\d+/;
const MATCH_PLAN = /PF\d+m\d{1,2}/; //PF2m1 0 PF2m0 done mes 0 es el actual
const MATCH_SUMATORIA_PLAN = /PF\d+m\d{1,2}:m\d{1,2}/;
const MATCH_PLAN_EXTERNO = /M\d+->PF\d+m\d{1,2}/; //M5920PF2m1
const MATCH_SUMATORIA_PLAN_EXTERNO = /M\d+->PF\d+m\d{1,2}:m\d{1,2}/;
const MATCH_WHITES = /\s+/;
const MATCH_BIN_OP = /[+-/*:]/;
const MATCH_MODULO = /\|/;


//Solo devuelve si se encontro el patron desde el inicio de la cadena
RegExp.prototype.bexec = function (s) {

    var li = this.lastIndex;
    var m = this.exec(s);
    if (m && m.index == li)
        return m;
    return null;
}


class Token {
    constructor(token, param, posIni, datos = undefined) {
        this.token = token;
        this.param = param;
        this.datos = datos;
        this.posIni = posIni;
    }
}

export class Calc {
    constructor(cadena, aux, selfModelCode) {

        this.index = 0;
        this.selfModelCode = selfModelCode;
        this.aux = aux;
        this.tokens = this.generarTokens(cadena);
    }

    cadena() {
        let cad = "";
        this.tokens.forEach(t => {
            cad += t.param;
        });

        return cad;
    }
    consume() {
        this.index++;
        return this.peek();
    }
    peek() {
        return this.tokens[this.index];
    }



    parsePrimaryExpr() {
        let t = this.peek();
        let exp;
        if (t)
            switch (t.token) {
                case PLAN:
                case CUENTA:
                case CUENTA_DEBE:
                case CUENTA_HABER:
                case CUENTA_ANTERIOR:
                    this.consume();
                    if (t.token !== PLAN)
                        exp = this.aux.getCuenta(t.param.substring(2), t.token);
                    else
                        exp = this.aux.getPlan(t.datos.modelo, t.datos.fila, t.datos.mes);
                    return exp;
                case NUM:
                    this.consume();
                    exp = parseFloat(t.param);
                    return exp;
                case SUMATORIA_PLAN:
                    this.consume();
                    exp = exp = this.aux.sumatoriaPlan(t.datos.modelo, t.datos.fila, t.datos.mesIni, t.datos.mesFin);
                    return exp;

                case PARENT_OPEN:
                    this.consume();
                    exp = this.parseExpr();
                    t = this.peek();
                    if (t && t.token !== PARENT_CLOSE)
                        throw new SyntaxError("Se expera )");
                    this.consume();
                    return exp;
                case MODULO:
                    this.consume();
                    exp = this.parseExpr();
                    t = this.peek();
                    if (t && t.token !== MODULO)
                        throw new SyntaxError("Se expera |");
                    this.consume();
                    exp = exp > 0 ? exp : exp * -1;
                    return exp;

                default: {
                    console.log("Token no experado:"+t.param+" indexToken"+ this.index);
                    //console.log(this.cadena);
                    console.log(this.tokens);


                }

            }
        else
            throw new SyntaxError("Se expera expresion final.");
    }

    matchToken(arrTipo) {
        let next = false;
        let t = this.peek();
        for (let index = 0; index < arrTipo.length; index++) {
            const tipo = arrTipo[index];

            if (t && t.token === tipo) {
                next = true;
                break;
            }

        }
        if (!next)
            throw SyntaxError('Se esperaba el token: ' + arrTipo);
    }

    parseMulExpr() {
        let numIzq = this.parsePrimaryExpr();
        numIzq = new Big(numIzq);
        let t = this.peek();
        while (t && (t.param === "*" || t.param === "/")) {
            let operator = t.param;
            this.consume();
            let numDer = this.parsePrimaryExpr();

            if (operator === "*")
                numIzq = numIzq.times(numDer);
            else
                numIzq = numIzq.div(numDer);
            t = this.peek();

        }
        return numIzq.toNumber();
    }

    parseExpr() {
        let numIzq = this.parseMulExpr();

        numIzq = new Big(numIzq);
        let t = this.peek();

        while (t && (t.param === "+" || t.param === "-")) {
            this.consume();
            let numDer = this.parseMulExpr();

            if (t.param === "+")
                numIzq = numIzq.plus(numDer);
            else
                numIzq = numIzq.minus(numDer);
            t = this.peek();

        }
        return numIzq.toNumber();
    }

    result() {
        return this.parseExpr();
    }



    generarTokens(cadena) {
        let arrTokens = [];
        let indexCadena = 0;



        //Importante respetar el orden en mapT
        let mapT = { CUENTA_ANTERIOR: MATCH_CUENTA_ANTERIOR, CUENTA_DEBE: MATCH_CUENTA_DEBE, CUENTA_HABER: MATCH_CUENTA_HABER, CUENTA: MATCH_CUENTA, NUM: MATCH_NUM, MODULO: MATCH_MODULO, BINARY_OPERATOR: MATCH_BIN_OP, PARENT_OPEN: /\(/, PARENT_CLOSE: /\)/ };

        const consume = (match) => {
            let str = match[0];
            indexCadena += str.length;
        };

        let match;
        while (indexCadena < cadena.length) {
            let comp = cadena.substring(indexCadena);


            if (match = MATCH_WHITES.bexec(comp)) {
                consume(match);

            } else if (match = MATCH_SUM_FILA_FORMULA_EXTERNA.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/M|->F|:F|C/);
                const modelo = arr[1];
                const filaIni = arr[2];
                const filaFin = arr[3];
                const columna = arr[4];

                if (filaIni > filaFin)
                    throw new SyntaxError('Error en rango de sumatoria:' + match[0]);

                arrTokens.push(new Token(PARENT_OPEN, '(', indexCadena));
                for (let fila = filaIni; fila <= filaFin; fila++) {
                    let cad = '(' + this.aux.getFormula(modelo, fila.toString(), columna) + ')';
                    cad += fila < filaFin ? '+' : '';
                    let fTokens = (new Calc('', this.aux, modelo)).generarTokens(cad);
                    arrTokens = arrTokens.concat(fTokens);
                }
                arrTokens.push(new Token(PARENT_CLOSE, ')', indexCadena));
            }
            else if (match = MATCH_FORMULA_EXTERNA.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/M|->F|C/);
                const modelo = arr[1];
                const fila = arr[2];
                const columna = arr[3];
                let cad='(' + this.aux.getFormula(modelo, fila, columna) + ')';
                let fTokens = (new Calc('', this.aux, modelo)).generarTokens(cad);;
                arrTokens = arrTokens.concat(fTokens);

            } else if (match = MATCH_SUM_FILA_FORMULA.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/F|:F|C/);
                const filaIni = parseInt(arr[1]);
                const filaFin = parseInt(arr[2]);
                const columna = arr[3];
                if (filaIni > filaFin)
                    throw new SyntaxError('Error en rango de sumatoria:' + match[0]);

                arrTokens.push(new Token(PARENT_OPEN, '(', indexCadena));
                for (let fila = filaIni; fila <= filaFin; fila++) {

                    let cad = '(' + this.aux.getFormula(this.selfModelCode, fila.toString(), columna) + ')';
                    cad += fila < filaFin ? '+' : '';
                    let fTokens = this.generarTokens(cad);
                    arrTokens = arrTokens.concat(fTokens);
                }
                arrTokens.push(new Token(PARENT_CLOSE, ')', indexCadena));

            }
            else if (match = MATCH_FORMULA.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/[FC]/);
                const fila = arr[1];
                const columna = arr[2];
                let fTokens = this.generarTokens('(' + this.aux.getFormula(this.selfModelCode, fila, columna) + ')');
                arrTokens = arrTokens.concat(fTokens);

            } else if (match = MATCH_SUMATORIA_PLAN_EXTERNO.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/M|->PF|m|:m/);
                //
                const modelo = arr[1];
                const fila = arr[2];
                const mesIni = parseInt(arr[3]);
                const mesFin = parseInt(arr[4]);

                arrTokens.push(new Token(SUMATORIA_PLAN, match[0], indexCadena, { modelo: modelo, fila: fila.toString(), mesIni: mesIni, mesFin: mesFin }));

            }
            else if (match = MATCH_PLAN_EXTERNO.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/M|->PF|m/);
                const modelo = arr[1];
                const fila = arr[2];
                const mes = arr[3];

                arrTokens.push(new Token(PLAN, match[0], indexCadena, { modelo: modelo, fila: fila, mes: mes }));

            } else if (match = MATCH_SUMATORIA_PLAN.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/PF|m|:m/);
                //
                const fila = arr[1];
                const mesIni = arr[2];
                const mesFin = arr[3];

                arrTokens.push(new Token(SUMATORIA_PLAN, match[0], indexCadena, { modelo: this.selfModelCode, fila: fila.toString(), mesIni: mesIni, mesFin: mesFin }));

            }
            else if (match = MATCH_PLAN.bexec(comp)) {
                consume(match);
                let arr = match[0].split(/PF|m/);
                const fila = arr[1];
                const mes = arr[2];

                arrTokens.push(new Token(PLAN, match[0], indexCadena, { modelo: this.selfModelCode, fila: fila, mes: mes }));

            } else {
                let arr = Object.keys(mapT);
                for (let i = 0; i < arr.length; i++) {
                    const key = arr[i];
                    match = mapT[key].bexec(comp)
                    if (match) {
                        arrTokens.push(new Token(key, match[0], indexCadena));
                        consume(match);
                        break;
                    }

                }

            }

            if (!match) {
                throw SyntaxError("Error lexico: "+comp+' cadena analizada: '+cadena);
            }
                
        }

        return arrTokens;

    }




}


//new Calc("C101+C102.90/(C201+23)",false, aux).result();