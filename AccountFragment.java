package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import java.util.Scanner;

/**
 * TODO: implement account settings, user profile,
 * TODO: user's groups they are currently in, a way to invite others to group?
 */


public class AccountFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.account_fragment, container, false);
    }


}

class GroupMember {
    Scanner scan = new Scanner(System.in);

    private int id = 0; // set the id to 0 until changed. 0 will be considered invalid user ID
    private String FName = null;
    private String LName = null;
    private String email = null;
    private String password = null;
    private String phoneNum = null;
    private int groupID = null;
    private String groupName = null;


    private void setName(String newFName, String newLName){
        FName = newFName;
        LName = newLName;
    }

    private void setEmail(String newEmail) {
        email = newEmail;
    }

    private void setPassword(String Password1, String Password2) {
        if (Password1 == Password2) {
            password = Password1;
        } else {
            System.out.println("Passwords do not match.");
        }
    }

    private void setPhoneNum(String newPhoneNum) {
            phoneNum = newPhoneNum;
    }


    public void CreateProfile() {

        System.out.println("Enter your first name: ");
        String tempFName = scan.next();

        System.out.println("Enter your last name: ");
        String tempLName = scan.next();

        System.out.println("Enter your email: ");
        String tempEmail = scan.next();

        System.out.println("Enter your phone number: ");
        String tempPhoneNum = scan.next();

        System.out.println("Enter your password: ");
        String tempPassword1 = scan.next();

        System.out.println("Please retype your password: ");
        String tempPassword2 = scan.next();

        setName(tempFName, tempLName);
        setEmail(tempEmail);
        setPassword(tempPassword1, tempPassword2);
        setPhoneNum(tempPhoneNum);

        //TODO upload the information to the server in order to get user ID

        id = //data;
    }

    public void PLogin(){
            //TODO fill in the group-member information with data returned from server
        id = //data;
        FName = //data;
        LName = //data;
        email = //data;
        phoneNum = //data;
        password = //data;
            //TODO also make sure to get the group information based on user ID
        groupID = //data;
        groupName = //data;
    }


    void makeGroup(){

        boolean contSearch = true;
        GroupMember[] usersAdded = new GroupMember[20]; //TODO add group pulldown to edit group information

        while (contSearch == true){
            System.out.println("Who would you like to add? Enter their email: ");
            String search = scan.next();
            //TODO add connection that searches by email, returns full user data
            //TODO add the object returned to the usersAdded array above
            System.out.println("Would you like to add another person to the group?");
            String ans = scan.next();
            if (ans == "no" || "No" || "n"){
                contSearch = false;
            }
        }
        //add group members in this spot
        //need group ID and user object
    }
}
