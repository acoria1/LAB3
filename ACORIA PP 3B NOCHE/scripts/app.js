//import {anuncios} from '../data/mockData.js';

import { stripeTable, updateTable} from './tablaDinamica.js';
import { sortObjects, capitalize } from './funcionesAdicionales.js';
import Anuncio_Auto from './anuncio.js';

// Initialize table
const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
const $tableAnuncios = actualizarTablaAnuncios(anuncios,undefined,"sort-ascending");

// Initialize Form
const $frmAnuncio = document.forms[0];
setFormAlta();


$frmAnuncio.addEventListener("submit", (e) => {

    e.preventDefault();

    const anuncioDelForm = new Anuncio_Auto(
        $frmAnuncio.id.value, 
        $frmAnuncio.titulo.value,
        $frmAnuncio.transaccion.value,
        $frmAnuncio.descripcion.value,
        parseFloat($frmAnuncio.precio.value),
        parseInt($frmAnuncio.puertas.value),
        parseInt($frmAnuncio.kms.value),
        parseInt($frmAnuncio.potencia.value))

    if (anuncioDelForm.id === "") {
        // simulate unique ID
        anuncioDelForm.id = Date.now();

        //add
        handlerCreate(anuncioDelForm, anuncios, "anuncios");

    } else {
        //update
        handlerUpdate(anuncioDelForm, anuncios, "anuncios");
        //
    }
})


window.addEventListener("click", (e) => {
    if (e.target.matches("tr td")) {
        
        let currentID = e.target.parentElement.dataset.id;

        const anuncioSeleccionado = anuncios.find((anuncio) => anuncio.id == currentID);

        //load selected row into form
        loadForm(anuncioSeleccionado, $frmAnuncio);

        setFormModificar();

        //move to top of page
        document.documentElement.scrollTop = 0;

    } else if (e.target.matches("#btnCancelar")){

        setFormAlta();

    } else if(e.target.matches("#btnEliminar")){

        handlerDelete(parseInt($frmAnuncio.id.value), anuncios, "anuncios");
    }
})

/**
 * 
 * @param {*} nuevoTexto Modifies Form Header
 */
function modificarHeader (nuevoTexto){

    const el = document.querySelector(".form-container h2");
    el.textContent = nuevoTexto;

}


/**
 * 
 * @param {*} instance to load form with
 * @param {*} $form form to be loadad with data
 * NOTE: instance keys and form elements must have matching names.
 */
function loadForm(instance, $form) {

    const elements = $form.elements;

    for (const key in instance) {
        elements[key].value = instance[key];
    }
}


const handlerCreate = (newInstance, arr, localStorageArr) => {

    arr.push(newInstance);

    actualizarTablaYStorage(arr, localStorageArr);

    setFormAlta();

}

const handlerUpdate = (editedInstance, arr, localStorageArr) => {
    
    arr = arr.map((x) => {
        return (x.id == editedInstance.id) ? editedInstance : x;
    });

    actualizarTablaYStorage(arr, localStorageArr);

    setFormAlta();
}


const handlerDelete = (id, arr, localStorageArr) => {
    
    //get index
    let index = arr.findIndex((x)=> {
        return x.id == id;
    })

    //delete from array
    arr.splice(index,1);

    actualizarTablaYStorage(arr, localStorageArr);

    alert("Anuncio Eliminado");

    setFormAlta();
}


function actualizarTablaYStorage(arr, localStorageArr){

    actualizarTablaAnuncios(arr,undefined, "sort-ascending");

    updateLocalStorage(localStorageArr, arr);
}



/**
 * 
 * @param {array} anuncios 
 * @param {array} sortStates
 * @returns 
 */
function actualizarTablaAnuncios(anuncios, sortStates, defaultSortState){

    // remove table
    const $container = document.querySelector(".table-container");
    while ($container.children.length > 0) {
        $container.removeChild($container.firstElementChild);
    }

    // insert loading gear
    const $img = document.createElement("img");
    $img.setAttribute("src","./imagenes/spinning-wheel.gif");
    $img.setAttribute("alt","loading");

    $container.appendChild($img);

    // simulate server response time
    setTimeout(() => {

    $container.removeChild($img);

    const $tablaAnuncios = updateTable(".table-container", anuncios);

    if(anuncios.length === 0){

        handlerTablaVacia();

    } else {

        stripeTable($tablaAnuncios,"oscuro","claro");
    }


    if (sortStates === undefined){
        sortStates = [];
        let length = $tablaAnuncios.querySelectorAll("th").length;
        for (let index = 0; index < length; index++) {
            sortStates.push(defaultSortState);            
        }
    } 

    addSortableColumns($tablaAnuncios, anuncios, sortStates);

    return $tablaAnuncios;

    }, 3000);
}



/**
 * Function will add sort function to each header cell on click event.
 * Note that column innerHTML value should match key of objects to be sorted. i.e. "email"
 * @param {DOM Table} $table 
 * @param {Array} anuncios employees array
 */
function addSortableColumns($table, anuncios, sortStates){
    document.querySelectorAll(".table-container table th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            
            //sort objects by column name, ascending or descending will depend on the class the table header has
            sortObjects(
                anuncios,
                headerCell.innerHTML, 
                (headerCell.classList.contains("sort-ascending"))
            );

            // switch ascending-descending state of the table header          
            switchElementSortState(headerCell,"sort-ascending","sort-descending");

            const states = [];

            headerCell.parentNode.querySelectorAll("th").forEach(th => {
                states.push(th.className);
            });        

            actualizarTablaAnuncios(anuncios, states, "sort-ascending"); 
            
            updateLocalStorage("anuncios", anuncios);
        })
    })

    initializeSortStates(sortStates);
    
}

function switchElementSortState($el, state1, state2){
    if($el.classList.contains(state1) || $el.classList.contains(state2)){
        $el.classList.toggle(state1);
        $el.classList.toggle(state2);
    } 
}


function initializeSortStates (states){
    const headers = document.querySelectorAll(".table-container table th");
    //
    for (let i = 0; i < headers.length; i++) {
        headers[i].classList.add(states[i]);
    }
    //
}

function handlerTablaVacia(){
    const $tableSection = document.querySelector(".table-container");
    const $h3 = document.createElement("h3");
    const $h3Text = document.createTextNode("Tabla vacia");
    $h3.appendChild($h3Text);

    $tableSection.appendChild($h3);
}

/**
 * Updates data on local storage
 * @param {string} localStorageKey name of data to update
 * @param {*} data 
 */
 const updateLocalStorage = (localStorageKey, data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

/**
 * Deshabilita botones de alta y habilita botones para modificar/eliminar
 */
function setFormModificar(){
    modificarHeader("Editar Anuncio");

    document.getElementById('btnAlta').disabled = true;
    document.getElementById('btnModificar').disabled = false;
    document.getElementById('btnEliminar').disabled = false;
}


/**
 * Deshabilita botones para modificar/eliminar y habilita botones de alta
 */
function setFormAlta(){
    modificarHeader("Alta Anuncio");

    document.getElementById('btnAlta').disabled = false;
    document.getElementById('btnModificar').disabled = true;
    document.getElementById('btnEliminar').disabled = true;

    $frmAnuncio.reset();
}






