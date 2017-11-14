const req = require('request');
//Create constant variables, These are in case there is a change to /server-side/api/routes/serverRoutes.js
//types of requests
const get = 'GET';
const put = 'PUT';
const post = 'POST';
const del = 'DELETE';
//Variables in the user template
const GID = 'GroupID';
const UID = 'UserID';
const PASS = 'Password';
const DID = 'DebtID';
const GroceryID = 'GroceryID';
const CID = 'ChoreID';
//Attributes for additionial arguments
//General
const PrimaryID = 'PRIMARY';	//All
const amount = 'amount';		//Group Debts and Personal Debts
const lender = 'lender_id';		//Group Debts and Personal Debts
const borrower = 'borrower_id';	//Group Debts and Personal Debts
//User Accounts
const user_ID = 'user_id';
const first = 'first_name';
const last = 'last_name';
const email = 'email';
const password = 'password';
const phoneNumber = 'phone_number';
const facebook = 'facebook_profile';
const twitter = 'twitter_handle';
const instagram = 'instagram';
//Groups
const groupName = 'group_name';
const groupRules = 'ground_rules';
const groupID = 'group_id';
//GroupDebt
const debtType = 'debt_type';
//Groceries
const groceryAmountDue = 'amount_due';
const groceryIsPaid = 'paid_status';
//Chores
const choreName = 'chore';
const dueDate = 'due_date';
const choreIsComplete = 'chore_complete';
//Rent
const rentAmont = 'rent_amount';
const rentIsPaid = 'rent_paid';

//Locations for api
const group = 'groups';
const users = 'users';
const personalDebts = 'personalDebts';
const groupDebts = 'groupDebts';
const grocery = 'groceries';
const chores = 'chores';
const rent = 'rent';


function request(where, type, ...args){
	args = args[0];
	//suffix = ParseSuffix(where, args);
	ending = ParseArgs(where, type, args);
	addArgs = ending.addArgs;

	req({method: type, uri: 'http://18.216.3.210/api/' + where + '/' + ending.suffix, addArgs}, (error, response, body) => {
		if(error) {return console.log(error);}
		console.log('post ' + where +  ' status is: ' + response.statusCode);
		console.log('post ' + where + ' body returned: ' + body);
	});
}

function ParseSuffix(where, moreInfo){
	if(moreInfo == undefined){moreInfo = {}}
	suffix = '';

	switch(where) {
		default:
			suffix = '';
			break;
		//********BEGIN CHANGE**********
		case group:
			if(GID in moreInfo){
				suffix = moreInfo[GID];
			}
			break;
		case users:
			if(GID in moreInfo){
				suffix = moreInfo[UID];
			}
			break;
		case groupDebts:
			if(!(GID in moreInfo)) {return ParseValError(GID,where)}
			if(DID in moreInfo){
				suffix = moreInfo[GID] + '/' + moreInfo[DID];
			}
			else {
				suffix = moreInfo[GID];	
			}
			break;
		case personalDebts:
			if(UID in moreInfo){
				if(DID in moreInfo){
					suffix = moreInfo[UID] + '/' + moreInfo[DID];
				}
				else {
					suffix = moreInfo[UID];
				}
			}
			break;
		case grocery:
			if(!(GID in moreInfo)) {return ParseValError(UID,where)}
			if(GroceryID in moreInfo){
				suffix = moreInfo[GID] + '/' + moreInfo[GroceryID];
			}
			else {
				suffix = moreInfo[GID];
			}
			break;
		case chores:
			if(!(GID in moreInfo)) {return ParseValError(GID, where)}
			if(CID in moreInfo) {
				suffix = moreInfo[GID] + '/' + moreInfo[CID];
			}
			else {
				suffix = moreInfo[GID];
			}
			break;
		//*********END CHANGE***********
		case rent:
			if(!(GID in moreInfo)) {return ParseValError(GID, where)}
			suffix = moreInfo[GID];
			break;
	}

	return(suffix);
}

function ParseArgs(where, type, moreInfo){
	addArgs = {};
	suffix = ParseSuffix(where, moreInfo);
/*
	suffix = '';

	switch(where) {
		case group:
			if(type == post){
				if (!(GID in moreInfo)){return ParseValError(GID, where)}
				suffix = moreInfo[GID];
				addArgs.groupName = groupName in moreInfo ? moreInfo(groupName) : '';
			}
			else{
				addArgs.group_id = moreInfo[group_id];
				if(type == put){
					addArgs.groupName = moreInfo[groupName];
					//addArgs.users = moreInfo(users);		//Who is in the group
					addArgs.groupDebts = moreInfo[groupDebts];
				}
			}
			break;

		case users:
			switch(type){
				case put:
					suffix = moreInfo[UID];
					addArgs.user_id = moreInfo[user_id];
					//Intentional fallthrough
				case post:
					addArgs.first = first in moreInfo ? moreInfo[first] : ParseValError(first, where);
					addArgs.last = last in moreInfo ? moreInfo[last] : ParseValError(last, where);
					addArgs.email =  first in moreInfo ? moreInfo[email] : addArgs.email = '';
					addArgs.password =  password in moreInfo ? moreInfo[password] : ParseValError(password, where);
					addArgs.phoneNumber = phoneNumber in moreInfo ? moreInfo[phoneNumber] : addArgs.email = '';
					addArgs.facebook = facebook in moreInfo ? moreInfo[facebook] : addArgs.facebook = '';
					addArgs.twitter = twitter in moreInfo ? moreInfo[twitter] : addArgs.twitter = '';
					addArgs.instagram = instagram in moreInfo ? moreInfo[instagram] : addArgs.instagram = '';
					addArgs.groupID =  groupID in moreInfo ? moreInfo[groupID] : addArgs.groupID = '';
					break;
				case get:
					//Intentional fallthrough
				case del:
					suffix = moreInfo[UID];
					addArgs.user_id = moreInfo[user_id];
					break;
			}
			break;

		case groupDebts:
			suffix = moreInfo[groupID];
			addArgs.groupID = groupID in moreInfo ? moreInfo[groupID] : ParseValError(GroupID, where);
			if(PrimaryID in moreInfo){
				suffix = suffix + '/' + moreInfo[PrimaryID];
				addArgs.DebtID = PrimaryID in moreInfo ? moreInfo[PrimaryID] : ParseValError(PrimaryID, where);
				if(type == put){
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : ParseValError(lender, where);
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : ParseValError(borrower, where);
				}
			}
			else if(type == post){
				addArgs.debtType = debtType in moreInfo ? moreInfo[debtType] : ParseValError(debtType, where);
				addArgs.amount = amount in moreInfo ? moreInfo[amount] : ParseValError(amount, where);
			}	
			break;

		case personalDebts:
			addArgs.UserID = UserID in moreInfo ? moreInfo[UserID] : ParseValError(UserID, where);
			switch(type){
				case post:
					suffix = moreInfo[UserID];
					addArgs.amount = amount in moreInfo ? moreInfo[amount] : ParseValError(amount, where);
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : ParseValError(lender, where);
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : ParseValError(borrower, where);
					break;
				case get:
					if(DebtID in moreInfo){
						addArgs.DebtID = moreInfo[DebtID];
					}
					break;
				case put:
					addArgs.amount = amount in moreInfo ? moreInfo[amount] : ParseValError(amount, where);
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : ParseValError(lender, where);
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : ParseValError(borrower, where);
					//Intentional fallthrough
				case del:
					suffix = suffix + '/' + moreInfo[DebtID];
					break;
			}
			break;

		case grocery:
			if(!(groupID in moreInfo)) {return ParseValError(groupID,where)}
			if(GroceryID in moreInfo){
				suffix = moreInfo[groupID] + '/' + moreInfo[GroceryID];
			}
			else {
				suffix = moreInfo[groupID];
			}
			break;

		case chores:
			if(!(groupID in moreInfo)) {return ParseValError(groupID, where)}
			if(ChoreID in moreInfo) {
				suffix = moreInfo[ChoreID] + '/' + moreInfo[ChoreID];
			}
			else {
				suffix = moreInfo[groupID];
			}
			break;

		case rent:
			suffix = groupID in moreInfo ? moreInfo[groupID] : ParseValError(groupID, where)}
			addArgs.groupID = moreInfo[groupID];
			if(type != get){
				addArgs.amount = amount in moreInfo ? moreInfo[amount] : ParseValError(amount, where);
				addArgs.rentIsPaid = rentIsPaid in moreInfo ? moreInfo[rentIsPaid] : ParseValError(rentIsPaid, where);
				addArgs.UserID = UserID in moreInfo ? moreInfo[UserID] : ParseValError(UserID, where); 
			}
			break;
	}

*/
	//console.log(addArgs);
	return ({suffix: suffix, addArgs: addArgs}); 
}

function ParseValError(missingVal, where){
	console.log('ERROR: missing ' + missingVal + ' when referencing ' + where);
}

var dummyUser = {
	GroupID: 1,
	UserID: 3,
	Password: 'abc123',
	DebtID: 345,
	GroceryID: 3,
	ChoreID: 7
};

var newUser = {
	first_name: 'Dann',
	last_name: 'Parache',
	email: 'dann.parache@gmail.com',
	password: 'abc123',
}

request(rent, post);
request(group, post, dummyUser);
//request(, post, dummyUser);


/*
FORMAT OF :
	array['Name'] =  value
	Heirarchy:
		Group ID
		User ID
		Password
		Debt ID
		Grocery ID
		Chore ID
	var array = new Array();
	array['GroupID'] = 1;
	array['UserID'] = 3;
	array['Psswd'] = 'abc123';
	array['Debt'] = 3456;
	array['Grocery'] = 3;
	array['Chore'] = 7;
*/


/*require('mysql');
//Access the connection module
const ConnectFile = require('./connection.js');

//Test function to use modules for the initial connection and to query the database
function tQuery(){
	var connection = ConnectFile.Connect(connection); 								//Using a module to return the connection stream in order to use queries
	connection.query('select * from user_accounts', function(err, rows, fields){	//Dummy query to database for initial testing
		if (err) throw err;
		console.log('User Accounts: ', rows)										//Prints output of query
	});
	connection.end();																//Closes the stream
}

tQuery();
*/
