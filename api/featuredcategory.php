<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$policies = [];
$sql = "SELECT * FROM feature_category where status_id=1";
if($result = mysqli_query($con,$sql))
{
$i = 0;
while($row = mysqli_fetch_assoc($result))
{
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['category_id'] = $row['category_id'];
    $policies[$i]['title'] = $row['title'];
    $policies[$i]['status_id'] = $row['status_id'];
    $policies[$i]['image'] = $row['image'];
    $i++;
}
echo json_encode($policies);
}
else
{
http_response_code(404);
}