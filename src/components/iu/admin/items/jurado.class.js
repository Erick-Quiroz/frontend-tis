//Se usa para crear mesas de eleccion de forma aleatoria desde back y front
export class Jurado {
    nombre_carrera = '';
    list_jurados = [];
    constructor(nombre_carrera, list_jurados){
        this.list_jurados = list_jurados;
        this.nombre_carrera = nombre_carrera;
    }
    
    pushJurado(jurado){
        this.list_jurados.push(jurado);
    }
}
