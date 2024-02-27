const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const check = document.getElementById('checkboxPremium')

nome.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        email.focus()
    }
})
email.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        senha.focus()
    }
})
senha.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        check.focus()
    }
})
check.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        if(check.checked){
            check.checked = false
        }
    else{
        check.checked = true
    }
    }
})
async function validarEmail(mail){
    let validacao = true
    const responseApi = await fetch('http://localhost:5082/usuario')
    const listUsers = await responseApi.json()
    listUsers.forEach(user => {
        console.log(user)
        if(user.email == mail){
            //email já existe
            validacao = false
        }
        return validacao
    });
}
async function cadastroUsuario() {

    let premium = false
    if(check.checked)
        premium = true

    if (nome.value == "" || email.value == "" || senha.value == "") {
        alert("Preencha os campos devidamente!")
    } else if(!(await validarEmail(email.value))){
        alert("Já existe um usuário cadastrado com esse email!!")
        console.log((await validarEmail(email.value)))
    } else if(senha.value.length<8){
        alert("Senha muito fraca. Deve conter pelo menos 8 dígitos")
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha.value)) {
        alert("Senha muito fraca. Deve conter pelo menos um caractere especial");
    } else {
        try {
            const novoUsuario = {
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                premium: premium
            }
            await fetch('http://localhost:5082/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario)
            })
            window.location.href = '../login/login.html'
        } catch (error) {
            console.log(error)
        }
    }
}

