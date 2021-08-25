/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'd5b137fecf844da9a39d78158e1f4806';
const generateButton = document.querySelector('#generate');
const zipCode = document.querySelector('#zip');
const feeling = document.querySelector('#feelings');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getDataFromAPI = async (url) => {
		const response = await fetch(url)

		try{
			const data = await response.json();
			console.log(data);
			return data;
		}
		catch(error){
			console.log(Error(error));
		}
	}

const postDataToApp = async(url,data) =>{
	const response = await fetch(url,{
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	})
	try{
		const data = await response.json();
		return data;
	}
	catch(error){
		console.log(Error(error));
	}
}

const updateUI = async(url) => {
	const response = await fetch(url)
	try{
		const data = await response.json();
		console.log(data);
		date.innerText = data[data.length - 1]["date"];
		temp.innerText = data[data.length - 1]["temp"];
		content.innerText = data[data.length - 1]["user-response"];
	}
	catch(error){
		console.log(Error(error));
	}
}

function startAction(){
	const zip = zipCode.value;
	const userResponse = feeling.value;
	getDataFromAPI(baseURL+zip+'&appid='+apiKey)
 .then((response) => {postDataToApp('/postData',{"date" : newDate, "temp" : response.main.temp, "user-response" : userResponse})})
 .then(() => (updateUI('/getData')))
}
	

	generateButton.addEventListener('click', startAction)