<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $product_id = mysqli_real_escape_string($con, trim($request->product_id));
    $ordered_id = mysqli_real_escape_string($con, trim($request->ordered_id));
    $quantity = mysqli_real_escape_string($con, trim($request->quantity));
    $sql = "INSERT INTO `ordered_product` (`id`,`product_id`,`order_id`,`quantity`) VALUES (null,$product_id,$ordered_id,$quantity)";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}