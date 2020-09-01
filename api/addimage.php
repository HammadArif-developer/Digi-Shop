<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $id = mysqli_real_escape_string($con, trim($request->id));
  $filename = mysqli_real_escape_string($con, trim($request->filename));
    $sql = "INSERT INTO `image` (`id`,`image_url`,`image_title`,`product_id`,`brand_id`) VALUES (null,'{$filename}','{$filename}','{$id}',null)";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}