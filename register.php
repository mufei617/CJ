<?php
  header("Content-type: text/html; charset=utf-8");
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    if ($username == ''){
      echo '<script>alert("enter username!");history.go(-1);</script>';
      exit(0);
    }
    if ($password == ''){
      echo '<script>alert("plz enter password");history.go(-1);</script>';
      exit(0);
    }
    if ($password != $repassword){
      echo '<script>alert("conf password doesnt match!");history.go(-1);</script>';
      exit(0);
    }
    if($password == $repassword){
      $conn = new mysqli('localhost','root','','mariodb');
      if ($conn->connect_error){
        echo 'db faild connect';
        exit(0);
      }else {
        $sql = "select username from players where username = '$_POST[username]'";
        $result = $conn->query($sql);
        $number = mysqli_num_rows($result);
        if ($number) {
          echo '<script>alert("user has exit!");history.go(-1);</script>';
        } else {
          $sql_insert = "insert into players (username,password) values('$_POST[username]','$_POST[password]')";
          $res_insert = $conn->query($sql_insert);
          if ($res_insert) {
            echo '<script>window.location="index.html";</script>';
          } else {
            echo "<script>alert('ERROR ！');</script>";
          }
        }
      }
    }else{
      echo "<script>alert('submit not success'); history.go(-1);</script>";
    }
?>