<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="registerStudent" method="POST" enctype="multipart/form-data">
        <label for="">student name</label>
        <input type="text" name="fname">
        <label for="">student lastname</label>
        <input type="text" name="lname">
        <label for="">image</label>
        <input type="file" name="image">
        <button type="submit">submit</button>
    </form>
</body>
</html>