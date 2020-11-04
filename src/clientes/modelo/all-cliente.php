<?php

    include('../../banco/conexao.php');

    if($conexao){

            $requestData = $_REQUEST;

                  
            $sql = "SELECT * FROM clientes WHERE ativo = 'S'";

            $resultado = mysqli_query($conexao, $sql);

            if($resultado && mysqli_num_rows($resultado) > 0){

                $dadosTipo = [];
                while($linha = mysqli_fetch_assoc($resultado)){
                    $dadosTipo[] = $linha;
                }

                $dados = array(
                    'tipo' => TP_MSG_SUCCESS,
                    'mensagem' => "",
                    'dados' => $dadosTipo
                );
            } else {
                $dados = array(
                    'tipo' => TP_MSG_ERROR,
                    'mensagem' => "Não foi possível selecionar o cliente.",
                    'dados' => array()
                );
            }

        
        
        mysqli_close($conexao);

    } else{
        $dados = array(
            'tipo' => TP_MSG_ERROR,
            'mensagem' => "Não foi possível obter uma conexão.",
            'dados' => array()
        );
    }

    echo json_encode($dados, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
