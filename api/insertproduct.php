<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  $title = mysqli_real_escape_string($con, trim($request->Title));
  $Description = mysqli_real_escape_string($con, trim($request->description));
  $available_quantity = mysqli_real_escape_string($con, trim($request->Quantity));
  $category_id = mysqli_real_escape_string($con, trim($request->Category));
  $subcategory_id = mysqli_real_escape_string($con, trim($request->Subcategory));
  $brand_id = mysqli_real_escape_string($con, trim($request->Brand));
  $vendor_id = mysqli_real_escape_string($con, trim($request->Vendor));
  $status_id = mysqli_real_escape_string($con, trim($request->Status));
  $sale_id = mysqli_real_escape_string($con, trim($request->Sale));
  $purchase_price = mysqli_real_escape_string($con, trim($request->Purchaseprice));
  $sell_price = mysqli_real_escape_string($con, trim($request->Sellingprice));
  $profit = $sell_price - $purchase_price;
  $warranty = mysqli_real_escape_string($con, trim($request->Warranty));
  $product_code = mysqli_real_escape_string($con, trim($request->code));
  $size_type = mysqli_real_escape_string($con, trim($request->size_type));
  $size = mysqli_real_escape_string($con, trim($request->size));
  $sql = "INSERT INTO `product` (`id`,`title`,`description`,`available_quantity`,`category_id`,`brand_id`,`vendor_id`,`status_id`,`sale_id`,`purchase_price`,`sell_price`,`profit`,`warranty`,`product_code`,`subcategory_id`,`size`,`size_type`) VALUES (null,'$title','$Description',$available_quantity,$category_id,$brand_id,$vendor_id,$status_id,$sale_id,$purchase_price,$sell_price,$profit,$warranty,'$product_code',$subcategory_id,'$size','$size_type')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }
}