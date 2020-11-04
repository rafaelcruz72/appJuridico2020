$(document).ready(function(){

    $('.btn-new-processo').click(function(e){

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo Processo')

        $('.modal-body').load('src/processos/visao/form-processo.html', function(){
            
            //Ajax para o tipo processo
            $.ajax({
                type: 'POST',
                dataType: 'json',
                assync: true,
                url: 'src/tipos_processos/modelo/all-tipo_processo.php',
                success: function(retorno){
                   
                    for (const dado of retorno.dados) {
                        $('#idtipo_processo').append(`<option value="${dado.idtipo_processo}">${dado.nome.toUpperCase()}</option>`)
                    }
                }
            })

            //Ajax para o cliente
            $.ajax({
                type: 'POST',
                dataType: 'json',
                assync: true,
                url: 'src/clientes/modelo/all-cliente.php',
                success: function(retorno){
                    
                    for (const dado of retorno.dados) {
                        $('#idcliente').append(`<option value="${dado.idcliente}">${dado.nome.toUpperCase()}</option>`)
                    }
                }
            })
        })

        $('.btn-update').hide()
        $('.btn-save').show()

        $('#modal-processo').modal('show')

    })
})