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
    $sql = "SELECT * FROM reviews WHERE product_id = $id";
    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $policies[$i]['id']    = $row['id'];
            $policies[$i]['description'] = $row['description'];
            $policies[$i]['comment_by'] = $row['comment_by'];
            $policies[$i]['comment_date'] = $row['comment_date'];
            $policies[$i]['product_id'] = $row['product_id'];
            $policies[$i]['email'] = $row['email'];
            $i++;
        }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}