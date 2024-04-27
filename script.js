let button = document.querySelector('.btn');

async function saveData(event) {
	event.preventDefault();
	let name = event.target.name.value;
	let email = event.target.email.value;

	if (name === '' || email === '') {
		alert('enter all fields')
		// var msg = document.querySelector('.msg');
		// msg.classList.add('error');
		// msg.innerHTML = 'Please enter all fields';
		// setTimeout(() => msg.remove(), 3000);
	}
	let userData = {
		name,
		email
	};
	if (button.id) {
		axios.put('http://localhost:4000/add-user/'+button.id, userData)
			.then((res) => {
				userData.id = button.id;
				console.log(userData.id,'id hai ek');
				showToDisplay(userData)
			})
			.catch((err) => console.log(err));
		button.id = '';
	}
	else {
		try {
			let res = await axios.post('http://localhost:4000/add-user', userData);
			showToDisplay(res.data)

		} catch (err) {
			console.log(err);
		}
	}
	event.target.name.value = '';
	event.target.email.value = '';
}


async function showToDisplay(userData) {
	let { Name, Mail } = userData;

	const userlist = document.querySelector('#users');
	const li = document.createElement('li');
	li.textContent = Name + " - " + Mail;

	const deleteButton = document.createElement('input');
	deleteButton.type = 'button';
	deleteButton.value = 'Delete';
	deleteButton.className = 'btn btn-danger float-end Extra-Style';

	const updateButton = document.createElement('input');
	updateButton.type = 'button';
	updateButton.className = 'btn btn-primary float-end Extra-Style';
	updateButton.value = 'Edit';

	let id = userData.id;
	deleteButton.onclick = async () => {
		try {
			let res = await axios.post('http://localhost:4000/delete-user/', { id })
			console.log(res);
		} catch (err) {
			console.log(err);
		}
		userlist.removeChild(li);
	};

	updateButton.onclick = () => {
		button.id = id;
		userlist.removeChild(li);
		document.querySelector('#name').value = Name;
		document.querySelector('#email').value = Mail;
	};

	li.appendChild(deleteButton);
	li.appendChild(updateButton);
	userlist.appendChild(li);
	// }
}
window.addEventListener("DOMContentLoaded", async () => {
	try {
		let res = await axios.get('http://localhost:4000/add-user');
		// console.log(res.data);
		for (var i = 0; i < res.data.length; i++) {
			showToDisplay(res.data[i]);
		}
	} catch (error) {
		console.log(error);
	}
})

