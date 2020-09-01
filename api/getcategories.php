<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$policies = [];
$sql = "SELECT * FROM category where status_id = 1 ";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['title'] = $row['title'];
    $policies[$i]['description'] = $row['description'];
    $i++;
  }

  echo json_encode($policies);
}
else
{
  http_response_code(404);
}