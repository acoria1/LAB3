
/**
 * Updates DOM table. Calls createDynamicTable
 * @param {*} tableContainer DOM element containing the table
 * @param {Array} vec array of values to create the table
 * @returns 
 */
function updateTable(tableContainer, vec) {
    const container = document.querySelector(tableContainer);

    while (container.children.length > 0) {
        container.removeChild(container.firstElementChild);
    }

    const $table = createDynamicTable(vec);

    container.appendChild($table);

    return $table;
}


/**
 * 
 * @param {*} tableContainer 
 * @param {*} vec 
 * @returns 
 */
function createTable (tableContainer, vec){
    const container = document.querySelector(tableContainer);
    const $table = createDynamicTable(vec);
    container.appendChild($table);
    return $table;
}

/**
 * Creates DOM table
 * @param {array} data array of values to convert to html table
 * @returns Element Node of type table
 */
function createDynamicTable (data){
    if (data !== null && data.length > 0){
        const $table = document.createElement("table");
        $table.classList.add("table");
        //crear cabecera
        $table.appendChild(createHeader(data[0]));

        //crear cada linea
        $table.appendChild(createBody(data));
        //
        return $table;
    }  else {
        return document.createElement("table");
    }
}

/**
 * Creates header row based on object keys. Does NOT create a column for an "id" attribute.
 * @param {Object} object any object necessary to create header rows
 * @returns 
 */
function createHeader(object){
    const $thead = document.createElement("thead"),
    $tFirstRow = document.createElement("tr");
    //
    $tFirstRow.setAttribute("class","cabecera");
    $tFirstRow.classList.add("pointer");
    //
        
    Object.keys(object).forEach(keyName => {
        if(keyName != "id"){
            const $th = document.createElement("th");
            //
            const content = document.createTextNode(keyName);
            $th .appendChild(content);
            //
            $tFirstRow.appendChild($th);
        }       
    });
    //
    $thead.appendChild($tFirstRow);
    //
    return $thead;
}

/**
 * Creates Table body
 * @param {Array} objects objects to map to table
 * @returns 
 */
function createBody(objects){
    const $tbody = document.createElement("tbody");
    //

    objects.forEach((element,index)=> {
        const $tr = document.createElement("tr");
        $tr.classList.add("pointer");
        //
        for (const key in element) {
            if (key != "id"){
                const $td = document.createElement("td");
                //
                const content = document.createTextNode(element[key]);
                $td.appendChild(content);
                //
                $tr.appendChild($td);
            }else {
                // set id as id of the row
                $tr.setAttribute("data-id",element[key]);
            }          
        }
        //
        $tbody.appendChild($tr);
        //
    });
    //
    return $tbody;
}

/**
 * Striples table adding class1 to even elements and class2 to odd elements.
 * @param {*} table 
 * @param {String} class1 
 * @param {String} class2 
 */
function stripeTable(table, class1, class2){
    if(typeof class1 === "string" && typeof class2 === "string"){
        const $rows = table.querySelectorAll("tr");
        for (let index = 1; index < $rows.length; index++) {
            const element = $rows[index];      
            element.classList.add(index % 2? class1 : class2);
    }    
    }
}


export {stripeTable, createTable, updateTable};