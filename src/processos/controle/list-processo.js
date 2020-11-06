$(document).ready(function(){

    $('#table-processo').DataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 5,
        "lengthMenu": [5, 10, 25, 50],
        "language":{
            "url": "recursos/DataTable/dataTables.brazil.json"
        },
        "ajax": {
            "url": "src/processos/modelo/list-processo.php",
            "type": "POST"
        },
        "columns": [
           { "data": "idprocesso" },
           { "data": "num_processo" },
           { "data": "titulo" },
           { 
               "data": "dataprocesso",
               "className": 'text-center'
           },
           {
               "data": "dataencerramento",
               "className": 'text-center'
           },
           {"data": "tipo_processo"},
            {"data": "cliente"},
           {
               "data": "idprocesso",
               "className": "text-right",
               "orderable": false,
               "searchable": false,
               "render": function(data){
                   return `
                    <button id="${data}" class="btn btn-sm btn-primary btn-visualizar"><i class="fas fa-eye"></i></button>
                    <button id="${data}" class="btn btn-sm btn-warning btn-editar"><i class="fas fa-pencil-alt"></i></button>
                    <button id="${data}" class="btn btn-sm btn-danger btn-deletar"><i class="fas fa-trash"></i></button>
                   `
               }
           }
        ]
    })

})