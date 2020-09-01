<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $productId = mysqli_real_escape_string($con, trim($request->product_id));
    $policies = [];
    $sql = "SELECT * FROM image where product_id = {$productId}";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['image_url'] = $row['image_url'];
        $policies[$i]['image_title'] = $row['image_title'];
        $policies[$i]['product_id'] = $row['product_id'];
        $policies[$i]['brand_id'] = $row['brand_id'];
        $i++;
    }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}