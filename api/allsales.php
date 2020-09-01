<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$policies = [];
$sql = "SELECT * FROM sale";
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