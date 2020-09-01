<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$policies = [];
$sql = "SELECT * FROM vendor";
if($result = mysqli_query($con,$sql))
{
$i = 0;
while($row = mysqli_fetch_assoc($result))
{
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['vendor_name'] = $row['vendor_name'];
    $policies[$i]['vendor_number'] = $row['vendor_number'];
    $policies[$i]['contact_person'] = $row['contact_person'];
    $policies[$i]['contact_person_number'] = $row['contact_person_number'];
    $policies[$i]['address'] = $row['address'];
    $policies[$i]['status_id'] = $row['status_id'];
    $i++;
}
echo json_encode($policies);
}
else
{
http_response_code(404);
}