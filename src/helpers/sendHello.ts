export function sendHello(msg:string):string{
    return (
        `
        <body>
        <style>
            *{
                box-sizing: border-box;
                margin: 0;
                padding:0;
            }

            div{
                display: grid;
                max-width: 0.91fr;
                min-height: 99vh;
                background: #FFE0B2;
            }

            header{
                background: white;
                padding: 2rem;
                text-align: center;
                max-height: 8em;
            }

        </style>
        
        <div>
        <header>
        <h1>${msg}</h1>
        </header>
        </div>
        </body>
        
        `
        )
}