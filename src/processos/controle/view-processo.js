$(document).ready(function(){

    $("#table-processo").on('click','button.btn-visualizar', function(e){

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualizar Processo')

        let idProcesso = `idprocesso=${$(this).attr('id')}`

        $.ajax({
            type: "POST",
            dataType: 'json',
            async: true,
            data: idProcesso,
            url: 'src/processos/modelo/view-processo.php',
            success: function(dado){
                if(dado.tipo = "success"){
                    $('.modal-body').load('src/processos/visao/form-processo.html', function(){
                        $('#num_processo').val(dado.dados.num_processo)
                        $('#num_processo').attr('readonly', 'true')
                        $('#titulo').val(dado.dados.titulo)
                        $('#titulo').attr('readonly', 'true')
                        
                        $('#dataprocesso').attr('type', 'text')
                        $('#dataprocesso').val(dado.dados.dataprocesso)
                                                
                        $('#dataprocesso').attr('readonly', 'true')
                        $('#idtipo_processo').append(`<option value="${dado.dados.idtipo_processo}">${dado.dados.tipo_processo}</option>`)
                        $('#idtipo_processo').attr('readonly', 'true')
                        $('#idcliente').append(`<option value="${dado.dados.idcliente}">${dado.dados.cliente}</option>`)
                        $('#idcliente').attr('readonly', 'true')
                        $('#descricao').append(dado.dados.descricao)
                        $('#descricao').attr('readonly', 'true')

                        $('#arquivo').hide()
                        $('#arquivo').after(`<br><a href="src/processos/${dado.dados.arquivo}" class="btn btn-primary">Baixar Arquivo</a>`)
                        $('.btn-save').hide()
                        $('.btn-update').hide()
                    })

                    $('#modal-processo').modal('show')
                } else{
                    Swal.fire({
                       title: 'appJuridico',
                       text: dado.mensagem,
                       type: dado.tipo,
                       confirmButtonText: 'OK' 
                    })
                }
            }
        })

    })
})