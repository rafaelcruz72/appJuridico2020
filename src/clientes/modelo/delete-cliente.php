<?php

    include('../../banco/conexao.php');

    if($conexao){

        $requestData = $_REQUEST;

        $id = isset($requestData['idcliente']) ? $requestData['idcliente'] : '';
            
        $sql = "DELETE FROM clientes WHERE idcliente = $id";

        $resultado = mysqli_query($conexao, $sql);
        if($resultado){
            $dados = array(
                'tipo' => TP_MSG_SUCCESS,
                 'mensagem' => "Cliente deletado com sucesso."
            );
        } else {
            $dados = array(
                'tipo' => TP_MSG_ERROR,
                 'mensagem' => "Não foi possível deletar o cliente."
            );
        }
    
        mysqli_close($conexao);

    } else {
        $dados = array(
            'tipo' => TP_MSG_INFO,
            'mensagem' => MSG_FALHA_CONEXAO
        );
    }

    echo json_encode($dados, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);