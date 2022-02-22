export const PATTERN_USERID = "^([A-Za-z0-9 .\(\)]+)$";

export const PATTERN_PASS = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,30}$";

export const PATTER_COLUM_MODEL ="^([:A-Za-z0-9áéíóúÁÉÍÓÚ\.ñÑÜü][:A-Za-z0-9áéíóúÁÉÍÓÚ\.ñÑÜü ]*)([,]{1}[:A-Za-z0-9áéíóúÁÉÍÓÚ\.ñÑÜü][:A-Za-z0-9áéíóúÁÉÍÓÚ\.ñÑÜü ]*)*";

export const PATTERN_NUMSIGNED="-?[0-9]+([\.][0-9]+)?";

//Solo letras y punto
export const PATTERN_NOMBRE="[A-Za-záéíóúÁÉÍÓÚ.ñÑÜü ]*";

//Letras, puntos y numeros
export const PATTERN_TITULO ="[A-Za-z0-9áéíóúÁÉÍÓÚ.ñÑÜü ]*";

export const PATTERN_TITULO_MODELO ="[A-Za-z0-9áéíóúÁÉÍÓÚ.ñÑÜü() ]*";

//Numero de telefono
export const PATTERN_TELF ="\\+?[0-9 ]*";

//Codigo REEUP
export const PATTERN_REEUP ="[0-9.]*";

export const PATTERN_CODIGO ="[A-Za-z0-9áéíóúÁÉÍÓÚ.ñÑÜü]*";
