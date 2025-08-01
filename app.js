let amigos = [];

// Función para mostrar/actualizar la lista de amigos en el HTML
function mostrarAmigosEnHTML() {
    // Usamos el ID 'listaAmigos' del html
    const listaHTML = document.getElementById('listaAmigos');
    
    listaHTML.innerHTML = ''; // Esto elimina todos los <li> actuales y deja la lista vacía

    // Usamos un bucle for 
    for (let i = 0; i < amigos.length; i++) {
        const nombreAmigo = amigos[i]; // Obtenemos el nombre del amigo en la posición actual
        
        const li = document.createElement('li'); // Creamos un nuevo elemento <li>
        li.textContent = nombreAmigo; // Asignamos el nombre del amigo como el texto del <li>
        
        listaHTML.appendChild(li); // Añadimos el <li> recién creado a la lista <ul>
    }
}

function agregarAmigo() { //Función para agregar amigo
    const inputAmigo = document.getElementById('amigo'); //Trae a la función el id amigo para utilizar el input de amigo
    const nombreIngresado = inputAmigo.value.trim(); //Elimina espacios en blanco al inicio y al final

    if (nombreIngresado === '') { 
        alert ('Por favor, ingrese un nombre valido.'); //Alerta para avisar que el nombre ingresado no es valido
        return;
    }
    if (amigos.includes(nombreIngresado)) {
        alert("Ese nombre ya ha sido añadido a la lista.");
        inputAmigo.value = '';
        return;
    }

    amigos.push(nombreIngresado); //Agrega un nombre ingresado al array []
    console.log("Lista de amigos actual:", amigos); //Muestra en consola la lista de amigos actual
    
    // *** ¡AQUÍ ESTÁ LA CORRECCIÓN! ***
    // La función que actualiza el HTML se llama mostrarAmigosEnHTML, no listaAmigosHtml
    mostrarAmigosEnHTML(); // Llama a la función para actualizar la lista visible
    
    inputAmigo.value = ''; //Vacia el campo de texto una vez agregado un nombre
}

//Función principal para sortear un amigo
function sortearAmigo() {
    // Se necesitan al menos 3 amigos para que el sorteo tenga sentido (cada uno con un amigo secreto diferente)
    if (amigos.length < 3) {
        alert("Necesitas al menos 3 amigos en la lista para realizar el sorteo.");
        return; // Detiene la ejecución si no hay suficientes amigos
    }
    
    // Si la idea es sortear y ELIMINAR al amigo sorteado de la lista para no volver a sortearlo,
    // o para que cada persona "reciba" solo una vez, tu lógica de splice es correcta.
    // Pero si quieres que la lista original de amigos se mantenga intacta para múltiples sorteos,
    // o para otras funciones, deberías trabajar con una copia del array o ajustar esta lógica.

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];

    //Obtenemos la referencia al elemento <ul> con id="resultado"
    const resultadoHTML = document.getElementById('resultado');
    
    //Limpiamos cualquier contenido anterior en el área de resultados
    resultadoHTML.innerHTML = ''; 

    //Creamos un nuevo elemento <li> para mostrar el amigo sorteado
    const liResultado = document.createElement('li');
    // Actualizamos su contenido.
    liResultado.textContent = `¡Tu amigo secreto es: ${amigoSorteado}!`;
    
    // Añadimos el <li> al <ul> de resultados
    resultadoHTML.appendChild(liResultado);

    // Eliminación de amigos para no mostrar repetidos o para que no se sortee dos veces la misma persona si se hace multiple sorteo
    // Esta línea modifica el array 'amigos' original.
    amigos.splice(indiceAleatorio, 1); 
    mostrarAmigosEnHTML(); // Actualiza la lista visible después de la eliminación.
}

//Inicializa la visualización de la lista de amigos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarAmigosEnHTML);