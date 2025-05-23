from flask import Flask, request, render_template
import sqlite3
from datetime import datetime

app = Flask(__name__)

# Crear la base de datos si no existe
def crear_db():
    conn = sqlite3.connect('parqueadero.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            placa TEXT,
            nombre TEXT,
            identificacion TEXT,
            tipo TEXT,
            hora_entrada TEXT,
            hora_salida TEXT,
            costo REAL
        )
    ''')
    conn.commit()
    conn.close()

crear_db()

# Calcular el costo (1000 por hora)
def calcular_costo(hora_entrada, hora_salida):
    formato = "%H:%M"
    entrada = datetime.strptime(hora_entrada, formato)
    salida = datetime.strptime(hora_salida, formato)
    duracion = (salida - entrada).seconds / 3600
    return round(duracion * 1000, 2)

@app.route('/')
def formulario1():
    return render_template('formulario1.html')

@app.route('/reserva', methods=['POST'])
def procesar_reserva():
    datos = request.form
    placa = datos['placa']
    nombre = datos['nombre']
    identificacion = datos['identificacion']
    tipo = datos['tipo']
    hora_entrada = datos['horaEntrada']
    hora_salida = datos['horaSalida']
    costo = calcular_costo(hora_entrada, hora_salida)

    conn = sqlite3.connect('parqueadero.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO reservas (placa, nombre, identificacion, tipo, hora_entrada, hora_salida, costo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (placa, nombre, identificacion, tipo, hora_entrada, hora_salida, costo))
    conn.commit()
    conn.close()

    return render_template('recibo.html', nombre=nombre, placa=placa, tipo=tipo, costo=costo)

if __name__ == '__main__':
    app.run(debug=True)
