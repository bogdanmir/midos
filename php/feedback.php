<?php 

$to       = "Info@MidosDevelopment.com";
$tema     = "Midos";
$array_def = array(
	'firstName' => null,
	'lastName' => null,
	'email' => null,
	'phone' => null,
	'select' => null,
);

$array_def = array_replace($array_def,$_POST);
$scip_send = false;
$send_status = false;
$out_m = array();
if(!empty($array_def['email']) && !filter_var($array_def['email'], FILTER_VALIDATE_EMAIL)){
	$out_m['alert_message'] = "Your email is'nt correct!";
	$scip_send = true;
}
$message = "";
if($scip_send === false){

	if(!empty($array_def['firstName'])){
		$message .= "<br>First name: ".$array_def['firstName']."\n";
	}
	if(!empty($array_def['lastName'])){
		$message .= "<br>Last name: ".$array_def['lastName']."\n";
	}
	$message .= "<br>E-mail: ".$array_def['email']."\n";
	if(!empty($array_def['phone'])){
		$message .= "<br>Phone number: ".$array_def['phone']."\n";
	}
	if(!empty($array_def['select'])){
		$message .= "<br>Are you an accredited investor?: ".$array_def['select']."\n";
	}
	if(!empty($array_def['select_tax'])){
		$message .= "<br>Do you file U.S. tax returns?: ".$array_def['select_tax']."\n";
	}
	if(!empty($array_def['select_about_us'])){
		$message .= "<br>How did you hear about us?: ".$array_def['select_about_us']."\n";
	}
	if(!empty($array_def['message_investment_goals'])){
		$message .= "<br>What are your investment goals?: ".$array_def['message_investment_goals']."\n";
	}
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

	if(mail($to, $tema, $message, $headers) ){
		// $out_m['alert_message'] = "Thank you. We will reach out to you shortly";
		$send_status = true;
	}else{
		// $out_m['alert_message'] = "Something went wrong, go back and try again!";
	}
	$out_m['send_status'] = $send_status;
}
echo json_encode($send_status);
exit();
?>