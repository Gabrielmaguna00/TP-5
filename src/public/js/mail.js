// Llamar a nuestra de /mail con fetch() 

const datos = await fetch("/mail")

datos.map(dato => {
    contenedor.innerHTML += `
        <h3>Remitente: ${dato.envelope.from}<h3>
    ` 
})