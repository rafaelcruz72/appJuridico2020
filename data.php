<?php

$dia = new DateTime();
$dia2 = new DateTime();

$dia->modify('next monday');

echo $dia->format('Y-m-d H:i:s') . '<br>';

$dia2->modify('next friday');

echo $dia2->format('Y-m-d H:i:s') . '<br>';