export const createBandEmail = (email:undefined|string, withoutSpace:string)=>{
    const emailGerado = "bands@" + withoutSpace + ".play.add"
    return emailGerado
    }
 
   
 export const createBandNickname = (countryCode:string,  withoutSpace:string)=>{
    const nicknameGerado = (countryCode + "@" + withoutSpace )
    return nicknameGerado
    }

export  const createBandPassword = (passwordConfirm:string | undefined , withoutSpace:string)=>{
    if (!passwordConfirm && passwordConfirm!= undefined) {
        throw new Error("'password' de acceso deve ser gerado automaticamente")
    }else{
        const createPasswordBand = ("play@" + withoutSpace)
        return createPasswordBand
    }
}