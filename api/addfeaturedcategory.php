<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $category_id = mysqli_real_escape_string($con, trim($request->category_id));
  $title = mysqli_real_escape_string($con, trim($request->title));
  $image = mysqli_real_escape_string($con, trim($request->image));
  $status_id = 1;
    $sql = "INSERT INTO `feature_category` (`id`,`category_id`,`title`,`status_id`,`image`) VALUES (null,'{$category_id}','{$title}','{$status_id}','{$image}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}