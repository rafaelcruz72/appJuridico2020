$(document).ready(function(){

    $('.btn-save').click(function(e){

        e.preventDefault();

        let dados = new FormData(document.getElementById('form-processo'))

        $.ajax({
            type: "POST",
            dataType: "json",
            data: dados,
            url: "src/processos/modelo/create-processo.php",
            nimeType: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            success: function(dados){
                Swal.fire({
                    title: 'appJuridico',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-processo').modal('hide')
                //$('#table-processo').DataTable().ajax.reload()
            } 
        })
    })
})