/*
1.TOMAR EL FORMULARIO

2.TOMAR LOS DATOS CARGADOS

3. VER SI EXISTE UN EMAIL COMO EL QUE EL USUARIO INGRESA

4.CORROBAR QUE EXISTA LA CONTRASEÑA



HACER EL LOGIN

*/


const users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.getElementById("login-form") 

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;

    const user = users.find((usr) => {
        
        if(usr.email.toLowerCase() === email.toLowerCase()) {
            return true
        }

        return false
    })

    if(!user || user.password !== password) {
        Swal.fire({
            icon: 'error' , 
            title: 'Login Incorrecto',
            text: 'Alguno de los datos ingresados no es correcto',
            timer: 2000
        })
        return
    }

    delete user.password;

    localStorage.setItem("currentUser", JSON.stringify(user))


    Swal.fire({
        icon: 'success',
        title: 'Login Correcto',
        text: 'Será redireccionado en un momento'
    })

        setTimeout(function(){

        window.location.href = '/index.html'
    },
    2500)

})

