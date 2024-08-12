const room = window.location.pathname.replace(/\//g, '')

const socket = io(`http://localhost:3000/${room}`)

let user = null

socket.on('subir_mensagem', (mensagens) => {
    updateMensagens(mensagens)
})

function updateMensagens(mensagens) {
    const div_mensagens = document.getElementById('mensagens');

    let list_mensages = '<ul>'
    mensagens.forEach(mensage => {
        list_mensages += `<li <i class="bi bi-list-check" style="font-size: 1em"></i>${mensage.user} : ${mensage.msg} </li>`
    });

    list_mensages += '</ul>'

    div_mensagens.innerHTML = list_mensages
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mensage_id');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!user) {
            alert("Não tem usuario definido")
            return
        }

        const mensage = document.forms['mensage_form_name']['msg'].value;
        document.forms['mensage_form_name']['msg'].value = '';

        socket.emit('nova_mensage', { user: user, msg: mensage })
    })

    const useForm = document.getElementById('user_id');
    useForm.addEventListener('submit', (e) => {
        e.preventDefault();

        user = document.forms['user_form_name']['user'].value;
        useForm.parentNode.removeChild(useForm)
    })
})

