class RLink {


    //Definicion de links

    static admin(params = false) {
        const route = "";
        return RLink.result(route, params);
    }

    static empresas(params = false) {
        const route = "/empresas";
        return RLink.result(route, params);
    }

    static usuarios(params = false) {
        const route = "/usuarios";
        return RLink.result(route, params);
    }

    static modelos(params = false) {
        const route = "/modelos";
        return RLink.result(route, params);
    }

    static modelos_new(params = false) {
        const route = "/modelos/new";
        return RLink.result(route, params);
    }

    static modelos_$modeloId_edit(params = false) {
        const route = "/modelos/:modeloId/edit";
        return RLink.result(route, params);
    }

    static modelos_$modeloId(params = false) {
        const route = "/modelos/:modeloId";
        return RLink.result(route, params);
    }

    static modelos_$modeloId_filas(params = false) {
        const route = "/modelos/:modeloId/filas";
        return RLink.result(route, params);
    }

    static empresas_$empresaId_edit(params = false) {
        const route = "/empresas/:empresaId/edit";
        return RLink.result(route, params);
    }

    static empresas_$empresaId_dependencias(params = false) {
        const route = "/empresas/:empresaId/dependencias";
        return RLink.result(route, params);
    }

    static empresas_$empresaId_usuarios(params = false) {
        const route = "/empresas/:empresaId/usuarios";
        return RLink.result(route, params);
    }

    static empresas_new(params = false) {
        const route = "/empresas/new";
        return RLink.result(route, params);
    }

    static empresas_plan_$entidadModeloId(params = false) {
        const route = "/empresas/plan/:entidadModeloId";
        return RLink.result(route, params);
    }




    //



    //
    static ExceptionRLink(cadena) {
        return 'ExceptionRLink' + cadena;
    }

    static result(route, params) {
        if (params)
            return RLink.replace(route, params);
        else
            return route;

    }

    static replace(route, params) {
        let result = route;
        let exp = /:[a-zA-Z0-9]+/;

        Object.keys(params).forEach(param => {
            result = result.replace(":" + param, params[param]);
            delete params[param];
        });

        if (Object.keys(params).length > 0 || exp.test(result)) {
            throw this.ExceptionRLink('Inconsistencia en parametros');
        }
        return result;
    }


}

export default RLink;