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
    $sql = "SELECT * FROM sale WHERE id = $id";
    if($result = mysqli_query($con,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $policies[$i]['id']    = $row['id'];
            $policies[$i]['discount'] = $row['discount'];
            $policies[$i]['title'] = $row['title'];
            $policies[$i]['start_date'] = $row['start_date'];
            $policies[$i]['end_date'] = $row['end_date'];
            $i++;
        }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}