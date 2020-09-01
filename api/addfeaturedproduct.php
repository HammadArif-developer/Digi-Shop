<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $product_id = mysqli_real_escape_string($con, trim($request->product_id));
  $image = mysqli_real_escape_string($con, trim($request->image));
  $status_id = 1;
    $sql = "INSERT INTO `featured_product` (`id`,`product_id`,`status_id`,`image`) VALUES (null,'{$product_id}','{$status_id}','{$image}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}