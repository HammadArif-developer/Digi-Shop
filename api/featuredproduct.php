<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$policies = [];
$sql = "SELECT * FROM featured_product where status_id = 1";
if($result = mysqli_query($con,$sql))
{
$i = 0;
while($row = mysqli_fetch_assoc($result))
{
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['product_id'] = $row['product_id'];
    $policies[$i]['image'] = $row['image'];
    $policies[$i]['status_id'] = $row['status_id'];
    $i++;
}
echo json_encode($policies);
}
else
{
http_response_code(404);
}