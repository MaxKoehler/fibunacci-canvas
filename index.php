<!DOCTYPE html>
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- <meta name="description" content=""> -->
    <!-- <meta name="author" content=""> -->
    <!-- <link rel="icon" href="https://v4-alpha.getbootstrap.com/favicon.ico"> -->
    <title>Canvas</title>
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/canvas.css" rel="stylesheet">
  </head>
  <body>

    <canvas id="c"></canvas>

    <div id="controls">
      <div id="currentTime"></div>
      <!-- application markup -->
      <table class="info">
        <tr>
          <td class="label">w:</td>
          <td class="value w"></td>
        </tr>
        <tr>
          <td class="label">h:</td>
          <td class="value h"></td>
        </tr>
        <tr>
          <td class="label">dp:</td>
          <td class="value dp">         </td></tr>
        <tr>
          <td class="label">dppx:</td>
          <td class="value dppx">       </td></tr>
        <tr>
          <td class="label">ppi:</td>
          <td class="value ppi">        </td></tr>
        <tr>
          <td class="label">di:</td>
          <td class="value di">         </td></tr>
        <tr>
          <td class="label">size:</td>
          <td class="value size">       </td></tr>
        <tr>
          <td class="label">orientation:</td>
          <td class="value orientation"></td></tr>
      </table>
      <div class="device">
      </div>
    </div><!-- /.controls -->

    <!-- <div class="container-fluid fill">
      <div class="row fill">
        <div class="col-md-12 p-l-0 p-r-0 fill">
        </div>
      </div>
    </div> -->

<!-- JavaScript -->
<script src="assets/js/vendor/jquery.js"></script>
<script src="assets/js/plugins/jquery.stage.js"></script>

<!-- <script src="assets/js/vendor/tether.js"></script> -->
<script src="assets/js/vendor/bootstrap.js"></script>
<script src="assets/js/plugins/ie10-viewport-bug-workaround.js"></script>

<!-- <script src="assets/js/vendor/fabric.min.js"></script> -->
<!-- <script src="assets/js/plugins/colz.class.js"></script> -->

<script src="assets/js/canvas.js"></script>

<!-- Load the Paper.js library -->
<!-- <script type="text/javascript" src="assets/js/vendor/paper-full.min.js"></script> -->
<!-- Load external PaperScript and associate it with myCanvas -->
<!-- <script type="text/paperscript" src="assets/js/myScript.js" canvas="c"></script> -->

</body>
</html>