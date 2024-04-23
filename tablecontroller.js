const db = require('../util/database');

exports.getTables = async (req,res,next) => {
    try{
    const data = await db.execute(select table_name from information_schema.tables where TABLE_SCHEMA='node-complete';);
    res.status(201).json(data);
    }catch(err){
        res.status(500).json({err: err});
    }

}

exports.getTableData = async (req,res,next) => {
    try{
        const data = await db.execute(select * from ${req.params.tableName};);
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({err: err});
    }
}

exports.deleteTableRow = async (req,res,next) => {
    try{
         const data = await db.execute(delete from ${Object.keys(req.body.data)[0]} where id = ${req.body.data[Object.keys(req.body.data)[0]]};);
         res.status(201).json(data);
     }catch(err){
         res.status(500).json({err: err});
     }
}

exports.getDataTypes = async (req,res,next) => {
    console.log(req.params.tableName)
    try{
         const data = await db.execute(SELECT column_name, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'node-complete' AND TABLE_NAME = '${req.params.tableName}');
         console.log(data)
         res.status(201).json(data);
     }catch(err){
         res.status(500).json({err: err});
     }
}

exports.addTable = async (req,res,next) => {
    try{
        const tableName = Object.keys(req.body.data)[0];
        let fieldCount = Object.keys(req.body.data[tableName]).length
        let fieldValues = "";
        let assumedValues = "";
        for(let i = 0; i<fieldCount; i++){
            const fieldName = Object.keys(req.body.data[tableName])[i];
            const fieldValue = getDataType(req.body.data[tableName][fieldName]);
           
            if(i == fieldCount-1){
                fieldValues += ${fieldName} ${fieldValue};
                
            }else{
                fieldValues += ${fieldName} ${fieldValue},;
                
            }
        }
        fieldValues = 'id int NOT NULL AUTO_INCREMENT PRIMARY KEY,'+fieldValues;
        assumedValues = ?,+assumedValues;
        const data = await db.execute(CREATE TABLE IF NOT EXISTS ${tableName} (${fieldValues}));
        res.status(201).json(data);
    }
    catch(err){
        res.status(500).json({err: err});
    }
}

exports.addTableData = async (req,res,next) => {
    console.log(req.body.data);
    try{
    const tableName = Object.keys(req.body.data)[0];
     let fieldCount = Object.keys(req.body.data[tableName]).length
     let fieldValues = "";
     let assumedValues = "";
     let fieldNames = "";
    for(let i = 0; i<fieldCount; i++){
        const fieldName = Object.keys(req.body.data[tableName])[i];
        const fieldValue = req.body.data[tableName][fieldName];
        const assumedValue = ?;
        if(i == fieldCount-1){
              fieldNames += ${fieldName};
              fieldValues += '${fieldValue}';
              assumedValues += ${assumedValue};
             } else
             {
             fieldNames += ${fieldName},;
              fieldValues += '${fieldValue}',;
              assumedValues += ${assumedValue},;
             }
}
        const query = INSERT INTO ${tableName} (${fieldNames}) VALUES (${fieldValues});
     console.log(query)
     const data = await db.execute(query);
    // const data = await db.execute('INSERT INTO student (Name,Roll) VALUES (?,?)', ['Aditya','30']);
    console.log(data);
    res.status(201).json(data);
 

 }catch(err){
     res.status(500).json({err: err});
 }
}




function getDataType(value){

    if(value == 'STRING' || value == 'text'){
        return 'varchar(255)';
    }else if(value == 'INTEGER'){
        return 'int';
    }else if(value == 'DOUBLE'){
        return 'double';
    }else if(value == 'BOOLEAN'){
        return 'BOOLEAN';
    }
    
}