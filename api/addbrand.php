<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $title = mysqli_real_escape_string($con, trim($request->title));
    $sql = "INSERT INTO `brand` (`id`,`title`) VALUES (null,'{$title}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}