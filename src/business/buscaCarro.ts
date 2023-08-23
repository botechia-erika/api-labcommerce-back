import {Frota} from "./../dataTS/frota"
import { TCarro, TProductDB } from "../types/types"
//frota e array de carros e marca string
export function buscaProducto(products:TProductDB[], id_product?:string) {

  if (id_product === undefined) {
    return "produto não informado"
  }
else{
  return products.filter(
    (product) => {
      return product.id === id_product
    }
  )
}
}


/*console.log('*******FIAT********')
console.log(buscarCarrosPorMarca(frota, "Fiat"))
console.log('*******CHEVROLET********')
console.log(buscarCarrosPorMarca(frota, "Chevrolet"))
console.log('*******TOYOTA********')
console.log(buscarCarrosPorMarca(frota, 'Toyota'))
console.log('*******FORD********') */
//console.log(buscarCarrosPorMarca(frota, "Fiat"))
/*refatorando
tornar marca opcional com signo de interrogação
*/
//console.log('*****FROTA COMPLETA SEM MARCA REFATORA MARCA? ********')
//console.log(buscarCarrosPorMarca(frota))
//retorna frota completa



//console.log('*******MARCA HYUNDAI NAO EXISTE = []********')
//Ate momento se marca nao existe devolve array vazio!
//console.log(buscarCarrosPorMarca(frota, "fiat"))
//producindo erro
//console.log(buscarCarrosPorMarca(frota,1))
//console.log(buscarCarrosPorMarca(frota, "Chevrolet"))
