

function agregarIngrediente() {
    const container = document.getElementById('ingredientesContainer');
    const ingredienteHTML = `
        <div class="ingrediente row mb-2">
            <div class="col-md-3">
                <input type="text" class="form-control ingresoIngrediente" placeholder="Ingrediente" required>
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control cantidadIngrediente" placeholder="Cantidad" required>
            </div>
            <div class="col-md-3">
                <select class="form-select unidad">
                    <option value="Unidad">Unidad</option>
                    <option value="kilos">Kilos</option>
                    <option value="gramos">Gramos</option>
                    <option value="litros">Litros</option>
                </select>
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control precio" placeholder="Precio" required>
            </div>
            
            <div class="col-md-1 text-center">
                <button type="button" class="btn btn-danger" onclick="quitarIngrediente(this)">-</button>
            </div>
            
        </div>
    `;
    container.insertAdjacentHTML('beforeend', ingredienteHTML);
}

function quitarIngrediente(button) {
    button.closest('.ingrediente').remove();
}

function calcularReceta() {
    const nInicio = parseInt(document.getElementById('cantidad').value);
    const nFinal = parseInt(document.getElementById('cantFinal').value);
    const precioVenta = parseFloat(document.getElementById('precioVenta').value);

    let costoTotal = 0;
    const tablaResultados = document.getElementById('tablaResultados');
    tablaResultados.innerHTML = '';

    const ingredientes = document.querySelectorAll('.ingrediente');
    ingredientes.forEach(row => {
        const nombre = row.querySelector('.ingresoIngrediente').value;
        const cantidad = parseFloat(row.querySelector('.cantidadIngrediente').value);
        const unidad = row.querySelector('.unidad').value;
        const precio = parseFloat(row.querySelector('.precio').value);

        const cantidadAjustada = (cantidad / nInicio) * nFinal;
        const costo = (precio / cantidad) * cantidadAjustada;
        costoTotal += costo;

        tablaResultados.innerHTML += `
            <tr>
                <td>${nombre}</td>
                <td>${formatearNumero(cantidadAjustada)}</td>
                <td>${unidad}</td>
            </tr>
        `;
    });

    document.getElementById('costos').innerText = `Costos: $${formatearNumero(costoTotal)}`;
    const ganancia = (precioVenta * nFinal) - costoTotal;
    document.getElementById('ganancias').innerText = `Ganancias: $${formatearNumero(ganancia)}`;

    // Calcular el costo por porción
    const costoPorPorcion = costoTotal / nFinal;
    document.getElementById('costoPorPorcion').innerText = 
        `Costo por porción: $${formatearNumero(costoPorPorcion)}`;
}