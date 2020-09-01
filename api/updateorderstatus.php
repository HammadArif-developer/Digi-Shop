<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $id = mysqli_real_escape_string($con, trim($request->id));
  $current_status = mysqli_real_escape_string($con, trim($request->current_status));
  
  $sql = "UPDATE order_table SET current_status = '$current_status' WHERE id = $id";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }
}