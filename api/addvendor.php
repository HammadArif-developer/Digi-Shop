<?php
require 'database.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $vendor_name = mysqli_real_escape_string($con, trim($request->Vendorname));
    $vendor_number = mysqli_real_escape_string($con, trim($request->Vendornumber));
    $contact_person = mysqli_real_escape_string($con, trim($request->Contactperson));
    $contact_person_number = mysqli_real_escape_string($con, trim($request->Contactpersonnumber));
    $address = mysqli_real_escape_string($con, trim($request->address));
    $sql = "INSERT INTO `vendor` (`id`,`vendor_name`,`vendor_number`,`contact_person`,`contact_person_number`,`address`) VALUES (null,'{$vendor_name}','{$vendor_number}','{$contact_person}','{$contact_person_number}','{$address}')";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}