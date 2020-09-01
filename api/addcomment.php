<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
//   $id = mysqli_real_escape_string($con, trim($request->id));
    $description = mysqli_real_escape_string($con, trim($request->description));
    $comment_by = mysqli_real_escape_string($con, trim($request->comment_by));
    $product_id = mysqli_real_escape_string($con, trim($request->product_id));
    $email = mysqli_real_escape_string($con, trim($request->email));
    $comment_date=date("Y-m-d");
    $sql = "INSERT INTO `reviews` (`id`,`description`,`comment_by`,`comment_date`,`product_id`,`email`) VALUES (null,'{$description}','{$comment_by}','{$comment_date}','{$product_id}','{$email}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}