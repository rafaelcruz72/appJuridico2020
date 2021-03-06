$(document).ready(function() {

    $('#table-cliente').on('click', 'button.btn-editar', function(e){

        e.preventDefault();

        $('.modal-title').empty();
        $('.modal-body').empty();

        $('.modal-title').append(`Edição do Cliente #${$(this).attr('id')}`)

        let idcliente = `idcliente=${$(this).attr('id')}`

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
                        $('#telefone').val(dado.dados.telefone)
                        $('#email').val(dado.dados.email)
                        $('#txtDataAgora').val('Data Modificação:')
                        let dataagora = new Date().toLocaleString()
                        $('#dataagora').val(dataagora)

                        if(dado.dados.ativo == "N"){
                            $('#ativo').removeAttr('checked')
                        }

                        $('#idcliente').val(dado.dados.idcliente)
                    })

                    $('.btn-save').hide()
                    $('.btn-update').show()
                    $('#modal-cliente').modal('show')

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