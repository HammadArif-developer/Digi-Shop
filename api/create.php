<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
//   if(trim($request->number) === '' || (float)$request->title < 0)
//   {
//     return http_response_code(400);
//   }

  // Sanitize.
  $title = mysqli_real_escape_string($con, trim($request->title));
//   $amount = mysqli_real_escape_string($con, (int)$request->amount);


  // Create.
  $sql = "INSERT INTO `brand`(`title`) VALUES ('{$title}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $policy = [
      'title' => $title,
    //   'amount' => $amount,
    //   'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($policy);
  }
  else
  {
    http_response_code(422);
  }
}