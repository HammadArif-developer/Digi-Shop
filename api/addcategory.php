<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $title = mysqli_real_escape_string($con, trim($request->title));
  $description = mysqli_real_escape_string($con, trim($request->description));
  $status_id = 1;
    $sql = "INSERT INTO `category` (`id`,`title`,`description`,`status_id`) VALUES (null,'{$title}','{$description}','{$status_id}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}