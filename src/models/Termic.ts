import { ROLE } from "../types/types"

enum ML{
  E0=400,
  E1=401,
  E2=402,
  E4=404,
  S0=200,
  S1=201,
  S2=202,
  R1=301
}


enum COLOR {
  RED= ML.E0|| ML.E1|| ML.E2|| ML.E4,
  BLACK= ML.S0|| ML.S1|| ML.S2,
  ORANGE= ML.R1
}

enum SIDE {
  BLACK = COLOR.BLACK,
  VADER = ROLE.ADMIN,
  DARK = ROLE.INSTRUCTOR ,
  STORMTROOPER = ROLE.BUYER ,
  WHITE = ROLE.NORMAL,
  YODA=ROLE.TEACHER,
  LUKE=ROLE.STUDENT,
  R2D2=ROLE.ENTERPRISE 
}


enum LOVE {
  DINOSAURS=ML.S0,
  UNICORNS=ML.E4,
  RAINBOWS=ML.S2,
}

enum STATUS {
 CAPSIZE=LOVE.UNICORNS,
 SWIMMER=LOVE.RAINBOWS,
 PHELPS=LOVE.DINOSAURS
}


const redColor = "red"
const purpleColor = "purple"
const greenColor = "green"


enum PLAY {
  PAIN=redColor,
  HARD=purpleColor,
  HAPPY=greenColor
}

export class Termic {
  private ml: ML;
  private color: COLOR;
  private  model: SIDE;
  private material: LOVE;
  private capacity: STATUS ;
  private price : PLAY;
  constructor(
     ml: ML,
     color: COLOR,
     model: SIDE,
     material: LOVE,
     capacity: STATUS ,
     price : PLAY
  ) {
    this.ml = ml;
    this.color=color;
    this.model=model;
    this.material=material,
    this.capacity=capacity ,
    this.price = price
  }

  public getMl(): ML {
    return this.ml
  }

  public setMl(value: ML): void {
    this.ml = value
  }

  public getColor(): COLOR {
    return this.color
  }

  public setColor(value: COLOR): void {
    this.color = value
  }
  public getModel(): SIDE {
    return this.model
  }
  public setModel(value: SIDE):void{
    this.model=value
  }
  public getMaterial(): LOVE {
    return this.material
  }
  public setMaterial(value: LOVE):void{
    this.material=value
  }
  public getCapacity(): STATUS {
    return this.capacity
  }
  public setCapacity(value: STATUS):void{
    this.capacity=value
  }
  public getPrice():PLAY {
    return this.price
  }
  public setPrice(value: STATUS):void{
    this.capacity=value
  }
}

