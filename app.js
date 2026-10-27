// ==========================================
// 1. BASE DE DATOS DEL MENÚ (SEMANAS 1 Y 2)
// ==========================================
const menuEscolar = {
  semana1: {
    1: { dia: "Lunes", platillo: "Enfrijoladas", bebida: "Leche con chocomilk • Agua de limón" },
    2: { dia: "Martes", platillo: "Tacos dorados (Papa, Frijol, Salchicha) + sopa", bebida: "Agua de jamaica • Leche sabor fresa" },
    3: { dia: "Miércoles", platillo: "Tacos al pastor", bebida: "Agua de horchata • Chocomilk" },
    4: { dia: "Jueves", platillo: "Enchiladas verdes con pollo", bebida: "Agua de guayaba • Licuado de plátano" },
    5: { dia: "Viernes", platillo: "Lentejas con salchicha + Dobladitas de huevo", bebida: "Agua de melón" }
  },
  semana2: {
    1: { dia: "Lunes", platillo: "Arroz con huevo cocido", bebida: "Agua de limón • Chocomilk" },
    2: { dia: "Martes", platillo: "Sopes", bebida: "Agua de jamaica • Leche sabor fresa" },
    3: { dia: "Miércoles", platillo: "Tortitas de papa con atún + Espagueti", bebida: "Agua de melón • Licuado de plátano" },
    4: { dia: "Jueves", platillo: "Dobladitas (Papa, Frijol, Huevo, Chicharrón)", bebida: "Agua de horchata • Leche sabor fresa" },
    5: { dia: "Viernes", platillo: "Atún (Tostada o Galletas Saladas)", bebida: "Agua de limón • Chocomilk" }
  }
};

// ==========================================
// 2. LÓGICA DE FECHAS Y CÁLCULO DE SEMANA
// ==========================================

// Función para obtener el número de semana del año
function obtenerNumeroSemana(fecha) {
  const primeraFechaAno = new Date(fecha.getFullYear(), 0, 1);
  const dias = Math.floor((fecha - primeraFechaAno) / (24 * 60 * 60 * 1000));
  return Math.ceil((dias + primeraFechaAno.getDay() + 1) / 7);
}

// Determina si una fecha pertenece a la Semana 1 o Semana 2 del ciclo
function obtenerSemanaCiclo(fecha) {
  const numSemana = obtenerNumeroSemana(fecha);
  // Si el número de semana es par o impar determina si es Semana 1 o 2
  // Al sumar 1 sincronizamos para que la semana del 14 de sept sea Semana 1
  return ((numSemana + 1) % 2 === 0) ? "semana2" : "semana1";
}

// ==========================================
// 3. RENDERIZADO EN PANTALLA
// ==========================================

// Carga la información de "HOY" al abrir la app
function cargarMenuHoy() {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const semanaActualClave = obtenerSemanaCiclo(hoy);

  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("fecha-hoy").textContent = hoy.toLocaleDateString('es-ES', opcionesFecha);

  // Si es fin de semana (Sábado = 6, Domingo = 0)
  if (diaSemana === 0 || diaSemana === 6) {
    document.getElementById("platillo-hoy").textContent = "¡Fin de semana! 🎉";
    document.getElementById("bebida-hoy").textContent = "No hay servicio de comedor escolar hoy.";
    return;
  }

  // Obtener menú del día de hoy
  const menuHoy = menuEscolar[semanaActualClave][diaSemana];
  if (menuHoy) {
    document.getElementById("platillo-hoy").textContent = menuHoy.platillo;
    document.getElementById("bebida-hoy").textContent = "🥤 " + menuHoy.bebida;
  }
}

// Muestra los 5 días de la semana seleccionada en los botones
function mostrarSemana(numeroSemana) {
  const contenedor = document.getElementById("contenedor-semana");
  const claveSemana = `semana${numeroSemana}`;
  const datosSemana = menuEscolar[claveSemana];

  // Actualizar estado activo de botones
  document.getElementById("btn-semana1").classList.toggle("activa", numeroSemana === 1);
  document.getElementById("btn-semana2").classList.toggle("activa", numeroSemana === 2);

  // Limpiar contenido previo
  contenedor.innerHTML = "";

  // Dibujar cada día en pantalla
  Object.values(datosSemana).forEach(item => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-dia";
    tarjeta.innerHTML = `
      <div class="dia-nombre">${item.dia}</div>
      <div class="dia-info">
        <div class="dia-platillo">🍝 ${item.platillo}</div>
        <div class="dia-bebida">🥤 ${item.bebida}</div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// ==========================================
// 4. EVENTOS Y BÚSQUEDA POR FECHA
// ==========================================

const selectorFecha = document.getElementById("selector-fecha");


if (selectorFecha) {
  selectorFecha.addEventListener("change", function(evento) {
    const fechaSeleccionada = new Date(evento.target.value + "T00:00:00");
    const diaSemana = fechaSeleccionada.getDay(); // 0-6
    const semanaClave = obtenerSemanaCiclo(fechaSeleccionada);
    const resultadoDiv = document.getElementById("resultado-busqueda");

    if (resultadoDiv) {
      resultadoDiv.classList.remove("oculto");

      if (diaSemana === 0 || diaSemana === 6) {
        resultadoDiv.innerHTML = `<b>Fin de semana:</b> No hay comedor escolar programado.`;
        return;
      }

      const menuEncontrado = menuEscolar[semanaClave][diaSemana];
      const nombreSemana = semanaClave === "semana1" ? "Semana 1" : "Semana 2";

      resultadoDiv.innerHTML = `
        <small style="color:#777;">Correspondiente a <b>${nombreSemana}</b>:</small><br>
        <strong style="color:#d35400; font-size:1.1rem;">${menuEncontrado.platillo}</strong><br>
        <span style="font-size:0.9rem; color:#555;">🥤 ${menuEncontrado.bebida}</span>
      `;
    }
  });
}

// Inicializar la app al cargar la página
window.onload = function() {
  cargarMenuHoy();
  mostrarSemana(1); // Carga la Semana 1 por defecto abajo
};