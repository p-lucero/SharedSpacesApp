
package com.sharedspaces.sharedspaces;

import java.util.Scanner;
import java.lang.Integer;
import java.util.concurrent.ExecutionException;

import com.sharedspaces.sharedspaces.Request;
//import com.sharedspaces.sharedspaces.GroupMember;
public class GroupMember {
    Scanner scan = new Scanner(System.in);

    private Request request = new Request();
    public int id = 0; // set the id to 0 until changed. 0 will be considered invalid user ID
    public String FName = "";
    public String LName = "";
    public String email = "";
    public String password = "";
    public long phoneNum = -1;
    public int groupID = -1;
    public String TwitterHandle = "";
    public String instagram = "";
    public String facebook = "";
    public String groupName = "";
    public String token = "";
    public boolean stayLoggedIn = true;
    public String errMessage = "";
    public PersonalDebts personalDebt = new PersonalDebts(id, token);
    public String requestType = "";
/*
    public String testCase(){
        String test;
        test = request.testCase(this);
        return test;
    }*/

    public void setName(String newFName, String newLName){
        FName = newFName;
        LName = newLName;
    }

    public void setEmail(String newEmail) {
        email = newEmail;
    }

    public void setPassword(String Password1, String Password2) {
        if (Password1 == Password2) {
            password = Password1;
        } else {
            password = Password1;
            //System.out.println("Passwords do not match.");
        }
    }

    public void setPhoneNum(long newPhoneNum) {
        phoneNum = newPhoneNum;
    }

    public void setToken(String NewToken){
        token = NewToken;
    }

    public void setUserID(int newUserID){
        id = newUserID;
        personalDebt = new PersonalDebts(newUserID, token);
    }


    public void CreateProfile() {


        //System.out.println("Enter your first name: ");
        String tempFName = scan.next();


        //System.out.println("Enter your last name: ");
        String tempLName = scan.next();


        //System.out.println("Enter your email: ");
        String tempEmail = scan.next();


        //System.out.println("Enter your phone number: ");
        long tempPhoneNum = Long.parseLong(scan.next());


        //System.out.println("Enter your password: ");
        String tempPassword1 = scan.next();


        //System.out.println("Please retype your password: ");
        String tempPassword2 = scan.next();


        setName(tempFName, tempLName);
        setEmail(tempEmail);
        setPassword(tempPassword1, tempPassword2);
        setPhoneNum(tempPhoneNum);

        GroupMember newUser = new GroupMember();
        newUser = request.createNewUser(this);
        token = newUser.token;
        setUserID(newUser.id);
        // id = get("\"user_id\"");
        // token = newUserMap.get("\"token\"").toString().replace("\"", "");
        // System.out.println("###ID###" + id);
        //TODO upload the information to the server in order to get
        //user ID

    }

    public void logout(){
        request.logout(this);
    }

    public void getUserInfo(){
        //System.out.println("UID: " + this.id + ", Token: " + this.token);
        GroupMember newUser = request.getUserInfo(this);
        // System.out.println("user token from getUserInfo: " + newUser);
    }


    public String PLogin(String EMAIL, String PASSWORD) throws ExecutionException, InterruptedException {
        requestType = "login";

//        GroupMember newUser = request.login(this);
        email = EMAIL;
        password = PASSWORD;
        request.execute(this);
        GroupMember newUser = request.get();
        //System.out.println("*From PLogin* User ID: " + newUser.id);
        //System.out.println("*From PLogin* User ID: " + newUser.token);
        setUserID(newUser.id);
        token = newUser.token;
        return token;

        //TODO fill in the group-member information with data
        //returned from server
		/*id = //data;
        FName = //data;
        LName = //data;
        email = //data;
        phoneNum = //data;
        password = //data;
            //TODO also make sure to get the group information based
            //on user ID
        groupID = //data;
        groupName = //data;
        */
    }

    public void Update(){
        GroupMember newUser = request.updateUserInfo(this);

        id = newUser.id;
        FName = newUser.FName;
        LName = newUser.LName;
        email = newUser.email;
        password = newUser.password;
        phoneNum = newUser.phoneNum;
        groupID = newUser.groupID;
        TwitterHandle = newUser.TwitterHandle;
        instagram = newUser.instagram;
        facebook = newUser.facebook;
        groupName = newUser.groupName;
        token = newUser.token;
        stayLoggedIn = newUser.stayLoggedIn;
        errMessage = newUser.errMessage;
    }

    public void delete(){
        errMessage = request.deleteUser(this);
    }


    public void addDebt(){
        // System.out.println("Enter Debt amount: ");
        personalDebt.amount = Long.parseLong(scan.next());

        //System.out.println("Enter Lender ID: ");
        personalDebt.lenderID = Integer.parseInt(scan.next());

        personalDebt.token = token;

        GroupMember newDebt = request.addPersonalDebt(this);
        //System.out.println("addDebts DebtID: " + newDebt.personalDebt.debtID);
    }


    void makeGroup(){


        boolean contSearch = true;
        GroupMember[] usersAdded = new GroupMember[20]; //TODO add group pulldown to edit group information


        while (contSearch == true){
            //System.out.println("Who would you like to add? Enter their email: ");
            String search = scan.next();
            //TODO add connection that searches by email, returns full
            //user data
            //TODO add the object returned to the usersAdded array
            //above
            //System.out.println("Would you like to add another person to the group?");
            String ans = scan.next();
            if (ans == "no" || ans == "No" || ans == "n"){
                contSearch = false;
                //add group members in this spot
                //need group ID and user object
            }
        }
    }
}