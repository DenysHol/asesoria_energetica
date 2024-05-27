function buscarContrato() {
    const cif = document.getElementById('cif').value.toLowerCase(); // Convertir a minúsculas aquí
    const nombre = document.getElementById('nombre').value.toLowerCase(); // Convertir a minúsculas aquí
    const comercializadora = document.getElementById('comercializadora').value.toLowerCase(); // Convertir a minúsculas aquí
    const estado = document.getElementById('estado').value.toLowerCase(); // Convertir a minúsculas aquí

    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.filter(contrato => {
                // Verificar si CIF, NOMBRE, COMERCIALIZADORA, ESTADO son cadenas antes de llamar a toLowerCase()
                return (cif && typeof contrato.CIF === 'string' && contrato.CIF.toLowerCase().includes(cif)) ||
                       (nombre && typeof contrato.NOMBRE === 'string' && contrato.NOMBRE.toLowerCase().includes(nombre)) ||
                       (comercializadora && typeof contrato.COMERCIALIZADORA === 'string' && contrato.COMERCIALIZADORA.toLowerCase().includes(comercializadora)) ||
                       (estado && typeof contrato.ESTADO === 'string' && contrato.ESTADO.toLowerCase().includes(estado));
            });

            mostrarResultado(resultado);
            generarGrafica(data);
        })
        .catch(error => console.error('Error:', error));
}



function mostrarResultado(resultado) {
        const contratoDiv = document.getElementById('contrato');
        contratoDiv.innerHTML = '';
    
        resultado.forEach(contrato => {
            const contratoInfo = document.createElement('div');
            contratoInfo.classList.add('contrato-info');
            contratoInfo.innerHTML = `
                <p><strong>CIF:</strong> ${contrato.CIF}</p>
                <p><strong>Nombre:</strong> ${contrato.NOMBRE}</p>
                <p><strong>CUPS:</strong> ${contrato.CUPS}</p>
                <p><strong>Tarifa:</strong> ${contrato.TARIFA}</p>
                <p><strong>Comercializadora:</strong> ${contrato.COMERCIALIZADORA}</p>
                <p><strong>Comercial:</strong> ${contrato.COMERCIAL}</p> <!-- Cambiado a COMERCIAL -->
                <p><strong>Estado:</strong> ${contrato.ESTADO}</p>
                <p><strong>Acciones:</strong> ${contrato.ACCIONES}</p>
                <p><strong>Fecha:</strong> ${contrato.FECHA}</p>
                <p><strong>Pagado:</strong> ${contrato.PAGADO}</p>
                <p><strong>Documentos Adjuntos:</strong> ${contrato["DOCUMENTOS ADJUNTOS"]}</p>
                <p><strong>Fecha de Acabar Contrato:</strong> ${contrato["FECHA DE ACABAR CONTRATO"]}</p>
                <hr>
            `;
            contratoDiv.appendChild(contratoInfo);
        });
    
        document.getElementById('resultado').style.display = 'block';
    }
    

 function generarGrafica(data) {
    const contratosPorComercializadora = {};
    data.forEach(contrato => {
        if (contrato.COMERCIALIZADORA in contratosPorComercializadora) {
            contratosPorComercializadora[contrato.COMERCIALIZADORA]++;
        } else {
            contratosPorComercializadora[contrato.COMERCIALIZADORA] = 1;
        }
    });

    const ctx = document.getElementById('grafica').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(contratosPorComercializadora),
            datasets: [{
                label: 'Número de Contratos por Comercializadora',
                data: Object.values(contratosPorComercializadora),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}