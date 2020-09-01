<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $product_id = mysqli_real_escape_string($con, trim($request->id));
    $status_id = 0;
    $sql = "UPDATE product SET status_id = $status_id where id = $product_id";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}