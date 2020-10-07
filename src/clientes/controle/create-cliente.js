$(document).ready(function(){

    $('.btn-save').click(function(e){

        e.preventDefault()

        let dados = $('#form-cliente').serialize()

        $('input[type=checkbox]').each(function(){
            if(!this.checked){
                dados += '&' + this.name + '=off'
            }
        })

        $.ajax({
           type: 'POST',
           dataType: 'json',
           assync: true,
           data: dados,
           url: 'src/clientes/modelo/create-cliente.php',
           success: function(dados){
               console.log('passou por aqui')
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