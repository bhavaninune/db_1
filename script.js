function loadTables(){
    window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000")
    .then((response)=>{
      if(response.data[0].length > 0){
          for(var i = 0; i<response.data[0].length;i++){
              appendTableLi(response.data[0][i].TABLE_NAME)
          }
      }
    }).catch((error)=>console.log(error))
  })
  }
  
  loadTables();
  
  
      var createTable = document.getElementById("createTable");
      var tableUl = document.getElementById("tableUl");
      var secondHalf = document.getElementById("secondHalf");
      createTable.addEventListener('click', createTablefn);
  
      document.getElementById("submitForm").addEventListener('click', submitFormfn);
  
      function createTablefn(){
          var addField = document.getElementById("addField");
          addField.addEventListener('click', addFieldfn);
      }
      function addFieldfn(){
          var childtoAppend = document.createRange().createContextualFragment('<div class="row mb-4"><div class="col"><div class="form-outline"><input type="text" id="fieldName" class="form-control fieldName" name="fieldName[]"/><label class="form-label" for="fieldName">Field Name</label></div></div><div class="col"><div class="form-outline"><select id="fieldType" class="form-control fieldType" name="fieldType[]"><option value=""></option><option value="STRING">STRING</option><option value="INTEGER">INTEGER</option><option value="BOOLEAN">BOOLEAN</option><option value="DOUBLE">DOUBLE</option></select><label class="form-label" for="fieldType">Field Type</label></div></div></div>');       
          document.getElementById("formContainer").appendChild(childtoAppend);   
      }
      function submitFormfn(e){
          e.preventDefault();
          var tableName = document.getElementsByClassName("tableName");
          var fieldNames = document.getElementsByClassName("fieldName");
          var fieldTypes = document.getElementsByClassName("fieldType");
          var dataObject = {};
          
          let data = {};
          for(let i = 0; i<fieldNames.length && i<fieldTypes.length; i++){
              
              data[fieldNames[i].value] = fieldTypes[i].value; 
              dataObject[tableName[0].value] = data;
          }
          addTable(dataObject)
          
  
  
      }
  
      function addTable(data){
         
          axios.post("http://localhost:3000/addTable",{data
        })
        .then(res =>{
          
          if(res.data[0]["warningStatus"]!=1){
            alert("Table created successfully!!");
              appendTableLi(Object.keys(data)[0])
              document.getElementById("tableModalClose").click();
              
          }else{
              alert("Something went worng!!");
          }
   
        })
        .catch(error=>console.error(error))
  
      }
  
      function appendTableLi(table){
  
        let li = document.createElement("li");
        li.className = 'list-group-item tableLi';
        li.appendChild(document.createTextNode(table));
        tableUl.appendChild(li);
  
        var tableLis = document.querySelectorAll(".tableLi");
        tableLis.forEach(tableLi=>{
          
          tableLi.addEventListener('click',showTableData);
        })  
        
  
  
      }
  
      function showTableData(e){
       
          getTableData(e.target.textContent)
      }
  
  
      function getTableData(tableName){
        axios.get("http://localhost:3000/getTableData/"+tableName)
        .then(response=>{
              showTableAtBlock(response.data[0],tableName);
        })
        .catch(err=>{
          console.log(err);
        })
      }
  
  
      function showTableAtBlock(datas,tableName){
        console.log('Table loaded')
  
        var toappendForm = `<button type="button" class="btn btn-outline-primary addData" data-toggle="modal" data-target="#tableformModal">Add Data</button>
            <div class="modal fade" id="tableformModal" tabindex="-1" role="dialog" aria-labelledby="tableformModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="tableformModalLabel">Enter Data</h5>
                  <button type="button" class="close" id="enterDataModalClose"  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" id="tableDataForm">
                <form id="tableentryForm">
  
                  
                </form>
            </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="savetableButton" data-table="${tableName}">Save Data</button>
                </div>
              </div>
            </div>
          </div>`;
  
  
        if(datas.length != 0 ){
          console.log('with some data');
            var toappendTable = <table class="table" id="superTable"><thead><tr>
            var toappendTh = ``;
            const keys = [...Object.keys(datas[0])]; 
            for(const key of keys){
              toappendTable += <th scope="col">${key}</th>;
            }
            toappendTable += <th scope="col">Action</th></tr></thead><tbody>;
            for(let i = 0; i<datas.length; i++){
              toappendTable += <tr>;
              const newkeys = [...Object.keys(datas[0])]; 
              for(const newkey of newkeys){
                  toappendTable += <td>${datas[i][newkey]}</th>;
                    
              }
              toappendTable += <td><button type="button" class="btn btn-outline-danger deleteButton" data-table="${tableName}" data-rowId="${datas[i]['id']}">Delete</button></th></tr>;
            }
  
            toappendTable += </tbody></table>;
            toappendTable = toappendForm+toappendTable;
  
            secondHalf.innerHTML = "";
            secondHalf.appendChild(document.createRange().createContextualFragment(toappendTable))
  
            var deleteButtons = document.querySelectorAll(".deleteButton");
            deleteButtons.forEach(deleteButton => {
              deleteButton.addEventListener('click',deleteRow);
            })
        }else{
         
            secondHalf.innerHTML = "";
            secondHalf.appendChild(document.createRange().createContextualFragment(toappendForm))
        }
  
        getDataTypes(tableName).then(res=>{
  
          
              for(let i = 1; i< res[0].length;i++){
  
                console.log(res[0][i].DATA_TYPE);
  
  
                if(res[0][i].DATA_TYPE == "int" || res[0][i].DATA_TYPE == "double" || res[0][i].DATA_TYPE == 'tinyint'){
                  console.log(document.getElementById("tableentryForm"))
                  document.getElementById("tableentryForm").appendChild(document.createRange().createContextualFragment(<input class="form-control tableData" type="tel" name="${res[0][i].COLUMN_NAME}" placeholder="Enter ${res[0][i].COLUMN_NAME}">));
                }else if(res[0][i].DATA_TYPE == "text" || res[0][i].DATA_TYPE == "varchar"){
                  document.getElementById("tableentryForm").appendChild(document.createRange().createContextualFragment(<input class="form-control tableData" type="text" name="${res[0][i].COLUMN_NAME}" placeholder="Enter ${res[0][i].COLUMN_NAME}">));
                }   
              }
            }).catch(err => console.log(err));
  
         document.getElementById("savetableButton").addEventListener('click',saveTableData);   
      }
  
      function saveTableData(e){
        e.preventDefault();
  
        var tableName = e.target.getAttribute("data-table")
          var fields = document.getElementsByClassName("tableData");
          // var fieldTypes = document.getElementsByClassName("fieldType");
          var dataObject = {};
          
          let data = {};
          for(let i = 0; i<fields.length; i++){
              
              data[fields[i].name] = fields[i].value; 
              dataObject[tableName] = data;
          }
          addTableData(dataObject)
  
  
      }
  
      function addTableData(data){
        console.log(data);
  
        axios.post("http://localhost:3000/addTableData",{data
        })
        .then(res =>{
  
              alert("Data inserted successfully!!");
              document.getElementById("enterDataModalClose").click();
              const table = Object.keys(JSON.parse(res.config.data).data)[0];
              const data = JSON.parse(res.config.data).data[Object.keys(JSON.parse(res.config.data).data)[0]];
              getTableData(table);
  
           
            
   
        })
        .catch(error=>console.error(error))
      }
  
      function getDataTypes(tableName){
        const promise = axios.get("http://localhost:3000/getDataTypes/"+tableName)
        const dataPromise = promise.then((response) => response.data)
        return dataPromise;
      }
  
  
      function deleteRow(e){
          let dataRowId = e.target.getAttribute('data-rowId');
          let tableName = e.target.getAttribute('data-table');
          let data = {};
          data[tableName] = dataRowId;
  
          if(confirm("Are you sure?")){
              axios.post("http://localhost:3000/deleteTableRow",{data})
              .then(res=>{
                  
                  alert('Row deleted successfully!!');
                  checkIfLastDataInTable(tableName,e);
                  
                  })
              .catch(error=>console.error(error))
          }
      }
  function checkIfLastDataInTable(tableName,e){
  
    axios.get("http://localhost:3000/getTableData/"+tableName)
        .then(response=>{
              if(response.data[0].length != 0){
                e.target.parentElement.parentElement.remove();
              }else{
                document.getElementById("superTable").remove();
              }
        })
        .catch(err=>{
          console.log(err);
        })
    
  }
  
  
  