const axios = require('axios')
onmessage = function (d){
    var e = JSON.parse(d.data)
    if(e){
        axios({
            method: 'post',
            url: 'http://200.131.219.57:3000/api/pedido/' + e.pedido.Curso + '&&' + e.pedido.Turma,
            headers: {Authorization: 'Bearer '+ e.token},
            data: {
                vagasPeriodizadas: e.pedido.vagasPeriodizadas,
                vagasNaoPeriodizadas: e.pedido.vagasNaoPeriodizadas,
                Curso: e.pedido.Curso,
                Turma: e.pedido.Turma
            }
        }).then((response) => {
            var m = JSON.stringify(response.data)
            postMessage(m)})
    }
}

