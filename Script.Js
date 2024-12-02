

        // Función para agregar un nuevo ingrediente
        function agregarIngrediente() {
            const listaIngrediente = document.getElementById('listaIngrediente');
            const ingredienteDiv = document.createElement('div');
            ingredienteDiv.classList.add('ingrediente');
            ingredienteDiv.innerHTML = `
                <label for="ingresoIngrediente">Ingrediente:</label>
                <input type="text" id="ingresoIngrediente" placeholder="Ingrediente" required>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidadIngrediente" placeholder="Cantidad" required min="0" step="0.01">
                <label for="unidad">Unidad:</label>
                <select name="unidad" id="unidad">
                    <option value="Unidad">Unidad</option>
                    <option value="kilos">Kilos</option>
                    <option value="gramos">Gramos</option>
                    <option value="miligramos">Miligramos</option>
                    <option value="litros">Litros</option>
                    <option value="mililitros">Mililitros</option>
                </select>
                <button type="button" onclick="quitarIngrediente(this)">-</button>
            `;
            listaIngrediente.appendChild(ingredienteDiv);
        }

        // Función para quitar un ingrediente
        function quitarIngrediente(button) {
            const ingredienteDiv = button.parentNode;
            ingredienteDiv.parentNode.removeChild(ingredienteDiv);
        }

        // Función de cálculo
        function calculo(nInicio, nFinal, medida) {
            return (medida / nInicio) * nFinal;
        }

        // Función para calcular la receta ajustada
        function calcularReceta() {
            const nInicio = parseInt(document.getElementById('cantidad').value);
            const nFinal = parseInt(document.getElementById('cantFinal').value);
            const ingredientes = document.querySelectorAll('.ingrediente');
            const resultadosDiv = document.getElementById('resultados');

            // Limpiar resultados previos
            resultadosDiv.innerHTML = '';

            // Validar entrada de datos
            if (isNaN(nInicio) || isNaN(nFinal) || nInicio <= 0 || nFinal <= 0) {
                resultadosDiv.innerHTML = '<p style="color: red;">Por favor, ingrese cantidades válidas para las personas.</p>';
                return;
            }

            // Iterar sobre los ingredientes y calcular las nuevas cantidades
            ingredientes.forEach(ingrediente => {
                const nombre = ingrediente.querySelector('#ingresoIngrediente').value;
                const cantidad = parseFloat(ingrediente.querySelector('#cantidadIngrediente').value);
                const unidad = ingrediente.querySelector('#unidad').value;

                if (nombre && !isNaN(cantidad) && cantidad > 0) {
                    const cantidadAjustada = calculo(nInicio, nFinal, cantidad);

                    // Mostrar resultado
                    const resultado = document.createElement('div');
                    resultado.classList.add('resultado-item');
                    resultado.textContent = `${nombre}: ${cantidadAjustada.toFixed(2)} ${unidad}`;
                    resultadosDiv.appendChild(resultado);
                }
            });
        }