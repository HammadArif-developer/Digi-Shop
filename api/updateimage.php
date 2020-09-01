<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $productid = mysqli_real_escape_string($con, trim($request->id));
    $id = mysqli_real_escape_string($con, trim($request->image_id));
    $filename = mysqli_real_escape_string($con, trim($request->filename));
    $sql = "UPDATE `image` SET `image_url` = '{$filename}',`image_title` = '{$filename}',`product_id` = '{$productid}' WHERE id = $id";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}