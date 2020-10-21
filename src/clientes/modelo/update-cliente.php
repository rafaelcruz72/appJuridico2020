<?php

    include('../../banco/conexao.php');

    if($conexao){

        $requestData = $_REQUEST;

        if(!empty($requestData['nome']) && !empty($requestData['ativo'])){

            //$requestData = array_map('utf8_encode', $requestData);

            $id = isset($requestData['idcliente']) ? $requestData['idcliente'] : '';
            
            $data = str_replace('/','-',$requestData['dataagora']);
            $data = date('Y-m-d H:i:s', strtotime($data));
            $requestData['ativo'] = $requestData['ativo'] == 'on' ? 'S' : 'N';

            $sql = "UPDATE clientes SET nome = '{$requestData['nome']}', telefone = '{$requestData['telefone']}', email = '{$requestData['email']}', ativo = '{$requestData['ativo']}', datamodificacao = '{$data}' WHERE idcliente = $id";

            $resultado = mysqli_query($conexao, $sql);
            if($resultado){
                $dados = array(
                    'tipo' => TP_MSG_SUCCESS,
                    'mensagem' => "Cliente alterado com sucesso."
                );
            } else {
                $dados = array(
                    'tipo' => TP_MSG_ERROR,
                    'mensagem' => "Não foi possível alterar o cliente."
                );
            }

        } else {
            $dados = array(
                'tipo' => TP_MSG_INFO,
                'mensagem' => MSG_CAMPOS_OBRIGATORIOS
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