var bot = {};

function falaBot() {
    setInterval(function () {
        var x = Math.floor(Math.random() * 5)

        switch (x) {
            case 0:

                document.getElementById('mensagem').value = 'Olá, eu sou o bot Júnior, tudo bem ?'
                break
            case 1:

                document.getElementById('mensagem').value = 'Eae parceiro, como vai o dia hoje ?'
                break
            case 2:

                document.getElementById('mensagem').value = 'Não se preocupe, o dia só ta melhorando pra você.'
                break
            case 3:

                document.getElementById('mensagem').value = 'Oi, eu sou o bot Júnior, vim ti dizer que você é uma pessoa maravilhosa.'
                break
            case 4:

                document.getElementById('mensagem').value = 'UHUUUL!!! Que dia espetacular hem.'
                break
        }
    }, 4000)

}

falaBot()



