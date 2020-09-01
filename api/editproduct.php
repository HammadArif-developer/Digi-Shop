<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $sale_id = mysqli_real_escape_string($con, trim($request->sale_id));
    $product_id = mysqli_real_escape_string($con, trim($request->id));
    $title = mysqli_real_escape_string($con, trim($request->Title));
    $Description = mysqli_real_escape_string($con, trim($request->description));
    $available_quantity = mysqli_real_escape_string($con, trim($request->Quantity));
    $category_id = mysqli_real_escape_string($con, trim($request->Category));
    $subcategory_id = mysqli_real_escape_string($con, trim($request->Subcategory));
    $brand_id = mysqli_real_escape_string($con, trim($request->Brand));
    $vendor_id = mysqli_real_escape_string($con, trim($request->Vendor));
    $status_id = mysqli_real_escape_string($con, trim($request->Status));
    $purchase_price = mysqli_real_escape_string($con, trim($request->Purchaseprice));
    $sell_price = mysqli_real_escape_string($con, trim($request->Sellingprice));
    $profit = $sell_price - $purchase_price;
    $warranty = mysqli_real_escape_string($con, trim($request->Warranty));
    $product_code = mysqli_real_escape_string($con, trim($request->code));
    $status_id = 1;
    $sql = "UPDATE product SET sale_id = $sale_id, title = '$title' , description = '$Description' , available_quantity = $available_quantity , category_id = $category_id, brand_id = $brand_id, vendor_id = $vendor_id, status_id = $status_id, purchase_price = $purchase_price, sell_price= $sell_price, profit= $profit, warranty= $warranty, product_code= '$product_code', subcategory_id = $subcategory_id WHERE id = $product_id";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
    }
    else
    {
        http_response_code(422);
    }
}