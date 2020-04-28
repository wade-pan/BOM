// ------------------------------------  switch purpose -------------------------------------------------------------

var select = '';
for (i = 0; i <= 100; i++) {
  select += '<option val=' + i + '>' + i + '</option>';
}
$('#QTY').html(select);

// ------------------------------------  export -------------------------------------------------------------

jQuery("#export").on('click', function (event) {
       $('#mytab').table2csv({
        file_name:  'export_output.csv',
        header_body_space:  0
       });

    });

function switch_purpose() {
  var purpose = document.getElementById("purpose").value
  var cost1 = document.getElementById("cost_th")
  var cost2 = document.querySelectorAll("input[id=cost_text]")
  //x=1 for vendor
  if (purpose == 1) {
    cost1.style.display = "none";
    for (var index = 0; index < 100; index++) {
      cost2[index].style.display = "none"
    }
  }

  if (purpose == 2) {
    cost1.style.display = "block";
    for (var index = 0; index < 100; index++)
      // cost2[index].addProperty("background-color");{
      cost2[index].style.display = "block"
  }
}
//x=2 for approval
function choose_template(){
  var template = document.getElementById("template").value
  if (template == "FATP") {
    // update_form(template)
    alert("FATP BOM not ready!!!")
    }
  if (template == "Panda") {
    template_Panda()
    // alert(template_json)
    update_form(template_json)
    }
}

// ## i 从 json "SUPPLIER" 数量得来
function select_want_BOM() {

  update_form(MyLib.upload_json)

}

function fetch_all_BOM() {
  $.ajax({
    type: 'GET',
    async: false,
    global: false,
    cache: false,
    url: 'data_db.json',
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      full_json = data;
      // Fill_select_line_2(data);
      // update_selected_BOM(full_json)
      return full_json;
    }
  });
}

function template_Panda() {
  $.ajax({
    type: 'GET',
    async: false,
    global: false,
    cache: false,
    url: 'Panda.json',
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(thedata) {
      template_json = thedata;
      return template_json;
    }
  });
}

//
// function update_selected_BOM() {
//   $.ajax({
//     type: 'GET',
//     async: false,
//     global: false,
//     cache: false,
//     // url: 'wanted_BOM.json',
//     url: 'MyLib.upload',
//     data: {
//       get_param: 'value'
//     },
//     dataType: 'json',
//     success: function(data) {
//       selected_json = data;
//       update_select(selected_json);
//
//       return selected_json;
//     }
//   });
// }
// ------------------------------------  small function -------------------------------------------------------------


function Fill_select_line_1(full_json) {
  var data = full_json;
  var selects = document.querySelectorAll("select[class=SUPPLIER]");
  for (var index = 0; index < selects.length; index++) {
    for (var num = 0; num < Object.keys(data).length; num++) {
      var option = document.createElement("option");
      option.text = Object.keys(data)[num];
      option.value = num + 1; // coz select-option is value 0, So here need "num + 1"
      selects[index].appendChild(option)
    }
  }
}

function Fill_select_line_2(selected_key, num) { // the key text & which key ? 0 1 2 应该是第几行， 不是第几个 key in full_json
  var data = full_json;
  var selects_line_2 = document.querySelectorAll("select[class=MODEL]");
  for (var index = 0; index < data[selected_key].length; index++) { //多少个 MODEL
    var option = document.createElement("option");
    option.text = data[selected_key][index]["MODEL"];
    option.value = index + 1;
    selects_line_2[num].appendChild(option)
  }
}


function Fill_select_line_2_man(line_1){
  var data = full_json;
  var parentRow = $(line_1).closest("tr").index();
  selects_line_2 = document.querySelectorAll("select[class=MODEL]");
  selects_line_3 = document.querySelectorAll("select[class=QTY]");
  selected_key =  line_1.options[line_1.value].innerHTML
  // alert(line_1.nextSibling.value)
  selects_line_2[parentRow].options.length = 0
  selects_line_3[parentRow].selectedIndex = 0
  for (var index = 0; index < data[selected_key].length; index++) { //多少个 MODEL
    var option = document.createElement("option");
    option.text = data[selected_key][index]["MODEL"];
    option.value = index + 1;
    selects_line_2[parentRow].appendChild(option)
  }
}

function update_cost(line_3){
  var fdata = full_json;
  var parentRow = $(line_3).closest("tr").index();
  selects_line_1 = document.querySelectorAll("select[class=SUPPLIER]");
  selects_line_2 = document.querySelectorAll("select[class=MODEL]");
  selected_key =  selects_line_1[parentRow].options[selects_line_1[parentRow].value].innerHTML
  model_key = selects_line_2[parentRow].selectedIndex // model_key 从0 开始
  selects_line_5 = document.querySelectorAll("input[class=cost_text]");
  // alert("Qty:")
  // alert(line_3.value)
  // alert("model_number")
  // alert(model_key)
  // alert("fdata[selected_key][model_key]")
  // alert(fdata[selected_key][model_key]["COST"].substring(1).replace(/,/i, ''))
  // selects_line_5[parentRow].value = "0"
  selects_line_5[parentRow].value = "$" + (line_3.value * (fdata[selected_key][model_key-1]["COST"].substring(1).replace(/,/i, ''))).toFixed(2) // model_key 从0 开始
}

function update_form(input_data) {
  fetch_all_BOM();
  var data = input_data;
  // alert(data.length)
  // alert(data)
  create_row(data.length)
  var fdata = full_json;
  // ## 每一个 cell 的内容 也可以是为空
  var selects_line_1 = document.querySelectorAll("select[class=SUPPLIER]");
  var selects_line_2 = document.querySelectorAll("select[class=MODEL]");
  var selects_line_3 = document.querySelectorAll("select[class=QTY]");
  var selects_line_4 = document.querySelectorAll("input[class=DESCRIPTION]");
  var selects_line_5 = document.querySelectorAll("input[class=cost_text]");
  Fill_select_line_1(fdata);
  // dance:
  for (var value = 0; value < data.length; value++) {
    for (var ind = 0; ind < 100; ind++) { // 这行里 column 的选项 过一遍 ，最多100个 SUPPLIER 选项
      // try{
      //code that causes an error
      if (typeof(selects_line_1[value].options[ind + 1]) != 'undefined') {
        if (ciEquals(data[value]["SUPPLIER"], selects_line_1[value].options[ind + 1].innerHTML)) {
          // if (data[value]["SUPPLIER"] == selects_line_1[value].options[ind + 1].innerHTML) {  // "arista" == "arista"
          selects_line_1[value].selectedIndex = ind + 1; // this will fill 1st line 1st tab SUPPLIER
          Fill_select_line_2(selects_line_1[value].options[ind + 1].innerHTML, value)
          key = selects_line_1[value].options[ind + 1].innerHTML
          for (var index = 0; index < 100; index++)
            if (typeof(selects_line_2[value].options[index + 1]) != 'undefined') {
              if (ciEquals(data[value]["MODEL"], selects_line_2[value].options[index + 1].innerHTML)) {
                selects_line_2[value].selectedIndex = index + 1;
                selects_line_3[value].selectedIndex = data[value]["QTY"]; // 右边是data ，说明数据从 import 来
                selects_line_4[value].value = fdata[key][index]["DESCRIPTION"];
                // selects_line_5[value].value = fdata[key][index]["COST"];
                // alert(selects_line_3[value].selectedIndex)
                if (selects_line_3[value].selectedIndex != 0){
                selects_line_5[value].value = "$" + (selects_line_3[value].selectedIndex * fdata[key][index]["COST"].substring(1).replace(/,/i, '')).toFixed(2);
                } else {
                selects_line_5[value].value = "$0"
                }
                break;
              }
            }
          break;
        }
      }
    }
  }
}



function ciEquals(a, b) {
  return typeof a === 'string' && typeof b === 'string' ?
    a.localeCompare(b, undefined, {
      sensitivity: 'accent'
    }) === 0 :
    a === b;
}

function create_row(num){
for (var i = 0; i < num; i++) {
  var html = $('#mytab tr:last').html();
  $('#mytab tr:last').after("<tr>" + html + "</tr>");
}
}


// ------------------------------------  Add 100 QTY -------------------------------------------------------------

// function get_total_value(data) {
//   var total = 0;
//   for (var i = 0; i < Object.keys(data).length; i++) {
//     // total +=
//     total += data[Object.keys(data)[i]].length
//   }
//   return total
// }

// function removeOptions(selectElement) {
//   var i, L = selectElement.options.length - 1;
//   for (i = L; i >= 0; i--) {
//     selectElement.remove(i);
//   }
// }
