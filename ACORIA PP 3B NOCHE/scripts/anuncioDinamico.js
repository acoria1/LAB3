/**
 * Crea una DIV y dentro pone cada dato del anuncio. 
 * Los atributos que llevan íconos están dentro de otro DIV de clase icon-container
 * Se agrega un boton al final de todo
 * @param {Object} anuncio anuncio a crear en página principal
 * @returns 
 */
function crearAnuncio(anuncio){
    const $div = document.createElement("div");
    $div.setAttribute("class","anuncio");
    $div.setAttribute("id",(anuncio.id));
    
    //Titulo
    const $titulo= createElement("p","anuncio-titulo",anuncio.titulo);

    const $descripcion= createElement("p","anuncio-descripcion",anuncio.descripcion);
    //
    const $precio= createElement("p","anuncio-precio","$" + anuncio.precio);

    //
    const $divContenedor = createElement("div", "icon-container");

    const $divPuertas = createDivIconos("div-icons","./imagenes/puerta.png","icono1",anuncio.puertas)

    const $divKms= createDivIconos("div-icons","./imagenes/kms.png","icono2",anuncio.kms)

    const $divPotencia = createDivIconos("div-icons","./imagenes/potencia.png","icono3",anuncio.potencia);

    $divContenedor.appendChild($divPuertas);
    $divContenedor.appendChild($divKms);
    $divContenedor.appendChild($divPotencia);

    //
    const $button = createElement("button","button-anuncio","Ver Vehiculo");


    $div.appendChild($titulo);
    $div.appendChild($descripcion);
    $div.appendChild($precio);
    $div.appendChild($divContenedor);
    $div.appendChild($button);
    //
    //
    return $div;
}

/**
 * Crea un elemento y le setea una clase y nodo de texto
 * @param {*} tag 
 * @param {*} className nombre de la clase a agregar al elemento
 * @param {*} nodeText [optional] texto que tiene el elemento.
 * @returns 
 */
function createElement(tag, className, nodeText){

    const $el= document.createElement(tag);
    $el.setAttribute("class",className);

    if(nodeText !== undefined){
        return addTextToNode($el,nodeText);
    }
    return $el;
}

/**
 * Agrega nodo de texto a un elemento
 * @param {*} $el 
 * @param {String} nodeText 
 * @returns 
 */
function addTextToNode($el, nodeText){
        const content = document.createTextNode(nodeText);
        $el.appendChild(content);
    return $el;
}

/**
 * Crea una div que contiene un ìcono y un valor
 * 
 * @param {*} divClass clase de la div
 * @param {*} imagePath path del icono
 * @param {*} alt atributo alt
 * @param {*} textContent ira dentro de un tag <p> </p> luego de la imagen
 * @returns 
 */
function createDivIconos(divClass, imagePath, alt, textContent)
{   
    const $div = createElement("div",divClass);

    const $img = document.createElement("img");
    $img.setAttribute("src",imagePath);
    $img.setAttribute("alt",alt);
    $img.setAttribute("class","icon");

    const $cantidad = createElement("p","", textContent);

    $div.appendChild($img);
    $div.appendChild($cantidad);

    return $div;
}


export {crearAnuncio};