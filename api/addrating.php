<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $stars = mysqli_real_escape_string($con, trim($request->stars));
    $id = mysqli_real_escape_string($con, trim($request->id));
    $sql = "INSERT INTO `ratings` (`id`,`stars`,`product_id`) VALUES (null,$stars,$id)";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}