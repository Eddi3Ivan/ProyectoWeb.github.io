// Función para convertir los datos en datos de tabla HTML
function parseCSV(datosCSV) {
    const filas = datosCSV.split('\n');
    const cuerpoTabla = document.querySelector('#tablaCSV tbody');

    filas.forEach(fila => {
        const columnas = fila.split(',');
        const tr = document.createElement('tr');
        
        columnas.forEach(columna => {
            const td = document.createElement('td');
            td.textContent = columna;
            tr.appendChild(td);
        });
        cuerpoTabla.appendChild(tr);
    });
}

let csvData = [];
let nombreCSV = "";

// Función para leer el archivo CSV
function leerCSV(archivo) {
    const leer = new FileReader();
    leer.onload = function(e) {
        const datosCSV = e.target.result;
        parseCSV(datosCSV);
        csvData = datosCSV.split('\n').map(row => row.split(','));
        console.log(datosCSV);
    };
    leer.readAsText(archivo);
    nombreCSV = archivo.name;
}

// Método event listener para abrir un archivo CSV
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    leerCSV(archivo);
    console.log(archivo.name);
});

// Mostrar la sección correspondiente al botón presionado
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// Insertar datos en el archivo CSV
function insertRow() {
    const newRow = document.getElementById('newRow').value;
    if (newRow.trim() === "") {
        alert('Por favor, ingresa datos para insertar.');
        return;
    }
    csvData.push(newRow.split(','));
    updateCSVContent();
}

// Borrar datos del archivo CSV
function deleteRow() {
    const rowToDelete = document.getElementById('deleteRow').value;
    if (rowToDelete.trim() === "") {
        alert('Por favor, ingresa el contenido de la fila a borrar.');
        return;
    }
    const rowToDeleteArray = rowToDelete.split(',');
    csvData = csvData.filter(row => JSON.stringify(row) !== JSON.stringify(rowToDeleteArray));
    updateCSVContent();
}

// Actualizar contenido del CSV y mostrarlo
function updateCSVContent() {
    const vacio = "";
    parseCSV(vacio);
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    //console.log(csvContent);
    parseCSV(csvContent);
    document.getElementById('insertResult').textContent = 'Datos insertados correctamente.';
    document.getElementById('deleteResult').textContent = 'Datos borrados correctamente.';
}

// Descargar el archivo CSV modificado
function downloadCSV() {
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', nombreCSV || 'archivo_modificado.csv');
    a.click();
}