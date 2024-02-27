'use strict'
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const buttonValidar = document.getElementById('buttonValidarLogin')
buttonValidar.addEventListener('click',validarLogin)
email.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        senha.focus()
    }
})
senha.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        buttonValidar.click()
    }
})


async function validarLogin(){
    let logado = false
    try{
        const responseApi = await fetch('http://localhost:5082/usuario')
        const listUsers = await responseApi.json()
        listUsers.forEach((user) => {
            console.log(user.email)
            console.log(user.senha)
            if(email.value === user.email && senha.value === user.senha){
                logado = true
                localStorage.setItem("idusuario", user.id)
                window.location.href = '../home/index.html'
            }
        })
        if(!logado)
        alert("Login inválido!")
    } catch(error){
        console.log(error)
    }
}