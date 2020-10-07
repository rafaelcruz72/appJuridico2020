$(document).ready(function(){

    $('#table-cliente').on('click', 'button.btn-visualizar', function(e){

        e.preventDefault()

        $('.modal-title').empty()
        $('modal-body').empty()

        let idcliente = `idcliente=${$(this).attr('id')}`

        $('.modal-title').append(`Visualização do Cliente #${$(this).attr('id')}`)

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: idcliente,
            url: 'src/clientes/modelo/view-cliente.php',
            success: function(dado){
                if(dado.tipo == "success"){

                    $('.modal-body').load('src/clientes/visao/form-cliente.html', function(){

                        $('#nome').val(dado.dados.nome)
                        $('#nome').attr('readonly', 'true')

                        $('#dataagora').val(dado.dados.datamodificacao)

                        $('#email').val(dado.dados.email)
                        $('#email').attr('readonly', 'true')

                        $('#telefone').val(dado.dados.telefone)
                        $('#telefone').attr('readonly', 'true')

                        if(dado.dados.ativo == "N"){
                            $('#ativo').removeAttr('checked')
                        }

                        $('#ativo').attr('readonly', 'true')

                        $('#idcliente').val(dado.dados.idcliente)
                    })

                    $('.btn-save').hide()
                    $('#modal-cliente').modal('show')

                } else{
                    Swal.fire({
                        title: 'appJuridico',
                        text: dado.mensagem,
                        type: dado.tipo,
                        confirmButtonText: "OK"
                    })
                }

            }
        })
    })
})