const usersArray = JSON.parse(localStorage.getItem("users"))


//obtener el body de la tabla
const tableBody = document.getElementById('table-body')
const searchInput = document.querySelector('#search')
const userForm = document.querySelector("form#user-form")
const submitBtn = userForm.querySelector('button[type=submit].btn-form')



userForm.addEventListener("submit", (evt) => {

    evt.preventDefault()

    const el = evt.target.elements

    //deberia cortar la ejecicion de la funcion callback del evento submit

    //!== si la constraseñas son distintas
    if (el.password.value !== el.password2.value) {
        alert(`Las contraseñas no coinciden`)
        return;
    }

    // ! email ya existe
    const emailExist = usersArray.find((user) => {

        if (user.email === el.email.value) {
            return true
        }

    })

    if (emailExist && !el.id.value !== emailExist.id) {
        Swal.fire ({
            title: 'El correo ya existe',
            icon: 'error',
        })
        return
    }

    //ESTO ES LO MISMO QUE DE ABAJO PERO MAS LARGO
    // let id
    // if (el.id.value) {
    //     id = el.id.value
    // } else {
    //     id = crypto.randomUUID()
    // }

    //# OPERADOR TERNARIO
    //           condicion      true        false
    const id = el.id.value ? el.id.value : crypto.randomUUID()

    console.log(el.id.value)

    const user= {
        fullname: el.nombreCompleto.value,

        age: el.age.valueAsNumber, //numero y no string
        email: el.email.value,
        password: el.password.value,
        active: el.active.checked, //true or false
        bornDate: new Date(el.bornDate.value).getTime(),
        location: el.location.value,
        id: id,
        image: el.image.value
    }

    

    //tenemos 2 posible acciones a realizar
    // a - al estar editando deberia reeemplazar el usuario a editar con sus infrormacion actualizada
    //b - agregue un usuario nuevo

    //pregunto si tengo id para saber si estoy editando o no
    if (el.id.value) {
        //editando
        const indice = usersArray.findIndex (usuario => {
            if (usuario.id === el.id.value) {
                return true
            }
            
        })
        
        //remplazo el usuario con los datos nuevos del formulario
        usersArray[indice] = user
        // Swal.fire('Usuario editado','Los datos del usuario fueron actualizados correctamente','success')

        Swal.fire({
            title: 'usuario Editado',
            text: 'El usuario fue editado exitosamente',
            icon: 'success',
            timer: 1000
        })
//al modificiar el array necesito refresacar la vista

    }else {
        //agregando un usuario nuevo
        usersArray.push(user)
        Swal.fire({
            title: 'usuario Creado',
            text: 'El usuario fue creado exitosamente',
            icon: 'success',
            Timer: 1000})
    }

    pintarUsuarios(usersArray)
    
    //actualizo el LocalStorage
    actualizarLocalStorage()
    resetearFormulario()
    
})

function resetearFormulario() {
    userForm.reset() //reseteo el formulario
    userForm.elements.password.disabled = false //activa si estaban desactivado los unput password
    userForm.elements.password2.disabled = false
    submitBtn.classList.remove('btn-edit') //remuevo la clase editar
    submitBtn.innerText = 'Agregar usuario' //vuelvo el texto del botón por defecto
    userForm.elements.nombreCompleto.focus()

}

//Escuchar cuando el usuario presiona una telca en el input search
searchInput.addEventListener('keyup', (eventito) => {


    //obtener el valor del imput
    const inputValue = eventito.target.value.toLowerCase()
    //buscar en todos los usuarios aquellos donde su nombre tenga este texto

    const usuariosFiltrados = usersArray.filter(usuario => {

        const nombre = usuario.fullname.toLowerCase()

        if (nombre.includes(inputValue)) {
            return true
        } return false
    })

    // const usuariosFiltrados = usersArray.filter((usuario) => usuario.nombre.toLowerCase().includes (inputValue)) //TAMBIEN ES VALIDO, MÁS CORTO



    //pintar solo los usuarios que hayan coincidido
    pintarUsuarios(usuariosFiltrados)
    console.log(usuariosFiltrados)


})






function pintarUsuarios(arrayPintar) {
    //iterar el array y agregar un tr por cada alumno que tengamos
    tableBody.innerHTML = '';

    arrayPintar.forEach((user, indiceActual) => {

        tableBody.innerHTML += `
        <tr class="table-body">
                    <td class="user-image">
                        <img src="${user.image}" alt="${user.fullname}">
                    </td>
                    <td class="user-name">${user.fullname}</td>
                    <td class="user-email">${user.email}</td>
                    <td class="user-location">${user.location}</td>
                    <td class="user-age">${user.age}</td>
    
                    <td class="user-date">${formatDate(user.bornDate)}</td>
    
                    <td>
    
                    <button class= "action-btn btn-danger"
                    title= "BORRAR USUARIO"
                    onclick="borrarUsuario('${user.id}', '${fullname}')"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    
                    <button class="action-btn"
                    title="Editar usuario"
                    onclick="editarUsuario( '${user.id}' )">
                    <i class= "fa-solid fa-pen-to-square"></i>
                    </button>
                
                    
                    </td>
                    </tr>`
    })
}

//Llamo por primera vez que se ejectua mi scrpit la funcion pintar usuarios
pintarUsuarios(usersArray)


function actualizarLocalStorage () {
    localStorage.setItem("users", JSON.stringify(usersArray) )
}


function borrarUsuario (Id, nombre) {
    const confirmDelete = confirm ( `Realmente desea borrar este usuario ${nombre}`)

if(confirmDelete) {

    const indice = usersArray.findIndex(user => user.id === Id)

    usersArray.splice(indice, 1)
    pintarUsuarios(usersArray)

    actualizarLocalStorage()

}
}




function editarUsuario(idBuscar) {
    //buscar un usuario y obtenerlo
    const userEdit = usersArray.find((usuario) => {

        //deberia devolver un true, segun la condicion id que me enviaron === al del usuario que estoy iterando

        if (usuario.id === idBuscar) {
            return true
        }
    })

    //indicar que el usuario no fue encontrado
    if (!userEdit) {
        Swal.fire('Error al editar', 'No se puede encontrar el usuario', 'error')
        return
    }

    console.log(userEdit)

    //rellenar el formulario con los datos del usuario a editar
    const el = userForm.elements

    el.id.value = userEdit.id

    el.age.value = userEdit.age
    el.nombreCompleto.value = userEdit.fullname
    el.email.value = userEdit.email
    el.image.value = userEdit.image
    el.location.value = userEdit.location
    el.active.value = userEdit.active

    el.password = userEdit.password
    el.password.disabled = true
    el.password2 = userEdit.password
    el.password2.disabled = true

    el.bornDate.value = formatInputDate(userEdit.bornDate)

    console.log(formatInputDate(userEdit.bornDate))


    //cambiar el nombre del boton a editar usuario
    submitBtn.classList.add('btn-edit')
    submitBtn.innerText = 'Editar usuario'
    //deshabilitar los input de contraseña
}


//⏬⏬⏬



