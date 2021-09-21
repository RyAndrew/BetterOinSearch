<?php

class BetterOinSearch {

	function getCsvHeaders()
	{
		$fp = fopen('oin.csv', 'r');
		$line = fgetcsv($fp);
		echo join(',',$line);

	}

	function convertCsvToJsonFile(){
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

	function updateOinData(){

		require_once('key.php');

		$curlSession = curl_init();

		curl_setopt_array($curlSession, [
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_FOLLOWLOCATION => false,
			CURLOPT_HTTPHEADER => ["Authorization: SSWS ".$key]
		]);

		$server_output = curl_exec($curlSession);
		$curl_error = curl_error($curlSession);

		if($server_output === false){
			die("Failed to curl to '".$url."' ".$curl_error);
		}

		$responseCode = curl_getinfo($curlSession, CURLINFO_RESPONSE_CODE);
		if($responseCode !== 200){
			die("Curl Response Code not 200! Code returned: {$responseCode}<BR>\r\n<BR>\r\n{$server_output}");
		}

		curl_close($curlSession);

		$tempFile = uniqid().'.json';
		file_put_contents($tempFile, $server_output);

		$fp = fopen($tempFile,'r');
		$data = [];

		//skip header line
		fgetcsv($fp);

		while($line = fgetcsv($fp)) {
			foreach ($line as &$col) {
				$col = trim($col);
				$col = mb_convert_encoding($col, 'UTF-8', mb_detect_encoding($col, 'UTF-8, ISO-8859-1', true));
			}
			$data[] = $line;
		}

		unlink($tempFile);

		if(false === $dataJson = json_encode($data, JSON_THROW_ON_ERROR)){
			die('failed to json encode!');
		}

		$rootDir = $_SERVER['DOCUMENT_ROOT'].'/BetterOinSearch/';
		$date = date('Y-m-d_g-i-s');
		@rename($rootDir.'oin.json',"{$rootDir}oin-{$date}.json");
		file_put_contents($rootDir.'oin.json',$dataJson);

		echo "oin.json updated! {$date}";
	}

	function route(){
		$uri = parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);

		if(FALSE === $lastSlash = strrpos($uri, '/')){
			die('invalid route');
		}
		$method = substr($uri,$lastSlash+1);

		if(FALSE === is_callable([$this, $method])){
			die('invalid route');
		}
		$this->$method();

	}

}

$inst = new BetterOinSearch();
$inst->route();
