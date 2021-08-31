/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '';
const generateButton = document.querySelector('#generate');
const zipCode = document.querySelector('#zip');
const feeling = document.querySelector('#feelings');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate() +'.'+ d.getFullYear();

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
		date.innerText = "date: " + data["date"];
		temp.innerText = "temp: "+data["temp"];
		content.innerText = "Your feeling: "+data["user-response"];
	}
	catch(error){
		console.log(Error(error));
	}
}

function startAction(){
	const zip = zipCode.value;
	const zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
	const userResponse = feeling.value;
	const userResponsePattern = /[^0-9]/;
	if (zipCodePattern.test(zip) && userResponsePattern.test(userResponse)){
		getDataFromAPI(baseURL+zip+'&units=metric'+'&appid='+apiKey)
		.then((response) => {postDataToApp('/postData',{"date" : newDate, "temp" : response.main.temp, "user-response" : userResponse})})
		.then(() => (updateUI('/getData')))
	} else{
		alert('Something went wrong! Please make sure that the zip code and your response are correct and try again.')
	}
}
	

	generateButton.addEventListener('click', startAction)