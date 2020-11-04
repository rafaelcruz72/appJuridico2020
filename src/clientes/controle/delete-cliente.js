$(document).ready(function(){

    $('#table-cliente').on('click','button.btn-deletar', function(e){

        e.preventDefault();

        let idcliente = `idcliente=${$(this).attr('id')}`

        Swal.fire({
            title: 'appJuridico',
            text: 'Deseja realmente excluir o cliente?',
            type: 'question',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if(result.value){

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: idcliente,
                    url: 'src/clientes/modelo/delete-cliente.php',
                    success: function(dados){

                        Swal.fire({
                            title: 'appJuridico',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-cliente').DataTable().ajax.reload()

                    }
                })
            } 
        })
    })
})