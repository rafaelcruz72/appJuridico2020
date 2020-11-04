<?php

    include('../../banco/conexao.php');

    if($conexao){

        $requestData = $_REQUEST;
        $arquivo = $_FILES['arquivo'];

        if(!empty($requestData['num_processo']) && !empty($requestData['titulo']) &&
           !empty($requestData['dataprocesso']) && !empty($requestData['idtipo_processo']) &&
           !empty($requestData['idcliente']) && !empty($arquivo) && $arquivo['error'] == 0){

            //$requestData = array_map('utf8_encode', $requestData);

            $data = str_replace('/','-',$requestData['dataprocesso']);
            $requestData['dataprocesso'] = date('Y-m-d H:i:s', strtotime($data));

            $requestData['descricao'] = preg_replace("/(\\r)?\\n/i", "<br>", $requestData['descricao']);

            $pasta = "arquivos/";
            if(!file_exists('../' . $pasta)) mkdir('../' . $pasta, 0755);

            $nomeTemporario = $arquivo['tmp_name'];
            $nomeArquivo = $arquivo['name'];
            $extensao = pathinfo($nomeArquivo, PATHINFO_EXTENSION);
            $novoNome = uniqid(time()) . '.' . $extensao; 
            $destino = $pasta . $novoNome;           

            if(move_uploaded_file($nomeTemporario, $destino)){

                $sql = "INSERT INTO processos (num_processo, titulo, descricao, arquivo, dataprocesso, idtipo_processo, idcliente) VALUES('{$requestData['num_processo']}','{$requestData['titulo']}','{$requestData['descricao']}','{$destino}','{$requestData['dataprocesso']}','{$requestData['idtipo_processo']}','{$requestData['idcliente']}')";

                $resultado = mysqli_query($conexao, $sql);
                if($resultado){
                    $dados = array(
                        'tipo' => TP_MSG_SUCCESS,
                        'mensagem' => "Processo cadastrado com sucesso."
                    );
                } else {
                    $dados = array(
                        'tipo' => TP_MSG_ERROR,
                        'mensagem' => "Não foi possível cadastrar o processo."
                    );
                    unlink($destino);
                }
            } else{
                $dados = array(
                    'tipo' => TP_MSG_ERROR,
                    'mensagem' => "Não foi possível realizar o upload do arquivo."
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