// ------------------------------------  export -------------------------------------------------------------

jQuery("#export").on('click', function (event) {
       $('#mytab').table2csv({
        file_name:  'export_output.csv',
        header_body_space:  0
       });

    });



// JQuery Plugin
/**
 * @description: Plugin to export HTML table to CSV file.
 * @author: VenkataRamanaB
 * @link: https://github.com/venkataramanab/table2csv
 * Feel free to use or modify this plugin as far as my full name is kept
 */

(function ($) {
    const _trim_text = (text) => {
        return text.trim();
    };
    const _quote_text = (text) => {
        return '"' + text + '"';
    };
    const _export = (lines, file_name) => {
        const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(lines.join('\n'));
        const el_a = document.createElement('a');
        el_a.href = uri;
        el_a.download = file_name;
        document.body.appendChild(el_a);
        el_a.click();
        document.body.removeChild(el_a);
    };



    const init = (tb, options) => {
        let lines = [];
        $(tb).find('thead>tr').each(function () {
            let line = [];
            $(this).find('th').each(function () {
                line.push(_quote_text(_trim_text($(this).text())));
            });
            lines.push(line.splice(0).toString());
        })

        for (let i = 0; i < options.header_body_space; i++) lines.push('\n');

        $(tb).find('tbody>tr').each(function () {
            let line = [];
            $(this).find('td').each(function () {

                if($(this).find('select').length){
                        line.push(_quote_text($(this).find('option:selected').text()));

             }else{
                   // line.push(_quote_text(_trim_text($(this).text())));

                   }

               if ($(this).find('input').length) {
                 line.push(_quote_text($(this).find('input').val()));
               } else {
                 // line.push(_quote_text(_trim_text($(this).text())));
               }

            });
            lines.push(line.splice(0).toString());
        })
        _export(lines, options.file_name)
    };



    $.fn.extend({
        table2csv: function (options) {
            const default_options = {
                file_name: 'table_records.csv',
                header_body_space: 1
            };
            options = $.extend(default_options, options);
            init(this, options);
        }
    })
})(jQuery);



// ------------------------------------  import -------------------------------------------------------------
$("#files").change(function() {
  filename = this.files[0].name
  console.log(filename);
});


window.MyLib = {}; //global var

    var ExcelToJSON = function() {
      this.parseExcel = function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var result = JSON.stringify(XL_row_object);
            objs = JSON.parse(result)
            var output = {};
              for (i in objs) {
                 capitalize(objs[i]);
              }
            // jQuery( '#xlx_json' ).val( json_object ); //project json to textarea
            // var output = capitalize(JSON.parse(obj);
            MyLib.upload_json = objs
          })
        };
        reader.onerror = function(ex) {
          console.log(ex);
        };
        reader.readAsBinaryString(file);
      };
  };


  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
  }

  function capitalize(object) {
  	var isArray = Array.isArray(object);
  	for (let key in object) {
  		let value = object[key];
  		let newKey = key;
  		if (!isArray) { // if it is an object
  			delete object[key]; // firstly remove the key
  			newKey = key.toUpperCase(); // secondly generate new key (capitalized)
  		}
  		let newValue = value;


  		if (typeof value != "object") { // if it is not an object (array or object in fact), stops here
  			if (typeof value == "string") {
  				newValue = value.toUpperCase(); // if it is a string, capitalize it
  			}
  		} else { // if it is an object, recursively capitalize it
  			newValue = capitalize(value);
  		}
      if (newValue == "") {
        delete object[newKey]
      }
      else {
  		object[newKey] = newValue;
      }
  	}
  	return object
  }

  $("#files").change(function(evt) {
    handleFileSelect(evt)
  });

 // document.getElementById('files').addEventListener('change', handleFileSelect, false);
