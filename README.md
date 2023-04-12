<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Clonar el repositorio

Clonar el repositorio para correr la aplicación de manera local

https://github.com/federicomontero86/tickets-api

---

## Instalación

```
$ yarn install
```

---

## Configuración

Cambiar el nombre del archivo **.env.template** a **.env**

---

## Correr la app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

---

## Pasos para recorrer la app

### Credenciales de acceso:

_Administrador:_  
email: admin@ticketsapi.com  
password: Abc123

_Usuario:_  
email: user@ticketsapi.com  
password: Abc123

---

1. Crear un usuario:

```
POST// localhost:3000/auth/register
```

    - Pasar por Body:
    "email":
    "password":
    "fullName":

---

2. Loguearse:

```
POST// localhost:3000/auth/login
```

    - Pasar por Body:
    "email":
    "password":

- Copiar el **token** recibido, será necesario para acceder al resto de las rutas.

---

3. Crear un Ticket:

```
POST// localhost:3000/ticket
```

    - Pasar el token como header de autorización de tipo Bearer.

    - Pasar por Body:
    "problem":
    "description":
    "purchaseDate":
    "billNumber":
    "productCode":

---

4. Actualizar un Ticket:

```
POST// localhost:3000/ticket/<ticketId>
```

    - Pasar el token como header de autorización de tipo Bearer.

    - Pasar por Body datos a actualizar:
    (opcional)"problem":
    (opcional)"description":
    (opcional)"details":

- Solo usuarios con rol **admin** pueden acceder a esta ruta.

---

5. Acceder a todos los tickets

```
GET// localhost:3000/ticket
```

    - Pasar el token como header de autorización de tipo Bearer.

---

6. Acceder a un ticket por id

```
GET// localhost:3000/ticket/findone/<ticketId>
```

    - Pasar el token como header de autorización de tipo Bearer.

---

7. Acceder a un ticket por uuid

```
GET// localhost:3000/ticket/findonebyuuid/<uuid>
```

    - Pasar el token como header de autorización de tipo Bearer.

- Solo usuarios con rol **admin** pueden acceder a esta ruta.

---

8. Encontrar un ticket por parámetro de busqueda en el "problema"

```
GET// localhost:3000/ticket/search/<term>
```

    - Pasar el token como header de autorización de tipo Bearer.

---

9. Borrar un ticket

```
DELETE// localhost:3000/ticket/<uuid>
```

    - Pasar el token como header de autorización de tipo Bearer.

- Solo usuarios con rol **admin** pueden acceder a esta ruta.

---
