<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $orderId = mysqli_real_escape_string($con, trim($request->order_id));
    $policies = [];
    $sql = "SELECT * FROM ordered_product where order_id = {$orderId}";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['product_id'] = $row['product_id'];
        $policies[$i]['order_id'] = $row['order_id'];
        $policies[$i]['quantity'] = $row['quantity'];
        $i++;
    }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}