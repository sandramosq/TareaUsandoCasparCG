// Crear una conexión WebSocket a CasparCG
const ws = new WebSocket("ws://localhost:5250");

// Función para enviar comandos a CasparCG
function enviarComandoCasparCG(comando) {
    ws.send(comando);
}

// Generar números de lotería y enviarlos a CasparCG
function actualizarResultadosLoteria(nombreLoteria) {
    const numeros = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
    const comando = `CG 1-1 ADD 1 "<template_name>" 1 "<data>${nombreLoteria}: ${numeros.join(", ")}</data>"`;
    enviarComandoCasparCG(comando);
}

// Ejemplo de cómo actualizar cada lotería cada 5 segundos
setInterval(() => actualizarResultadosLoteria("Lotería 1"), 5000);
setInterval(() => actualizarResultadosLoteria("Lotería 2"), 5000);


document.addEventListener("DOMContentLoaded", () => {
    const numLoterias = 3; // Número de loterías a simular
    const tiempoActualizacion = 5000; // Tiempo de actualización en milisegundos

    // Crear contenedores para cada lotería
    const loteriasContainer = document.getElementById("loterias-container");

    for (let i = 1; i <= numLoterias; i++) {
        const loteriaDiv = document.createElement("div");
        loteriaDiv.classList.add("loteria");
        loteriaDiv.id = `loteria-${i}`;
        loteriaDiv.innerHTML = `<h2>Lotería ${i}</h2><p id="resultados-${i}">---</p>`;
        loteriasContainer.appendChild(loteriaDiv);
    }

    // Función para generar números aleatorios y actualizar el DOM
    function generarResultados() {
        for (let i = 1; i <= numLoterias; i++) {
            const resultados = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
            const resultadosDiv = document.getElementById(`resultados-${i}`);
            resultadosDiv.textContent = resultados.join(" - ");

            // Agregar la clase de actualización para activar la animación
            const loteriaDiv = document.getElementById(`loteria-${i}`);
            loteriaDiv.classList.add("updated");

            // Eliminar la clase de actualización después de la animación
            setTimeout(() => loteriaDiv.classList.remove("updated"), 500);
        }
    }

    // Actualizar los resultados cada cierto intervalo
    setInterval(generarResultados, tiempoActualizacion);
    generarResultados(); // Genera los resultados inicialmente
});
