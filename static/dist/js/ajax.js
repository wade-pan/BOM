// <!-- ------------------------------------ AJAX ------------------------------------------------------------- -->
// <!-- ### data is sending, datatype is return format. -->
// <!-- ### flask jsonify 对应 datatype json -->
// <!-- ### 如果收到 return success (且只收第一个), 则执行 function,  -->
// <!-- ### result.succes 就是 200  -->


// ################## 测试后需要改成 action = 1

var action = 1;
function ajaxForm(){
    if (action == 1){
      // ### 后台检测 status有没有error, 如果返回 success, 表示所有都是 stage = verify 而不是 status = verify_error 那么表示都已完成 Verify
      // ### 返回 Verfiy 到web 并触发 flow ###
      // #############################   待完成  #############################
        $.ajax({
            url:"/show_entries_option/stage_verify",
            type:"post",
            dataType: false,
            async: false,
          success:function(response){
            // var next_stage = document.querySelectorAll("input[id=stage_2]");
            change_flag(response,"stage_2","");
            // change_bar(response,'none');
            func_verify_form();
            },
          error:function(e){
            alert("Failed to verify stage !!!!");}
            })}
    else if (action == 2){
        $.ajax({
            url:"/show_entries_option/stage_deploy",
            type:"post",
            dataType: false,
            async: true,
          success:function(response){
            change_flag(response,"stage_3","")
            change_bar(response,'block')
            func_deploy_form()
            },
          error:function(e){
            alert("Failed to deploy stage !!!!");}
            })}}







function flag_change(){
var selects = document.querySelectorAll("select[id=select_host]");
var container = document.querySelectorAll("[id=cube]")
for (var index = 0; index < selects.length ; index++){
  if( selects[index].value == "" ){
    container[index].style.display = "none";
  }}
}

function change_flag(response,to_stage,from_stage){
   if ( response == "" ){
     var next_stage = document.querySelectorAll("input[id="+to_stage+"]");
     var container = document.querySelectorAll("[id=cube]")
     var selects = document.querySelectorAll("select[id=select_host]");
     for (var index = 0; index < selects.length ; index++){
       if( selects[index].value != "" ){
       // next_stage[index].value = stage_name
       // container[index].classList.remove("show-"+from_stage)
        container[index].classList.toggle("show-"+to_stage);

      }}}
   else {
    var response = JSON.parse(response);
    var len = Object.keys(response).length;
    var next_stage = document.querySelectorAll("input[id="+to_stage+"]");
    var container = document.querySelectorAll("[id=cube]")
    var selects = document.querySelectorAll("select[id=select_host]");
    if (len == 1) {
      for (var index = 0; index < selects.length ; index++)
      if (selects[index].value == response[0].hostname)
      {
        // next_stage[index].value = stage_name
        container[index].classList.toggle("show-"+to_stage);

        // container[index].classList.toggle('is-flipped');
    }}
    else if (len > 1){
    for( var ind = 0; ind < len; ind++){
      for (var index = 0; index < selects.length ; index++)
        {
        if (selects[index].value == response[ind].hostname){
        // next_stage[index].value = stage_name
        container[index].classList.toggle("show-"+to_stage);}
      }}}}}
