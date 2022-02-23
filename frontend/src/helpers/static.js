export const SERVER = 'http://localhost:1337'
export const SERVER_API = SERVER+'/api/v1'
export const SERVER_PICTURE = SERVER+'/productpicture'
//export const SERVER_API = 'https://'+window.location.hostname+'/api/v1'
export const HTTP_RESPONSE_ERROR = 450
//agregado por david


export const SECTION_TAREAS = 'SECTION_TAREAS'
export const SECTION_RESUMENPARTES = 'SECTION_RESUMENPARTES'
export const SECTION_PARTEEMPRESA = 'SECTION_PARTEEMPRESA'
export const RELOAD = 'RELOAD'
export const OK = "OK"

export const NORMAL = {id: 1, tipo: "NORMAL"}
export const SUMADA = {id: 2, tipo: "SUMADA"}
export const AGRUPADA = {id: 3, tipo:"AGRUPADA"}
export const OBSERVACION = {id: 0, tipo:"OBSERVACION"}

export const ROL_SUPERADMIN = 'SUPERADMIN'
export const ROL_PLAN = 'PLAN'
export const ROL_PLAN_ENTIDAD = 'PLAN_ENTIDAD'
export const ROL_AGENDA = 'AGENDA'
export const ROL_SUPERVISOR = 'SUPERVISOR'
export const ROL_OPTEI = 'OPTEI'
export const ROL_PRODUCTORES = 'PRODUCTORES'
export const ROL_OPERADOR = 'OPERADOR'
export const ROL_SUPERVISOR_ENTIDAD ='SUPERVISOR_ENTIDAD'
export const ROL_PROCESADOR_PARTES = 'PROCESADOR_PARTES'
export const ROL_PROCESADOR_DEPENDENCIA_PARTES = 'PROCESADOR_DEPENDENCIA_PARTES'
export const ROL_PROCESADOR_ESTADISTICO = 'PROCESADOR_ESTADISTICO'


export const PARTE_PRODUCTIVO='PARTE PRODUCTIVO'
export const PARTE_ENTREGAS='PARTE ENTREGAS'
export const PARTE_ENERGIA='PARTE ENERGÍA'
export const PARTE_COBERTURA='PARTE COBERTURA'
export const PARTE_COBERTURA_CALCULADO='PARTE COBERTURA CALCULADO'
export const PARTE_CONTRATACION='PARTE CONTRATACIÓN'
export const PARTE_ESTADOS_FINACIEROS='ESTADOS FINANCIEROS'
export const PARTE_OTROS_MODELOS_ESTADISTICOS='OTROS MODELOS ESTADISTICOS'
export const PARTE_ESTADOS_FINACIEROS_CIERRE_ANO='ESTADOS FINANCIEROS CIERRE DE AÑO'
export const PARTE_ESTADOS_FINACIEROS_REEXPRESADO='ESTADOS FINANCIEROS REEXPRESADO'
export const PARTE_BALANCE='BALANCE'

export const PROVINCIAS=["Pinar del Río", "Artemisa", "La Habana", "Mayabeque", "Matanzas", "Cienfuegos", "Villa Clara", "Sancti Spíritus", "Ciego de Ávila", "Camagüey", "Las Tunas", "Granma", "Holguín", "Santiago de Cuba", "Guantánamo", "Municipio Especial Isla de la Juventud"]

export const MAP_PATH_DATOSPARTES = { 'Parte Productivo': "/plan/parteproductivo", 'Parte Entregas': "/datoparte/parteproductivo", 'Parte Energia': "/datoparte/parteproductivo" }
export const MAP_PARTES_PLANIFICACION = { 'Parte Productivo': true, 'Parte Entregas': true, 'Parte Energia': true, 'Parte Cobertura': true }


export const IndexPlanDia=0
export const IndexRealDia=1
export const IndexDifDia=2
export const IndexPlanAcumMes=3
export const IndexAcumMes=4
export const IndexDifAcumMes=5
export const IndexPlanMes=6
export const IndexRealMes=7 // Igual que IndexAcumMes
export const IndexDifMes=8
export const IndexPlanAcumAno=9
export const IndexAcumAno=10
export const IndexDifAno=11





//CObertura Calculado
export const CoberturaIndexInventario=0
export const CoberturaIndexConsPromDiario=1
export const CoberturaIndexEntrada=2
export const CoberturaIndexConsumo=3
export const CoberturaIndexCobertura=4

//Contratacion
export const ContratacionReal=0
export const ContratacionAcumulado=1

export const IMPORT_MESSAGE = 'Espere. Importando fichero...';

//FactoryComponent
export const ComponentParteAgrupadoPlan12='ParteAgrupadoPlan12';
export const ComponentParteCoverturaPlan5='ParteCoverturaPlan5';
export const ComponentParteContratacion2='ParteContratacion2';
export const ComponentParteSimple='ParteSimple';
export const ComponentParteEstadistico = 'ParteEstadistico';
export const ComponentParteBalance = 'ParteBalance';
export const ComponentInformeParte='InformeParte';
export const ComponentInformePartesDependencia='InformePartesDependencia';
export const ComponentTabPlan='TabPlan';

//
export const MESSAGE_PASSWORD="La contraseña debe tener 8-30 caracteres , al menos un dígito, minúscula, mayúscula y un caracter especial. Ejemplo: Datadin1567*";

export const MESES={1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'};