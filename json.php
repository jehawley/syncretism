<?php
  $foo = array('headers' => array(array('name' => 'header1', 'skills' => array(array('name' => 'skill1'), array('name' => 'skill2'))), array('name' => 'header2', 'skills' => array(array('name' => 'skill3')))));
  print(json_encode($foo));
?>
