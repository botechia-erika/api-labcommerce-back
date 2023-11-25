import { DESCRIPTION_CATEGORY } from "../types/types";

export const matchDescriptionCategory = (newPrice:number)=>{
    if(newPrice < 1600){
        const newDescription = DESCRIPTION_CATEGORY.LIGHT
      return newDescription
    }else if(newPrice > 1601 && newPrice < 2400){
      const newDescription = DESCRIPTION_CATEGORY.HATCH
      return newDescription
    }else if(newPrice > 2401 && newPrice < 2700){
      const newDescription  = DESCRIPTION_CATEGORY.SEDAN
      return newDescription
    }else if(newPrice > 2701 && newPrice < 2900){
      const newDescription  = DESCRIPTION_CATEGORY.PRIME
      return newDescription
    }else if(newPrice > 2901){
      const newDescription = DESCRIPTION_CATEGORY.LUX
      return newDescription
    }
}

