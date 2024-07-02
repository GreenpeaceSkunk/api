export const createDonation = async (data: any): Promise<any> => {
  return data;
}

// public function pay($params, $rg_id){
//   $params = json_decode($params);
//   $binary_mode = $params->payment_method_id == "visa" ? "'binary_mode': false" : "'binary_mode': true";
//   $source_pago = $params->card_id != "" ? "schedulado" : "desde landing";
//   $token = $params->card_id != "" ? $this->getCardToken($params->card_id, $rg_id)->id : $params->token;
//   $data = "{
//     'transaction_amount': ".$params->Amount.",
//     'installments': 1,
//     ".$binary_mode.",
//     'issuer_id': '".$params->issuer_id."',
//     'payment_method_id': '".$params->payment_method_id."',
//     'token': '".$token."',
//     'payer': {
//       'id': '".$params->customer_id."'
//     }
//   }";

//   $url = $_ENV['urls']['mercadopago']."?access_token=".$_ENV['credenciales']['mp_token'];
//   $headers = array('Content-Type: application/json', 'Accept: application/json', isset($params->device_id) ? 'X-meli-session-id: '.$params->device_id : "");
//   // if (isset($params->device_id)){
//   //   array_push($headers , 'X-meli-session-id: '.$params->device_id);
//   // }
  
//   $payment = (new Curl($url))->getData($data, $headers);

//   return $this->preparePaymentResponse($payment, $data, $url, $headers, $rg_id, $source_pago);

// }
type GeneratePaymentType = {
  payment_method_id: string; // $params->payment_method_id == "visa" ? "'binary_mode': false" : "'binary_mode': true";
  card_id: string; // $params->card_id != "" ? "schedulado" : "desde landing";
  amount: number;
  issuer_id: string;
  token: string;
  customer_id: string;
};
export const generatePayment = async (data: any): Promise<any> => {
  // installments: number; // 1
  // const binary_mode: boolean =  //$params->payment_method_id == "visa" ? "'binary_mode': false" : "'binary_mode': true";

  // switch($payment->status) {
  //   case 'rejected':
  //     $mensaje = "PAYMENT FAILED";
  //   break;
  //   case 'approved':
  //     $mensaje = "PAYMENT SUCCESS";
  //   break;
  //   case 'pending':
  //     $mensaje = "PAYMENT PENDING";
  //   break;
  //   case 'in_process':
  //     $mensaje = "PAYMENT PENDING";
  //   break;
  // }
  return data;
}
