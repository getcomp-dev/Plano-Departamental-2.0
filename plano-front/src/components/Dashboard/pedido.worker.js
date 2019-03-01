const axios = require('axios')
onmessage = function (e){
    if(e.data){
        axios({
            method: 'post',
            url: 'http://200.131.219.57:3000/api/pedido/' + e.data.pedido.Curso + '&&' + e.data.pedido.Turma,
            headers: {Authorization: 'Bearer '+ e.data.token},
            data: {
                vagasPeriodizadas: e.data.pedido.vagasPeriodizadas,
                vagasNaoPeriodizadas: e.data.pedido.vagasNaoPeriodizadas,
                Curso: e.data.pedido.Curso,
                Turma: e.data.pedido.Turma
            }
        }).then((response) => {postMessage(response.data)})
    }
}

