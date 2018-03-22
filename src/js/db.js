import firebase from '@firebase/app';
import '@firebase/database';
import generateID from './generate-id';
import checkStorage from './check-storage';

let firebaseApp = null;
let firebaseDB = null;
const firebaseID = null;
let userData = null;

const hasStorage = checkStorage('localStorage');

function getUserData() {
	if (hasStorage) {
		let id = window.localStorage.getItem('pudding_birthday_id');
		if (!id) {
			id = generateID();
			window.localStorage.setItem('pudding_birthday_id', id);
		}

		let day = window.localStorage.getItem('pudding_birthday_day');
		day = day ? +day : null;

		let guess = window.localStorage.getItem('pudding_birthguess_guess');
		guess = guess ? +guess : null;

		return { id, day, guess };
	}

	const newID = generateID();
	window.localStorage.setItem('pudding_birthday_id', newID);
	return { day: null, guess: null, id: newID };
}

function setup() {
	// Initialize Firebase
	const config = {
		apiKey: 'AIzaSyB3yAZTBNwiZjBIXRFCR4Kb_VZcTiXluiE',
		authDomain: 'birthday-5498b.firebaseapp.com',
		databaseURL: 'https://birthday-5498b.firebaseio.com',
		projectId: 'birthday-5498b'
	};
	firebaseApp = firebase.initializeApp(config);
	firebaseDB = firebaseApp.database();
	userData = getUserData();
	console.log(userData);
}

function update({ key, value }) {
	userData[key] = value;
	if (hasStorage) window.localStorage.setItem(key, value);
	console.log(userData);
	// firebaseDB
	// 	.ref(firebaseID)
	// 	.set(data)
	// 	.then(() => {
	// 		console.log('added');
	// 		firebaseApp.delete().then(() => console.log('deleted'));
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
}

// function filler() {
// 	d3.loadData('assets/filler.csv', (err, resp) => {
// 		const data = resp[0].map(d => ({ day: +d.day }));
// 		const output = {};
// 		let i = 0;
// 		const f = () => {
// 			const id = generateID();
// 			output[id] = data[i];
// 			i++;
// 			console.log(i);
// 			if (i < data.length) setTimeout(f, 5);
// 			else window.output = JSON.stringify(output);
// 		};
// 		f();
// 	});
// }

export default { setup, update };
