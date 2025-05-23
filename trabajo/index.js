document.getElementById('formIngreso').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        placa: document.getElementById('placa').value,
        nombre: document.getElementById('nombre').value,
        identificacion: document.getElementById('identificacion').value,
        tipo: document.getElementById('tipo').value,
        horaEntrada: document.getElementById('horaEntrada').value,
        horaSalida: document.getElementById('horaSalida').value
    };

    fetch('http://localhost:5000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => alert(data.mensaje))
    .catch(error => console.error('Error:', error));
});
