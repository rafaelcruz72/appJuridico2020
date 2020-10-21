$(document).ready(function(){

    $('.btn-update').click(function(e){

        e.preventDefault();
        
        let dados = $("#form-cliente").serialize()

        $('input[type=checkbox]').each(function(){
            if(!this.checked){
                dados += '&' + this.name + '=off'
            }
        })

        console.log(dados)

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/clientes/modelo/update-cliente.php',
            success: function(dados){
                Swal.fire({
                    title: 'appJuridico',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-cliente').modal('hide')
                $('#table-cliente').DataTable().ajax.reload()
            }
        })
    })
})