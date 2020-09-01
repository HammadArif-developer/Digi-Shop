<?php
require 'database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($con, trim($request->id));
    $discount = mysqli_real_escape_string($con, trim($request->discount));
    $title = mysqli_real_escape_string($con, trim($request->title));
    $start_date = mysqli_real_escape_string($con, trim($request->start_date));
    $end_date = mysqli_real_escape_string($con, trim($request->end_date));
    $sql = "UPDATE `sale` SET `discount` = $discount, `title`= $title, `start_date` = $start_date, `end_date` = $end_date WHERE id = $id";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}