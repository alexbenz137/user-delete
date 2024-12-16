//Este archivo header lo vamos a utilizar cross todo el sitio
/*
PASOS

tenemos que obtener el nav y el user info
Hay que evaluar si tenemos un usuario logueado
Si tenemos user logueado
        (Evalular su role y ver si pintamos en el nav el boton de admin product y admin user)
        User info:
                -Pintar el nombre del user
                -Pintar el boton de LOG OUT
        
        Si no tenemos user logueado
            -No pintamos los botones admin
            -no colocamos el name
            -Pintamos el botón login

*/

const headerNav = document.getElementById('header-nav')
const userInfoHeader = document.getElementById('header-user')

//HAY QUE EVALUAR SI TENEMOS UN USUARIO LOGUEADO
const loguedUser = JSON.parse(localStorage.getItem("currentUser"))

if(loguedUser) {
    //TENGO UN USUARIO LOGUEADO
    if(loguedUser.role === 'ADMIN_ROLE') {

        //PINTAR LOS BOTONES DE ADMIN
        const adminUserLink = document.createElement("a")

        adminUserLink.href = '/pages/user-admin.html'
        adminUserLink.innerText = 'User admin'
        adminUserLink.classList.add('header-link')

        headerNav.appendChild(adminUserLink)


        const adminProductLink = document.createElement("a")
        adminProductLink.href = '/pages/product-admin.html'
        adminProductLink.innerText = 'Product admin'
        adminProductLink.classList.add('header-link')
        headerNav.appendChild(adminProductLink)


    }{

    const userNameHTML = userInfoHeader.querySelector('.user-name')

    userNameHTML.innerText = loguedUser.fullname

    const userImg = document.createElement('img')
    userImg.src = loguedUser.image
    userImg.alt = `${loguedUser.fullname} profile picture`
    userImg.classList.add('user-profile-picture')

    userInfoHeader.appendChild(userImg)


    //LOGOUT ACTION BUTTON
    const userActionHTML = userInfoHeader.querySelector('.user-action')

    const logoutButton = document.createElement('button')
    logoutButton.classList.add('header-link')
    logoutButton.innerText = 'Logout'

    logoutButton.onclick = function() {

        localStorage.removeItem("currentUser")
        window.location.href = '/index.html';
        
    }

    userActionHTML.appendChild(logoutButton)

    }

} else{
    ///NO TENGO UN USER LOGUEADO
    const userActionHTML = userInfoHeader.querySelector('.user-action')

    const loginLink = document.createElement('a')
    loginLink.href = '/login/login.html'
    loginLink.innerText = "Ingresar"
    loginLink.classList.add('header-link')

    userActionHTML.appendChild(loginLink)
}