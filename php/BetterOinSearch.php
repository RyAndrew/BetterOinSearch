<?php

class BetterOinSearch extends AgileBaseController {

	function convertCsvToJson(){
		$fp = fopen('oin.csv','r');
		$data = [];

		while($line = fgetcsv($fp)){

			foreach($line as &$col){
				$col = trim($col);
				$col = mb_convert_encoding($col, 'UTF-8', mb_detect_encoding($col, 'UTF-8, ISO-8859-1', true));
			}
			$data[] = $line; 
		}

		if(false === $dataJson = json_encode($data, JSON_THROW_ON_ERROR)){
			die('failed to json encode!');
		}

		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename=oin.json'); 
		header('Content-Transfer-Encoding: binary');
		header('Connection: Keep-Alive');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');

		echo $dataJson;

	}

}