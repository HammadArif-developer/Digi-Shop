<?php
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($con, trim($request->id));
    $policies = [];
    $sql = "SELECT * FROM ratings WHERE product_id = $id";

    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $policies[$i]['id']    = $row['id'];
            $policies[$i]['stars'] = $row['stars'];
            $policies[$i]['product_id'] = $row['product_id'];
            $i++;
        }
        echo json_encode($policies);
    }
    else
    {
        http_response_code(404);
    }
}