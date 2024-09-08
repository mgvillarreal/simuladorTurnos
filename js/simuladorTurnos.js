let especialidad = "";
let especialidadSeleccionada = false;
let nombreEspecialidad = "";
let fechasDisponibles = [];
let fechaTurno = "";
let fechaSeleccionada = false;
let respuestaConfirmar = false;

const fechasGeneral = ["16-09-2024 9hs", "18-09-2024 9hs", "20-09-2024 9hs"];
const fechasEstetica = ["17-09-2024 15hs", "19-09-2024 15hs"];
const fechasImplantes = ["16-09-2024 15hs", "18-09-2024 15hs"];
const fechasCirugia = ["17-09-2024 9hs", "19-09-2024 9hs", "21-09-2024 17hs"];
const fechasOrtodoncia = ["18-09-2024 17hs", "20-09-2024 15hs"];
const fechasEndodoncia = ["16-09-2024 17hs", "19-09-2024 17hs"];
const fechasPeriodoncia = ["17-09-2024 17hs", "21-09-2024 9hs"];
const fechasPediatria = ["20-09-2024 17hs", "21-09-2024 15hs"];

function solicitarEspecialidad(){
    do{
        especialidad = Number(prompt("Seleccione una especialidad:\n 1 = Odontología General\n 2 = Odontología Estética\n 3 = Implantes Dentales\n 4 = Cirugía Oral\n 5 = Ortodoncia\n 6 = Endodoncia\n 7 = Periodoncia\n 8 = Odontopediatría"));

        if(especialidad === 0){ //Detiene la ejecución si usuario clickea botón Cancelar
            break;
        }
        else{
            validarSeleccionEspecialidad(especialidad); 
        }

    }while(!especialidadSeleccionada);
}

function validarSeleccionEspecialidad(especialidad){
    if(especialidad < 1 || especialidad > 8){ //Valida que el número ingresado esté en el rango de las opciones
        alert("Ha ingresado una opción inválida. Intente nuevamente.");
    }
    else{
        especialidadSeleccionada = true;
        asignarDatosEspecialidad(especialidad);
    }
}

function asignarDatosEspecialidad(especialidad){
    switch(especialidad){ //Asigna las fechas disponibles y nombre de especialidad de acuerdo a la opción seleccionada
        case 1:
            nombreEspecialidad = "Odontología General";
            fechasDisponibles = fechasGeneral;
            break;
        case 2:
            nombreEspecialidad = "Odontología Estética";
            fechasDisponibles = fechasEstetica;
            break;
        case 3:
            nombreEspecialidad = "Implantes Dentales";
            fechasDisponibles = fechasImplantes;
            break;
        case 4:
            nombreEspecialidad = "Cirguía Oral";
            fechasDisponibles = fechasCirugia;
            break;
        case 5:
            nombreEspecialidad = "Ortodoncia";
            fechasDisponibles = fechasOrtodoncia;
            break;
        case 6:
            nombreEspecialidad = "Endodoncia";
            fechasDisponibles = fechasEndodoncia;
            break;
        case 7:
            nombreEspecialidad = "Periodoncia";
            fechasDisponibles = fechasPeriodoncia;
            break;
        default:
            nombreEspecialidad = "Odontopediatría";
            fechasDisponibles = fechasPediatria;
            break;
    }
    solicitarFecha();
}

function solicitarFecha(){    
    do{
        let mensaje = "Seleccione una fecha disponible:"
        for(let i=0; i<fechasDisponibles.length; i++){
            mensaje += `\n ${i+1} = ${fechasDisponibles[i]}`;
        }
        fechaTurno = Number(prompt(mensaje));

        if(fechaTurno === 0){ //Detiene la ejecución si usuario clickea botón Cancelar
            especialidad = 0; //Resetea la opción de especialidad seleccionada antes
            break;
        }
        else{
            validarSeleccionFecha(fechaTurno); 
        }
        
    }while(!fechaSeleccionada);
}

function validarSeleccionFecha(fechaTurno){
    if(fechaTurno < 1 || fechaTurno > fechasDisponibles.length){ //Valida que el número ingresado esté en el rango de las opciones
        alert("Ha ingresado una opción inválida. Intente nuevamente.");
    }
    else{
        fechaSeleccionada = true;
        confirmarTurno();
    }
}

function confirmarTurno(){
    respuestaConfirmar = confirm(`Está pidiendo un turno para la especialidad de ${nombreEspecialidad} para el ${fechasDisponibles[fechaTurno-1]} \n¿Confirmar?`);

    if(respuestaConfirmar){
        alert("Su turno se ha agendado correctamente.");
    }
    else{
        alert("Solicite un turno nuevamente.");
    }
}

/* EJECUTA SIMULADOR */
solicitarEspecialidad();

