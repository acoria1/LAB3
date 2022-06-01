/**
 * Constructor por defecto de Anuncio
 * @param {*} id 
 * @param {*} titulo 
 * @param {*} transaccion 
 * @param {*} descripcion 
 * @param {*} precio 
 */
function Anuncio(
  id,
  titulo,
  transaccion,
  descripcion,
  precio,
) {
  this.id = id;
  this.titulo = titulo;
  this.transaccion = transaccion;
  this.descripcion = descripcion;
  this.precio = precio;
}

/**
 * Extends Anuncio
 * @param {*} id 
 * @param {*} titulo 
 * @param {*} transaccion venta / alquiler
 * @param {*} descripcion 
 * @param {*} precio 
 * @param {*} puertas cantidad de puertas
 * @param {*} kms kilometros del auto
 * @param {*} potencia 
 */
export default function Anuncio_Auto(
  id,
  titulo,
  transaccion,
  descripcion,
  precio,
  puertas,
  kms,
  potencia
) {

  Anuncio.call(this, id, titulo, transaccion, descripcion, precio);

  this.puertas = puertas;
  this.kms = kms;
  this.potencia = potencia;

}
