class Copo {
  private capacidadeEmMl: number
  private cor: string

  constructor(
    capacidadeEmMl: number,
    cor: string,
  ) {
    this.capacidadeEmMl = capacidadeEmMl
    this.cor = cor
  }

  public getCapacidadeEmMl(): number {
    return this.capacidadeEmMl
  }

  public setCapacidadeEmMl(value: number): void {
    this.capacidadeEmMl = value
  }

  public getCor(): string {
    return this.cor
  }

  public setCor(value: string): void {
    this.cor = value
  }
}

const meuCopo = new Copo(
  500,
  "branco ofuscado"
)

const copoLabenu = new Copo(
  300,
  "branco"
)

meuCopo.setCapacidadeEmMl(0)
console.log(meuCopo.getCapacidadeEmMl())
console.log(copoLabenu.getCapacidadeEmMl())

console.log(meuCopo.getCor())
meuCopo.setCor("azul")
console.log(meuCopo.getCor())