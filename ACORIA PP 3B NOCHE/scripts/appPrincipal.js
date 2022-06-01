import { crearAnuncio } from './anuncioDinamico.js';
import { stripeTable, updateTable} from './tablaDinamica.js';
import { sortObjects, capitalize } from './funcionesAdicionales.js';
import Anuncio_Auto from './anuncio.js';

//Cargar anuncios desde el local Storage
const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

const $main = document.querySelector(".main");

//Agregar una div por cada anuncio
anuncios.forEach(anuncio => {
    const $divAnuncio = crearAnuncio(anuncio);

    $main.appendChild($divAnuncio);

});


// Cuando se presiona el botón de ver vehiculo
window.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        
        let currentID = e.target.parentElement.id;

        console.log(e.target.parentElement);

        const anuncioSeleccionado = anuncios.find((anuncio) => anuncio.id == currentID);

        alert("El Vehiculo seleccionado tiene id:" + currentID);
    }
})