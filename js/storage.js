///////////////// 11111111111111/// 

//Guardar datos uso una #key y el #valor

//              #Key/ #Valor
// localStorage. setItem("nombres", "Palmer Eldritch")
//SEEEEET. S S S  SS    SET       S S SSSS 


////////////////// 222222//////////

//recuperar
//localStorage. setItem("nombres", "Palmer Eldritch")


/////////////////// 3 #BORRAR /////////
//borrar un dato guardado 
///localStorage.removeItem("usuarios")


////////////////// 4 ////////////// #FORMATEA TODO
//////Borrar todo el localStorage
//localStorage.clear()


//--------------------0000000000000-------------------------------//

const user = {
    nombre: 'Jose',
    apellido: 'Perez',
    edad: 34
}

localStorage.setItem ( "usuario", JSON.stringify(user) )

//Obtener datos del localStorage

// localStorage.getItem("usuario")
//Json.parse ES IMPORTANTISIMO
const resultado = JSON.parse( localStorage.getItem("usuario"))

console.log(resultado)



