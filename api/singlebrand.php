<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $brandId = mysqli_real_escape_string($con, trim($request->id));
    $policies = [];
    $sql = "SELECT * FROM brand where id = {$brandId}";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['title'] = $row['title'];
    }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}