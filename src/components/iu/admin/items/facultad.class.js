//Clase para exportar jurados
export class Facultad{
    nombre_facultad = '';
    list_carreras = [];
    constructor(nombre_facultad, list_carreras){
        this.nombre_facultad = nombre_facultad;
        this.list_carreras = list_carreras;
    }

    pushCarrera(carrera){
        this.list_carreras.push(carrera);
    }
}