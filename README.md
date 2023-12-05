# SANAMA - Proyecto Telesalud

SANAMA es una aplicación web que combina un backend en Java y un frontend en React con Next.js. Está diseñada para mejorar los servicios de salud en la posta médica de Santa Clotilde, Loreto, Perú, mediante la digitalización y almacenamiento seguro de historias clínicas y la mejora en la trazabilidad de suministros médicos.
Prerrequisitos

Antes de iniciar, asegúrate de tener instalado:

    JDK 17
    Maven
    Node.js (incluye npm)

## Instalación

Primero, clona el repositorio:

bash

git clone https://github.com/Duvet05/sanama-app

### Backend

Navega al directorio del backend y compila con Maven:

bash

cd sanama-app/sanama-backend
mvn clean install

Ejecuta el archivo JAR generado:

bash

java -jar target/[nombre-archivo-jar].jar

Sustituye [nombre-archivo-jar] con el nombre del archivo JAR generado.

### Frontend

Navega al directorio del frontend e instala las dependencias:

bash

cd ../sanama-frontend
npm install

Inicia la aplicación Next.js:

bash

npm run dev

## Uso

Una vez que el backend y el frontend estén funcionando, puedes acceder a la aplicación en http://localhost:3000 (puerto predeterminado de Next.js).

## Integrantes del Grupo

    Visalot Arrieta, Aida Valeria
    Saras Rivera, Andre Edgardo
    Erazo Espinoza, Enrique Ignacio
    Galvez Cortez, Gonzalo
    Escalante Gonzales, Sergio Alonso
    Vargas Nuñez, Pedro Matias
