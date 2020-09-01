<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$policies = [];
$sql = "SELECT id FROM order_table ORDER BY id DESC LIMIT 1";
if($result = mysqli_query($con,$sql))
{
$i = 0;
while($row = mysqli_fetch_assoc($result))
{
    $policies[$i]['id']    = $row['id'];
}
echo json_encode($policies);
}
else
{
http_response_code(404);
}