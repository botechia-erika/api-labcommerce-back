export class Message {
    constructor(
            protected id: string,
            protected senderId: string,
            protected chatId: string,
            protected content: string,
            protected createdAt: string
    ) {}
}

export class TextMessage extends Message {
    constructor(
                id: string,
                senderId: string,
                chatId: string,
                content: string,
                createdAt: string
    ) {
            super(
                    id,
                    senderId,
                    chatId,
                    content,
                    createdAt
            )
    }

    public async send() {
            // lógicas para enviar a mensagem
            
            // agora podemos acessar os atributos da classe herdada
            console.log(this.id)
            console.log(this.senderId)
            console.log(this.content)
    }
}

export class VideoMessage extends Message {
    constructor(
                id: string,
                senderId: string,
                chatId: string,
                content: string,
                createdAt: string,
                private video: string
    ) {
            super(
                    id,
                    senderId,
                    chatId,
                    content,
                    createdAt
            )
    }

    private async upload() {
            // aqui podemos usar o dado específico de VideoMessage
            // lógicas para fazer o upload da mídia
    }

    public async send() {
            await this.upload()
            // lógicas para enviar a mensagem

            // agora podemos acessar os atributos da classe herdada
            console.log(this.id)
            console.log(this.senderId)
            console.log(this.content)
    }
}