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
    $sql = "SELECT * FROM subcategory where status_id = 1 and category_id = {$id}";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['title'] = $row['title'];
        $policies[$i]['category_id'] = $row['category_id'];
        $policies[$i]['status_id'] = $row['status_id'];
        $i++;
    }

    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}