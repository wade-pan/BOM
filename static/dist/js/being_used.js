/*!
 * ALL JS
 */
 // <!-- ------------------------------------ read logfile ------------------------------------------------------------- -->

 function readTextFile()
 {
   file = "./static/log/Web_logfile.txt"
     var rawFile = new XMLHttpRequest();
     rawFile.open("GET", file, false);
     rawFile.onreadystatechange = function ()
     {
         if(rawFile.readyState === 4)
         {
             if(rawFile.status === 200 || rawFile.status == 0)
             {
                 var allText = rawFile.responseText;
                 alert(allText);
             }}}
     rawFile.send(null);
 }




 //
 // <!-- <script type="text/javascript">
 // $('input[name=serial_number]').bind('keyup change', function() {
 //     document.getElementById("myform").submit();
 //     })
 // </script> -->
 //
 // <!-- <script type="text/javascript">
 // $('input[name=netmask]').bind('keyup change', function() {
 //   {
 //     var Net = document.querySelectorAll("input[name=netmask]");
 //   for (var index = 0; index < Net.length -1; index++) {
 //       if (Net[index].value != "")
 //
 //         Net[index+1].value = Net[index].value;
 //   }
 // }x
 //     document.getElementById("myform").submit();
 //     })
 // </script> -->
 //





 //
 // <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
 // <!-- <script type="text/javascript">
 // var action = 1;
 //
 // document.getElementById("submit_button").on("click", viewSomething);
 // function viewSomething() {
 //   if ( action == 1 ) {
 //       document.getElementById("myform2").submit();
 //
 //       $("body").css("background", "honeydew");
 //       action = 2;
 //   } else {
 //     // #如果 aciton==2 同时 all return == pass,那么 action=3
 //     document.getElementById("myform2").submit();
 //       $("body").css("background", "beige");
 //       action = 1;
 //   }
 //   // # else if action ==3 , begin deploy
 // }
 // </script>


 //
 // <script>
 // function move() {
 //   var elem = document.getElementById("stage");
 //   var width = 1;
 //   var id = setInterval(frame, 100);
 //   function frame() {
 //     if (width >= 100) {
 //       clearInterval(id);
 //     } else {
 //
 //       width++;
 //       elem.style.width = width + '%';
 //     }
 //   }
 // }
 // </script>
