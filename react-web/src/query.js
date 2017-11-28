const req = require('request'); //Needed for requests
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
const PrimaryID = 'PRIMARY';	//All for referencing self id
const amount = 'amount';		//Group Debts and Personal Debts
const lender = 'lender_id';		//Group Debts and Personal Debts
const borrower = 'borrower_id';	//Group Debts and Personal Debts
//Groups
const groupName = 'group_name';
const groupRules = 'ground_rules';
const groupID = 'group_id';
//User Accounts
const userID = 'user_id';
const first = 'first_name';
const last = 'last_name';
const email = 'email';
const password = 'password';
const phoneNumber = 'phone_number';
const facebook = 'facebook_profile';
const twitter = 'twitter_handle';
const instagram = 'instagram';1 
//GroupDebt
const debtType = 'debt_type';
//Groceries
const groceryAmountDue = 'amount_due';
const groceryIsPaid = 'paid_status';
const item = 'item'; //Not sure if this will always be here
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


//The actual function that insterfaces with the server
function request(where, type, ...args){
	args = args[0];								//Initialize the arguments variable
	ending = ParseArgs(where, type, args);		//Creates an ending object that contains the url suffix and the additional arguments object that is passed to the server
												//	Additional arguments (addArgs) is from an object that is passed with the relavent information, the passedrsedArgs 
												//	function will ensure that all of the relavent information is there and will alert if all of it is not there 
	addArgs = ending.addArgs;					//The object argument in request does not allow dot notation so it requires its own object

	//Request the server with a calling type (ie. GET, POST, etc), call the correct url with a valid location with the parsed arguments.
	//With the parsed information it will return an object with the relavent information that should be within the response object 
	//but right now it simply prints the result
	//	Deffinitions: suffix is in the url (ie. 'groups/:groupID') and the addArgs is an object that is passed
	req({method: type, uri: 'http://18.216.3.210/api/' + where + '/' + ending.suffix, json : addArgs}, (error, response, body) => {
		if(error) {return console.log(error);}
		console.log('post ' + where +  ' status is: ' + response.statusCode);
		console.log('post ' + where + ' body returned: ' + JSON.stringify(body));
	});
}

/*
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

	return(suffix);}
	*/


//Parses the relavent information and correctly routes to the correct server call with the information given
function ParseArgs(where, type, moreInfo){
	if(moreInfo == undefined){moreInfo = {}};	//If there is not another object passed to the request function then create an empty one
	addArgs = {};								//Initialize the additional arguments object
	suffix = '';								//Initialize the suffix

	switch(where) {								//Switch through the table in the server the request is calling upon
		case group: 																	//If the request is calling on the groups table in the server
			if(type == post){															//If the type is of a POST then no group id is required in the suffix
				if (!(GID in moreInfo)){return parseValError(GID, where)}				//Ensure there is a group id
				suffix = moreInfo[GID];													//Set the suffix
				addArgs.groupName = groupName in moreInfo ? moreInfo(groupName) : '';	//Set a group name if one if provided, if not set it as an empty string
			}																			//
			else{																		//If the request is not of type POST
				addArgs.group_id = moreInfo[group_id];									//Set the group id in additional arguments since all GET, PUT, and DELETE require a group id 
				if(type == put){														//
					addArgs.groupName = moreInfo[groupName];							//Set the group name in additional arguments
					//addArgs.users = moreInfo(users);		//Who is in the group 		//We may need to keep track of the users in a group so this is in such a case
					addArgs.groupDebts = moreInfo[groupDebts];							//Set the group debts in the additional arguments
				}
			}
			break;
		
		case users: 									//If the request is calling the users table on the server
			switch(type){								//Switch the type of request, there is more needed in this request than in groups so more is needed
				case put: 								//If the type of request is PUT. The only difference between PUT and POST is that PUT needs a suffix and user id
					suffix = moreInfo[UID];				//Set the suffix
					addArgs.userID = moreInfo[userID];	//Set the user id
					//Intentional fallthrough
				case post: 								//If the request is of type POST then set all of the relavent user info. Requred information is labeled
					addArgs.first = first in moreInfo ? moreInfo[first] : parseValError(first, where);				//First name is required
					addArgs.last = last in moreInfo ? moreInfo[last] : parseValError(last, where);					//Last name is required
					addArgs.email =  first in moreInfo ? moreInfo[email] : addArgs.email = '';
					addArgs.password =  password in moreInfo ? moreInfo[password] : parseValError(password, where);	//password is required
					addArgs.phoneNumber = phoneNumber in moreInfo ? moreInfo[phoneNumber] : addArgs.email = '';
					addArgs.facebook = facebook in moreInfo ? moreInfo[facebook] : addArgs.facebook = '';
					addArgs.twitter = twitter in moreInfo ? moreInfo[twitter] : addArgs.twitter = '';
					addArgs.instagram = instagram in moreInfo ? moreInfo[instagram] : addArgs.instagram = '';
					addArgs.groupID =  groupID in moreInfo ? moreInfo[groupID] : addArgs.groupID = '';
					break;
				case get: 								//GET and DELETE have the same suffix and additional argument requirements
					//Intentional fallthrough
				case del:
					suffix = moreInfo[UID];				//Set the suffix
					addArgs.userID = moreInfo[userID];	//Set the user id in additional arguments
					break;
			}
			break;

		case groupDebts: 																				//If the table the request is accessing is group debts
			suffix = moreInfo[groupID];																	//Set the suffix
			addArgs.groupID = groupID in moreInfo ? moreInfo[groupID] : parseValError(GroupID, where);	//Set the group id in additional arguments if one exists, throw an error if not
			if(PrimaryID in moreInfo){																				//A primary id is required in all but POST requests
				suffix = suffix + '/' + moreInfo[PrimaryID];
				addArgs.DebtID = PrimaryID in moreInfo ? moreInfo[PrimaryID] : parseValError(PrimaryID, where);		//Set the debt id
				if(type == put){																					//The PUT request needs a lender and borrower
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : parseValError(lender, where);			//Set the lender attribute of additional arguments
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : parseValError(borrower, where);	//Set the borrower attribute of additional arguments
				}
			}
			else if(type == post){																				//If the request is of type POST then it has its own attibutes
				addArgs.debtType = debtType in moreInfo ? moreInfo[debtType] : parseValError(debtType, where);	//Set the debt type attribute of additional arguments
				addArgs.amount = amount in moreInfo ? moreInfo[amount] : parseValError(amount, where);			//Set the amount attribute of additional arguments
			}	
			else if(!(PrimaryID in moreInfo)) {return parseValError(PrimaryID, where)}	//If the request is not POST and there is not a primary id, throw an error
			break;

		case personalDebts: 																		//If the request is calling the personal debts table on the server
			addArgs.userID = userID in moreInfo ? moreInfo[userID] : parseValError(userID, where);	//All requests in personal debts need a user id so an error is thrown if there isn't one
			switch(type){																			//Switch the type of request since they all need something different
				case post: 																							//If the request is of type POST
					suffix = moreInfo[userID];																		//Set the suffix
					addArgs.amount = amount in moreInfo ? moreInfo[amount] : parseValError(amount, where);			//Set the amount attribute of additional arguments
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : parseValError(lender, where);			//Set the lender attribute of additional arguments
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : parseValError(borrower, where);	//Set the borrower attribute of additional arguments
					break;
				case get: 									//If the request is of type GET
					if(DebtID in moreInfo){					//Get may or may not have a debt id but if it does then set the debt id attribute of the additional arguments
						addArgs.DebtID = moreInfo[DebtID];	
					}
					break;
				case put: 																							//If the request is of type PUT then it needs three attibutes but has the same suffix as DELETE
					addArgs.amount = amount in moreInfo ? moreInfo[amount] : parseValError(amount, where);			//Set the amount attribute of additional arguments
					addArgs.lender = lender in moreInfo ? moreInfo[lender] : parseValError(lender, where);			//Set the lender attribute of additional arguments
					addArgs.borrower = borrower in moreInfo ? moreInfo[borrower] : parseValError(borrower, where);	//Set the borrower attribute of additional arguments
					//Intentional fallthrough
				case del:
					suffix = suffix + '/' + moreInfo[DebtID];	//Set the suffix to also include the debt id attribute
					break;
			}
			break;

		case grocery: 																	//If the request is calling the grocery table on the server
			if(!(groupID in moreInfo)) {return parseValError(groupID,where)}			//Grocery needs a group id so if there is not on then throw an error
			suffix = moreInfo[groupID];													//Set the suffix
			if(GroceryID in moreInfo) {													//If there is grocery id, then the suffix also includes the grocery
				suffix = suffix + '/' + moreInfo[GroceryID];
				if(type == post) {return ParseValError('GET, PUT, or DELETE ', where)}
				addArgs.groupID = moreInfo[groupID];
				addArgs.GroceryID = GroceryID in moreInfo ? moreInfo[GroceryID] : ParseValError(GroceryID, where);
				addArgs.item = item in moreInfo ? moreInfo[item] : ParseValError(item, where);
				if(type == put) {
					addArgs.amount = amount in moreInfo ? moreInfo[amount] : ParseValError(amount, where);
					addArgs.groceryIsPaid = groceryIsPaid in moreInfo ? moreInfo[groceryIsPaid] : ParseValError(groceryIsPaid, where);
					addArgs.userID = userID in moreInfo ? moreInfo[userID] : ParseValError(userID, where);
				}
				
			}
			else {
				addArgs.groupID = moreInfo[groupID];
				if(type == post){
					addArgs.groceryAmountDue = moreInfo[groceryAmountDue];
					addArgs.groceryIsPaid = moreInfo[groceryIsPaid];
					addArgs.userID = moreInfo[userID];
				}
			}

			break;

		case chores: 															//If the request is calling the chores table on the server
			addArgs.groupID = groupID in choreName ? choreName[GroupID] : ParseValError(groupID, where);	//All chore requests require a group id so if there is not one throw an error
			if(ChoreID in moreInfo) {											//If there is a chore id then the chore id is used for the suffix in the uri
				suffix = moreInfo[ChoreID] + '/' + moreInfo[ChoreID];			//Set the suffix to include the chore id
				addArgs.ChoreID = moreInfo[ChoreID];
			}
			else {
				suffix = moreInfo[groupID];										//Set the suffix without the chore id if one does not exist
			}
			if(type == put || type == post){
				addArgs.choreName = choreName in moreInfo ? moreInfo[choreName] : ParseValError(choreName, where);
				addArgs.dueDate = dueDate in moreInfo ? moreInfo[dueDate] : ParseValError(dueDate, where);
				addArgs.choreIsComplete = choreIsComplete in moreInfo ? moreInfo[choreIsComplete] : ParseValError(choreIsComplete, where);
				addArgs.userID = userID in moreInfo ? moreInfo[userID] : ParseValError(userID, where);
			}
			break;

		case rent: 																				//If the request is calling the rent table on the server
			suffix = groupID in moreInfo ? moreInfo[groupID] : parseValError(groupID, where);	//Set the suffix to the group id if one exists, if one does not exist throw an error
			addArgs.groupID = moreInfo[groupID];												//Also add the group id as one of the attibutes in additional arguments
			if(type != get){
				addArgs.amount = amount in moreInfo ? moreInfo[amount] : parseValError(amount, where);					//Set the amount attribute of additional arguments
				addArgs.rentIsPaid = rentIsPaid in moreInfo ? moreInfo[rentIsPaid] : parseValError(rentIsPaid, where);	//Set the lender attribute of additional arguments
				addArgs.userID = userID in moreInfo ? moreInfo[userID] : parseValError(userID, where); 					//Set the borrower attribute of additional arguments
			}
	}


	return ({suffix: suffix, addArgs: addArgs}); //Return the suffix and the additional arguents as one object
}

//This function returns an error describing the missing object in the request
function parseValError(missingVal, where){
	console.log('ERROR: missing ' + missingVal + ' when referencing ' + where); //A simple console log
}

//This is a dummy variable that helps when testing.
//	More attributes can easily be added
var dummyUser = {
	GroupID: 1,
	userID: 3,
	Password: 'abc123',
	DebtID: 345,
	GroceryID: 3,
	ChoreID: 7
};

//A second dummy user to test the new user request
var newUser = {
	first_name: 'Dann',
	last_name: 'Parache',
	email: 'dann.parache@gmail.com',
	password: 'abc123',
}

//Test requests
//request(rent, post);
//request(group, post, dummyUser);