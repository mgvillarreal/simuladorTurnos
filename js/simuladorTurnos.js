let especialidadSeleccionada = null;
let idBloque = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;
let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();
const calendario = document.getElementById('calendario');
const mesActualDisplay = document.getElementById('mes-actual');
const fechasDisponibles = ["2024-10-10", "2024-10-12", "2024-10-15", "2024-11-05"];
const horasDisponibles = [9, 10, 11, 12, 19, 8];

/* -- FUNCIONES -- */
function seleccionarEspecialidad(especialidad) { //Guarda la especialidad seleccionada en localStorage
    localStorage.setItem('especialidadSeleccionada', especialidad);
}

function traerDatosDeLocalStorage(){
    if(window.localStorage.length !== 0){
        const datosTurno = JSON.parse(localStorage.getItem('turno'));
        const especialidad = localStorage.getItem('especialidadSeleccionada');
        const fecha = localStorage.getItem('fechaTurno');
        const hora = localStorage.getItem('horaTurno');

        const turnoGuardado = {
            especialidadGuardada: especialidad,
            fechaGuardada: fecha,
            horaGuardada: hora,
            nombreGuardado: datosTurno.nombre,
            apellidoGuardado: datosTurno.apellido,
        };

        return turnoGuardado;
    }
    else{
        return false;
    }
}

function mostrarConfirmacion(){ //Toma los datos del localStorage para mostrar mensaje
    const mensaje = document.getElementById('mensaje');
    mensaje.classList.remove('d-none');

    const turnoGuardado = traerDatosDeLocalStorage();

    mensaje.innerHTML = `<p class="mensaje">Se ha confirmado un turno para ${turnoGuardado.nombreGuardado} ${turnoGuardado.apellidoGuardado} en la especialidad de ${turnoGuardado.especialidadGuardada}, el día ${turnoGuardado.fechaGuardada} a las ${turnoGuardado.horaGuardada}:00hs.<p>`;

    mensaje.classList.remove('d-none');
    
    document.getElementById('turnoForm').reset();
}

function mostrarTurnoGuardado(){
    const turnoGuardado = traerDatosDeLocalStorage();

    if(turnoGuardado){
       mostrarBloque('containerTurnoGuardado');

        const info = document.getElementById('turno-guardado');
        info.classList.remove('d-none');

        info.innerHTML = `<h5 class="titulo"> Próximos Turnos </h5> 
        <p class="mensaje"> Especialidad de ${turnoGuardado.especialidadGuardada}, el día ${turnoGuardado.fechaGuardada} a las ${turnoGuardado.horaGuardada}:00hs. </br> Para ${turnoGuardado.nombreGuardado} ${turnoGuardado.apellidoGuardado}<p>`;

        info.classList.remove('d-none');
    }
}

function ocultarBloque(idBloque){
    document.getElementById(idBloque).style.display = 'none';
}

function mostrarBloque(idBloque){
    document.getElementById(idBloque).style.display = 'block';
}

/* -- CAMBIO DINAMICO DE FECHAS Y HORAS -- */
/* Muestra calendario */
function cargarCalendario(){
    calendario.innerHTML = `
      <div class="dia-semana">L</div>
      <div class="dia-semana">M</div>
      <div class="dia-semana">M</div>
      <div class="dia-semana">J</div>
      <div class="dia-semana">V</div>
      <div class="dia-semana">S</div>
      <div class="dia-semana">D</div>
      `;
    
    //Muestra el mes y el año actual
    const mesActualNombre = new Date(anioActual, mesActual).toLocaleString('default', {month: 'long', year: 'numeric'});
    mesActualDisplay.textContent = mesActualNombre;
    
    const primerDiaMes = new Date(anioActual, mesActual, 1).getDay(); //Obtiene el primer día del mes
    const diasEnElMes = new Date(anioActual, mesActual + 1, 0).getDate(); //Número de días en el mes
    
    //Crea espacios vacíos para los días antes del primer día del mes
    for (let i = 0; i < primerDiaMes; i++){
      const emptyDiv = document.createElement('div');
      calendario.appendChild(emptyDiv);
    }
  
    //Genera los días del mes
    for (let dia = 1; dia <= diasEnElMes; dia++){
      const fechaDiv = document.createElement('div');
      const fechaStr = `${anioActual}-${(mesActual + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
      
      fechaDiv.textContent = dia;
      
      if (fechasDisponibles.includes(fechaStr)){
          fechaDiv.classList.add('disponible');
          fechaDiv.addEventListener('click', function(){
              document.querySelectorAll('.calendario-grid div').forEach(div => div.classList.remove('seleccion'));
              this.classList.add('seleccion');
              fechaSeleccionada = fechaStr;
          });
      } else{
          fechaDiv.classList.add('nodisponible');
      }
  
      calendario.appendChild(fechaDiv);
    }
}
  
/* Navegación entre meses */
 document.getElementById('mes-previo').addEventListener('click', () => {
    mesActual--;
    if (mesActual < 0){
        mesActual = 11;
        anioActual--;
    }
    cargarCalendario();
});
  
document.getElementById('mes-despues').addEventListener('click', () => {
    mesActual++;
    if (mesActual > 11){
        mesActual = 0;
        anioActual++;
    }
    cargarCalendario();
});
  
/* Muestra horario */
function cargarHorarios(){
    let primeraHora = 8;
    const horario = document.getElementById('horario-grid');
    horario.innerHTML = '';
  
    for (let horasTrabajo = 0; horasTrabajo <= 11; horasTrabajo++){
        const horaDiv = document.createElement('div');
        const horaNmbr = primeraHora+horasTrabajo;
        horaDiv.textContent = `${primeraHora+horasTrabajo}:00hs`;
          
        if (horasDisponibles.includes(horaNmbr)){
            horaDiv.classList.add('disponible');
            horaDiv.addEventListener('click', function(){
                document.querySelectorAll('.horario-grid div').forEach(div => div.classList.remove('seleccion'));
                this.classList.add('seleccion');
                horaSeleccionada = horaNmbr;
            });
        } else{
            horaDiv.classList.add('nodisponible');
        }
      
        horario.appendChild(horaDiv);
    }
}

/* -- EVENTOS -- */
/* Selección de especialidades */
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const especialidadSeleccionada = card.innerText;
        seleccionarEspecialidad(especialidadSeleccionada);
        ocultarBloque('containerEspecialidades');
        mostrarBloque('containerTurnos');
    });
});

/* Selección de turno */
document.getElementById('boton-guardar').addEventListener('click', () =>{
    if (fechaSeleccionada && horaSeleccionada) {
        localStorage.setItem('fechaTurno', fechaSeleccionada);
        localStorage.setItem('horaTurno', horaSeleccionada);
        ocultarBloque('containerTurnos');
        mostrarBloque('containerFormulario');
    }
});

/* Envío del formulario */
document.getElementById('turnoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;

    const turno = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };

    localStorage.setItem('turno', JSON.stringify(turno));

    ocultarBloque('containerFormulario');
    mostrarBloque('containerMensaje');
    mostrarConfirmacion();
    
    document.getElementById('turnoForm').reset();
});

/* Acepta mensaje de confirmación */
document.getElementById('boton-aceptar').addEventListener('click', () =>{
    ocultarBloque('containerMensaje');
    mostrarBloque('containerEspecialidades');
    mostrarTurnoGuardado();
});
  
/* CARGA CALENDARIO Y HORARIO */
window.onload = () =>{
    cargarCalendario();
    cargarHorarios();
    mostrarTurnoGuardado();
};