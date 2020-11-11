<?php

include '../../banco/conexao.php';

if($conexao){

    $requestData = $_REQUEST;

    $id = isset($requestData['idprocesso']) ? $requestData['idprocesso'] : '';

    $sql = "SELECT p.idprocesso, p.num_processo, p.titulo, DATE_FORMAT(p.dataprocesso, '%d/%m/%Y %H:%i:%s') as dataprocesso, DATE_FORMAT(p.dataencerramento, '%d/%m/%Y %H:%i:%s') as dataencerramento, p.idtipo_processo, t.nome as tipo_processo, p.idcliente, c.nome as cliente, p.descricao, p.arquivo
    FROM processos p
    INNER JOIN tipos_processos t ON t.idtipo_processo = p.idtipo_processo
    INNER JOIN clientes c ON c.idcliente = p.idcliente 
    WHERE idprocesso = $id ";

    $resultado = mysqli_query($conexao, $sql);

    if($resultado && mysqli_num_rows($resultado) > 0){
        while($linha = mysqli_fetch_assoc($resultado)){
            $dados = $linha;
        }

        $dados = array(
            "tipo" => TP_MSG_SUCCESS,
            "mensagem" => '',
            "dados" => $dados
        );
    } else {
        $dados = array(
            "tipo" => TP_MSG_ERROR,
            "mensagem" => 'Não foi possível localicar o processo.',
            "dados" => array()
        );
    }

    mysqli_close($conexao);

} else {
    $dados = array(
        "tipo" => TP_MSG_INFO,
        "mensagem" => MSG_FALHA_CONEXAO,
        "dados" => array()
    );
}

echo json_encode($dados, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);