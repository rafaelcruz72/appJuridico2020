$(document).ready(function(){

    $('#table-cliente').DataTable({
        "processing": true,
        "pageLength": 5,
        "lengthMenu": [5, 10, 25, 50],
        "language":{
            "url": "recursos/DataTable/dataTables.brazil.json"
        }
    })

})