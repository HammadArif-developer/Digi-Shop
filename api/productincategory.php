<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $cat_id = mysqli_real_escape_string($con, trim($request->cat_id));
    $policies = [];
    $sql = "SELECT * FROM product where status_id = 1 and category_id = {$cat_id}";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['title'] = $row['title'];
        $policies[$i]['description'] = $row['description'];
        $policies[$i]['available_quantity'] = $row['available_quantity'];
        $policies[$i]['review_id'] = $row['review_id'];
        $policies[$i]['category_id'] = $row['category_id'];
        $policies[$i]['brand_id'] = $row['brand_id'];
        $policies[$i]['vendor_id'] = $row['vendor_id'];
        $policies[$i]['ratings'] = $row['ratings'];
        $policies[$i]['status_id'] = $row['status_id'];
        $policies[$i]['purchase_price'] = $row['purchase_price'];
        $policies[$i]['sell_price'] = $row['sell_price'];
        $policies[$i]['profit'] = $row['profit'];
        $policies[$i]['warranty'] = $row['warranty'];
        $policies[$i]['product_code'] = $row['product_code'];
        $policies[$i]['sale_id'] = $row['sale_id'];
        $policies[$i]['subcategory_id'] = $row['subcategory_id'];
        $policies[$i]['size'] = $row['size'];
        $policies[$i]['size_type'] = $row['size_type'];
        $i++;
    }

    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}