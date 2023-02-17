console.log('This is my Project 6 on Postman_Clone');

// Utility function:
// 1. Utility function to get DOM element from string
function getElementFormString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initilizing the Parameter
let addedParamsCount = 0;


let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params radio,hide the json box
let paramRadio = document.getElementById('paramRadio');
paramRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on jsonRadio box,hide the parameter box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on + button add more parameter
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label ">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="parameterKey${addedParamsCount + 2}"
                            placeholder="Enter Parameter ${addedParamsCount + 2} key"
                        />
                        </div>
                        <div class="col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="parameterValue${addedParamsCount + 2}"
                            placeholder="Enter Parameter ${addedParamsCount + 2} value"
                        />
                        </div>
                        <button  class="btn btn-primary deleteParam">-</button>
                    </div>`
    // Convert the element string to Dom node;
    let paramElement = getElementFormString(string);
    // console.log(paramElement);
    params.append(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;
});

// if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait..Fetching response";
    document.getElementById('responsePrism').innerHTML = "Please wait..Fetching response";
    
    // Fetching all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    //  If user has used params option instead of json,collect all the parameter in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;


            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    //   Log all the values in the console for debugging 
    console.log('Url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data);

    //    if the request type is get,invoke fetch api to create a get request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else{
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text; 
                Prism.highlightAll();
            })

    }

})