<?php
  header("Content-type: text/html; charset=utf-8");
  $username = $_POST['username'];
  $password = $_POST['password'];
  $conn = new mysqli('localhost','root','','mariodb');
  if ($conn->connect_error){
    echo 'fail connect DB!';
    exit(0);
  }else{
    if ($username == ''){
      echo '<script>alert("enter UserName:");history.go(-1);</script>';
      exit(0);
    }
    if ($password == ''){
      echo '<script>alert("Enter Password:");history.go(-1);</script>';
      exit(0);
    }
    $sql = "select username,password from players where username = '$_POST[username]' and password = '$_POST[password]'";
    $result = $conn->query($sql);
    $number = mysqli_num_rows($result);
    if ($number) {
      echo '<script>window.location="index.html";</script>';
    } else {
      echo '<script>alert("user name and password Wrong");history.go(-1);</script>';
    }
  }
?>