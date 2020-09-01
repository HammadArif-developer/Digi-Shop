<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($con, trim($request->id));
    $policies = [];
    $sql = "SELECT * FROM order_table WHERE id = $id";

    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $policies[$i]['id']    = $row['id'];
            $policies[$i]['address'] = $row['address'];
            $policies[$i]['order_date'] = $row['order_date'];
            $policies[$i]['order_delivery_date'] = $row['order_delivery_date'];
            $policies[$i]['product_ids'] = $row['product_ids'];
            $policies[$i]['quantity'] = $row['quantity'];
            $policies[$i]['contact_person'] = $row['contact_person'];
            $policies[$i]['contact_person_number1'] = $row['contact_person_number1'];
            $policies[$i]['contact_person_number2'] = $row['contact_person_number2'];
            $policies[$i]['total_amount'] = $row['total_amount'];
            $policies[$i]['order_code'] = $row['order_code'];
            $policies[$i]['current_status'] = $row['current_status'];
            $i++;
        }
        echo json_encode($policies);
    }
    else
    {
        http_response_code(404);
    }
}