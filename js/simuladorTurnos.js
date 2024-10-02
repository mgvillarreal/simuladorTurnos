let especialidadSeleccionada = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;
let idBloque = null;

/*const turnosDisponibles = [
    {especialidad: "Odontología General", fechas: ["16-09-2024 9hs", "18-09-2024 9hs", "20-09-2024 9hs"]},
    {especialidad: "Odontología Estética", fechas: ["17-09-2024 15hs", "19-09-2024 15hs"]},
    {especialidad: "Implantes Dentales", fechas: ["16-09-2024 15hs", "18-09-2024 15hs"]},
    {especialidad: "Cirugía Oral", fechas: ["17-09-2024 9hs", "19-09-2024 9hs", "21-09-2024 17hs"]},
    {especialidad: "Ortodoncia", fechas: ["18-09-2024 17hs", "20-09-2024 15hs"]},
    {especialidad: "Endodoncia", fechas: ["16-09-2024 17hs", "19-09-2024 17hs"]},
    {especialidad: "Periodoncia", fechas: ["17-09-2024 17hs", "21-09-2024 9hs"]},
    {especialidad: "Odontopediatría", fechas: ["20-09-2024 17hs", "21-09-2024 15hs"]},
]*/

/* -- FUNCIONES -- */
function seleccionarEspecialidad(especialidad) { //Guarda la especialidad seleccionada en localStorage
    localStorage.setItem('especialidadSeleccionada', especialidad);
}

function mostrarConfirmacion(){ //Toma los datos del localStorage para mostrar mensaje
    const mensaje = document.getElementById('mensaje');
    mensaje.classList.remove('d-none');

    const datosTurno = JSON.parse(localStorage.getItem('turno'));
    const especialidad = localStorage.getItem('especialidadSeleccionada');

    mensaje.innerHTML = `Se ha confirmado un turno para ${datosTurno.nombre} ${datosTurno.apellido} 
    en la especialidad de ${especialidad} para el día ${datosTurno.fecha} a las ${datosTurno.hora}.`;

    mensaje.classList.remove('d-none');
    
    document.getElementById('turnoForm').reset();
}

function ocultarBloque(idBloque){
    document.getElementById(idBloque).style.display = 'none';
}

function mostrarBloque(idBloque){
    document.getElementById(idBloque).style.display = 'block';
}

/* -- EVENTOS -- */
/* Selección de especialidades */
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const especialidadSeleccionada = card.innerText;
        seleccionarEspecialidad(especialidadSeleccionada);
        ocultarBloque('containerEspecialidades');
        mostrarBloque('containerFormulario');
    });
});

/* Envío del formulario */
document.getElementById('turnoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    const turno = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        fecha: fecha,
        hora: hora
    };

    localStorage.setItem('turno', JSON.stringify(turno));

    mostrarConfirmacion();
    
    document.getElementById('turnoForm').reset();
});
