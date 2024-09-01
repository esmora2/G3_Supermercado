# Supermercado Antojitos

Gestion de Ventas e Inventario de Supermercado Antojitos, desarrollado con tecnologias: 
*Microservicios (Backend): Node.js + Express
*Frontend: React + Vite con Javascript y CSS
*Base de Datos: Postgres
*Docker y Docker Compose: Levantamiento de servicios

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

Copiar el repositorio desde: https://github.com/esmora2/G3_Supermercado.git

utilizando

```
git clone https://github.com/esmora2/G3_Supermercado.git

cd G3_Supermercado
```

## 1. Para el levantamiento de los Servicios del Backend

Servicio Clientes

```
cd clientes-service
npm install
```

Servicio Inventario

```
cd inventario-service
npm install
```

Servicio Ventas

```
cd ventas-service
npm install
```
Construir y Ejecutar docker-compose.yml


```
cd G3_Supermercado


docker-compose build
docker-compose up -d

```

* Verificar que los contenedores esten en ejecucion 

```
docker ps

```

Configurar la base de datos Postgres

```
psql -h localhost -p 5434

*Linux*
sudo -u postgres psql -h localhost -p 5434

*La contraseña deberia ser: "admin", y el user: "postgres"*
```

-Una vez en el shell de postgres Crear la Base de Datos

```
CREATE DATABASE supermercado_antojitos;
```

-Comprobar la base de datos enlistando todas las BDs con \l

-Conectarse a la Base de Datos

```
\c supermercado_antojitos
```

-Una vez en la Base de Datos ejecutar el Script de Creacion de Tablas (Copia y pega el contenido de "esquema.sql")

-(Necesario) ejecuta estos dos script de insercion de datos

```
INSERT INTO TYPE_ID (DESCRIPTION) VALUES ('Regular'), ('VIP');

INSERT INTO TYPE_TRANSACTION (DESCRIPTION) VALUES ('Ingreso'), ('Salida');

```


## 1. Para el levantamiento de los Servicios del Frontend

-Verifica que los contenedores se encuentren en ejecucion

```
cd supermercado_frontend
npm install

npm run dev

```
Dirigete al puerto

http://localhost:5173/


## Uso

-Seccion Inicial

Se enlistan los productos Registrados y las ultimas ventas realizadas (Con id y Fecha)
Se puede realizar un filtrado de productos por Nombre o por ID asi como editar la informacion de precio y Nombre

-Registrar Cliente
Registra un Cliente ingresando sus datos y seleccionando tipo de cliente (VIP o Consumidor)

-Registrar Producto
Registra en inventario un nuevo producto, Ingresando Su nombre, Precio y cantidad de ingreso

-Registrar Venta

Obtiene un cliente y un producto para Realizar la venta del mismo y registrarla

## Contribución

Instrucciones para aquellos que deseen contribuir al proyecto.

## Licencia

Indica la licencia bajo la cual se distribuye el proyecto.

## Contacto

Información de contacto para los mantenedores del proyecto.