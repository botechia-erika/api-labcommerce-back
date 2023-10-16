export class Combatente {
    public vidaMaxima = 100

    constructor(
        public forca: number,
        public destreza: number,
        public vitalidade: number
    ) { }

    public atacar(): number {
        return this.forca + this.destreza
    }
}

export class Espadachim extends Combatente {
		vidaMaxima = 120

    constructor(
        forca: number,
        destreza: number,
        vitalidade: number
    ) {
        super(forca, destreza, vitalidade)
    }

    public atacar(): number {
        return this.forca * 2 + this.destreza
    }

}

export class Arqueira extends Combatente {
    constructor(
        forca: number,
        destreza: number,
        vitalidade: number
    ) {
        super(forca, destreza, vitalidade)
    }

    public atacar(): number {
        return this.forca + this.destreza * 2
    }
}

export class Mago extends Combatente {
    public atacar(): number {
        return super.atacar() +100
    }
}

const combatente = new Combatente(18, 18, 20)

const espadachin = new Combatente(10, 10, 20)