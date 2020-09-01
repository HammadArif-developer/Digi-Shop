<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $address = mysqli_real_escape_string($con, trim($request->address));
  $productId = mysqli_real_escape_string($con, trim($request->productId));
  $quantity = mysqli_real_escape_string($con, trim($request->quantity));
  $contactPerson = mysqli_real_escape_string($con, trim($request->contact_person));
  $contactPersonNumber1 = mysqli_real_escape_string($con, trim($request->contact_person_number1));
  $contactPersonNumber2 = mysqli_real_escape_string($con, trim($request->contact_person_number2));
  $totalAmount = mysqli_real_escape_string($con, trim($request->totalAmount));
  $ordercode = mysqli_real_escape_string($con, trim($request->ordercode));
  $start_date=date("Y-m-d");
  $date = strtotime("+7 day"); 
  $delivery_date = date("Y-m-d",$date);
  // Create.
  $sql = "INSERT INTO `order_table`(`id`,`address`,`product_ids`,`quantity`,`contact_person`,`contact_person_number1`,`contact_person_number2`,`total_amount`,`order_code`,`order_date`,`order_delivery_date`) VALUES (null,'$address','$productId','$quantity','$contactPerson','$contactPersonNumber1','$contactPersonNumber2','$totalAmount','$ordercode','$start_date','$delivery_date')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $policy = [
    `address` => $address,
    `product_ids` => $productId,
    `quantity` => $quantity,
    `contact_person` => $contactPerson,
    `contact_person_number1` => $contactPersonNumber1,
    `contact_person_number2` => $contactPersonNumber2,
    `total_amount` => $totalAmount,
    `order_code` => $ordercode,
    'id'    => mysqli_insert_id($con) 
    ];
    echo json_encode($policy);
  }
  else
  {
    http_response_code(422);
  }
}