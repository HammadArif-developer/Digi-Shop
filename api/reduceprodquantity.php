<?php
require 'database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($con, trim($request->id));
    $quantity = mysqli_real_escape_string($con, trim($request->quantity));
    $sql = "UPDATE product SET available_quantity = $quantity WHERE id = $id";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}