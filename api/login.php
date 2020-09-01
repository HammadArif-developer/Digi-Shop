<?php
/**
 * Returns the list of policies.
 */
// require 'database.php';
// $postdata = file_get_contents("php://input");
// if(isset($postdata) && !empty($postdata))
// {
//     $policies = [];
//     $request = json_decode($postdata);
//     $Username = mysqli_real_escape_string($con, trim($request->username));
//     $sql = "SELECT * FROM users where username = {$Username}";
//     if($result = mysqli_query($con,$sql))
//     {
//         $i = 0;
//         while($row = mysqli_fetch_assoc($result))
//         {
//             $policies[$i]['id']    = $row['id'];
//             $policies[$i]['username'] = $row['username'];
//             $policies[$i]['password'] = $row['password'];
//             $policies[$i]['privileges'] = $row['privileges'];
//             $i++;
//         }
//         echo json_encode($policies);
//     }
//     else
//     {
//     http_response_code(404);
//     }
// }
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $Username = mysqli_real_escape_string($con, trim($request->username));
    $policies = [];
    $sql = "SELECT * FROM users where username = '$Username'";

    if($result = mysqli_query($con,$sql))
    {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $policies[$i]['id']    = $row['id'];
        $policies[$i]['username'] = $row['username'];
        $policies[$i]['password'] = $row['password'];
        $policies[$i]['privileges'] = $row['privileges'];
        $i++;
    }
    echo json_encode($policies);
    }
    else
    {
    http_response_code(404);
    }
}