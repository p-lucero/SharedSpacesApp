package com.sharedspaces.sharedspaces;

import android.os.AsyncTask;
import android.widget.Switch;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.io.DataOutputStream;
import java.net.URLEncoder;
import java.security.acl.Group;
import java.util.*;
import java.util.Scanner;
import java.lang.Integer;
import java.util.concurrent.ThreadLocalRandom;
//import org.apache.commons.io.*;

import java.lang.StringBuilder;
import org.apache.commons.io.IOUtils;
import com.sharedspaces.sharedspaces.GroupMember;

import org.json.*;

//Request Class
class Request extends AsyncTask<GroupMember, Integer, GroupMember> {

    protected GroupMember doInBackground(GroupMember... groupMembers){
        GroupMember newMember = new GroupMember();
        for(int i = 0; i < groupMembers.length; i++){
            String reqType = groupMembers[i].requestType;
            switch(reqType){
                case "login":

                    newMember = login(groupMembers[i]);

            }
        }
        return newMember;
    }

    protected void onPostExecute(GroupMember member){

    }

    public static String testCase(GroupMember input){
        String test = "test";
        return test;
    }

    private static HttpURLConnection connect(String headerInput){
        try{
            String header = headerInput;
            URL url = new URL("http://18.216.3.210/api/" + header);
            //System.out.println("URL: " + url);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            //System.out.println("Initializing connection");
            return con;
        } catch(IOException e){
            //System.out.println("Error in \'connect\' -- " + e.toString());
            return null;
        }
    }

    private static Map<String, Object> ParseUser(String location, String type, GroupMember inputUser){
        Map<String, Object> user = new HashMap<>();
        //	user.put("token", inputUser.token);

        switch(type){
            case "POST":
                switch (location) {
                    case "login":
                        user.put("email", inputUser.email);
                        user.put("password", inputUser.password);
                        user.put("stayLoggedIn", inputUser.stayLoggedIn);
                        break;
                    case "logout":
                        user.put("token", inputUser.token);
                        break;
                    default:
                        user.put("first", inputUser.FName);
                        user.put("last", inputUser.LName);
                        user.put("email", inputUser.email);
                        user.put("password", inputUser.password);
                        user.put("phoneNumber", inputUser.phoneNum);
                        user.put("token", inputUser.token);
                        user.put("userID", inputUser.id);
                        break;
                }
            case "GET":
                user.put("userID", inputUser.id);
                user.put("token", inputUser.token);
                break;
            case "PUT":
                user.put("first", inputUser.FName);
                user.put("last", inputUser.LName);
                user.put("email", inputUser.email);
                user.put("password", inputUser.password);
                user.put("phoneNumber", inputUser.phoneNum);
                break;
            case "DELETE":
                user.put("first", inputUser.FName);
                user.put("last", inputUser.LName);
                user.put("email", inputUser.email);
                user.put("password", inputUser.password);
                user.put("phoneNumber", inputUser.phoneNum);
                break;
        }
        //System.out.println("Sending to server: " + user);
        return user;
    }

    private static Map<String, Object> ParsePDebt(String location, String type, PersonalDebts inputDebt){
        Map<String, Object> personalDebt = new HashMap<>();
        personalDebt.put("userid", inputDebt.userID);
        personalDebt.put("token", inputDebt.token);

        switch(type){
            case "POST":
                //Intentional Fallthrough
            case "PUT":
                personalDebt.put("amount", inputDebt.amount);
                personalDebt.put("lender", inputDebt.lenderID);
                personalDebt.put("borrower", inputDebt.userID);
                if(type == "POST"){
                    break;
                }
            case "GET":
                if(location == "userid"){
                    break;
                }
                //Intentional Fallthrough
            case "DELETE":
                personalDebt.put("debtid", inputDebt.debtID);
                break;
        }
        //System.out.println("Sending to server: " + personalDebt);
        return personalDebt;


    }

    private static HttpURLConnection insertParameters(HttpURLConnection con, Map<String, Object> params){
        try{
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes(ParameterStringBuilder.getParamsString(params));
            out.flush();
//            out.close();
            // System.out.println("Map: " + user);
        } catch(IOException e){
            ErrorReader("insertParameters", e, con);
        }
        return con;
    }

    private static Map<String, Object> getResponse(HttpURLConnection con){
        try{
            System.out.println("Response code: " + con.getResponseCode());
        } catch(IOException e){
            //System.out.println("Error in \'getResponse.getresponseCode\' -- " + e.toString());
        }
        try{
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer responseContent = new StringBuffer();
            while ((inputLine = in.readLine()) != null){
                responseContent.append(inputLine);
            }
            in.close();

            return(convertResponse(responseContent.toString()));
        } catch(IOException e){
            return(convertResponse(ErrorReader("getResponse", e, con)));
        }
    }

    private static String ErrorReader(String orgin, IOException e, HttpURLConnection con){
        try{
            // System.out.println("Error in \'" + orgin  + "\' -- " + e.getMessage());
            BufferedReader errReader = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            String errorLine;
            StringBuffer errorContent = new StringBuffer();
            while ((errorLine = errReader.readLine()) != null){
                errorContent.append(errorLine);
            }
            errReader.close();
            // System.out.println("Error Descriptor: " + errorContent.toString());
            //System.out.println("Error in \'" + orgin  + "\' -- " + errorContent.toString());
            return errorContent.toString();
        }catch(IOException err){
            //System.out.println("Error in \'Error Reader\': " + err.toString());
            return err.toString();
        }
    }

    private static Map<String, Object> convertResponse(String res){
        String response = res;
        res = response.substring(1, res.length()-1);
        String[] keyValuePairs = res.split(",");
        Map<String, Object> map = new HashMap<>();

        for(String pair : keyValuePairs){
            String[] entry = pair.split(":");
            //System.out.println("Current Map:" + map);
            map.put(entry[0].trim(), entry[1].trim());
        }

        return(map);
    }

    private static GroupMember MapToUser(Map<String, Object> map){
        GroupMember user = new GroupMember();
        // switch()
        if(map.containsKey("\"userID\"")){user.id = Integer.parseInt(map.get("\"userID\"").toString().replace("\"", ""));}
        if(map.containsKey("\"first\"")){user.FName = map.get("\"first\"").toString().replace("\"", "");}
        if(map.containsKey("\"last\"")){user.LName = map.get("\"last\"").toString().replace("\"", "");}
        if(map.containsKey("\"email\"")){user.email = map.get("\"email\"").toString().replace("\"", "");}
        if(map.containsKey("\"password\"")){user.password = map.get("\"password\"").toString().replace("\"", "");}
        if(map.containsKey("\"phoneNumber\"")){user.phoneNum = Long.parseLong(map.get("\"phoneNumber\"").toString());}
        if(map.containsKey("\"groupID\"")){user.groupID = Integer.parseInt(map.get("\"groupID\"").toString());}
        if(map.containsKey("\"twitter_handle\"")){user.TwitterHandle = map.get("\"twitter_handle\"").toString().replace("\"", "");}
        if(map.containsKey("\"facebook_profile\"")){user.facebook = map.get("\"facebook_profile\"").toString().replace("\"", "");}
        if(map.containsKey("\"instagram\"")){user.instagram = map.get("\"instagram\"").toString().replace("\"", "");}
        if(map.containsKey("\"groupName\"")){user.groupName = map.get("\"groupName\"").toString().replace("\"", "");}


        if(map.containsKey("\"amount\"")){user.personalDebt.amount = Long.parseLong(map.get("\"amount\"").toString().replace("\"", ""));}
        if(map.containsKey("\"debtID\"")){user.personalDebt.debtID = Integer.parseInt(map.get("\"debtID\"").toString().replace("\"", ""));}
        if(map.containsKey("\"lenderid\"")){user.personalDebt.lenderID = Integer.parseInt(map.get("\"lenderid\"").toString().replace("\"", ""));}

        if(map.containsKey("\"token\"")){
            String token = map.get("\"token\"").toString().replace("\"", "");
            user.token = token;
            user.personalDebt.token = token;
        }
        if(map.containsKey("\"url\"")){user.errMessage = map.get("\"url\"").toString().replace("\"", "");}
        return user;
    }


    //******TODO: Add new class for group info******//
    //
    //
    //
    //
    /////////////////////////////////////////////////

    /*public static void getGroupInfo(){
    	Map<String, Object> map = get("groups", input);
    	GroupMember out = MapToUser(map);
    	return;
    }*/


    public static GroupMember addPersonalDebt(GroupMember input){
        //System.out.println("\nAdding new debt item");
        Map<String, Object> map = post("personaldebts", input);
        GroupMember out = MapToUser(map);
        return out;
    }

    public static String deleteUser(GroupMember inputUser){
        //System.out.println("\ndeleting User");
        Map<String, Object> userMap = deleteReq("users", inputUser, inputUser.id);
        GroupMember user = MapToUser(userMap);
        return user.errMessage;
    }

    public static GroupMember updateUserInfo(GroupMember inputUser){
        //System.out.println("\nUpdating User Info");
        Map<String, Object> userMap = put("users", inputUser, inputUser.id);
        GroupMember user = MapToUser(userMap);
        return user;
    }

    public static GroupMember createNewUser(GroupMember inputUser){
        //System.out.println("\nCreating New User");
        Map<String, Object> userMap = post("users", inputUser);
        GroupMember user = MapToUser(userMap);
        return user;
    }

    public static void logout(GroupMember inputUser){
        //System.out.println("\nStarting to logout");
        post("logout", inputUser);
        return;
    }

    public static GroupMember login(GroupMember inputUser){
        //System.out.println("\nStarting to login");
        HttpURLConnection con = connect("post/login");
        Map<String, Object> resMap = new HashMap<>();
        GroupMember Outuser = new GroupMember();
        if(con != null){
            Map<String, Object> user = ParseUser("login", "POST", inputUser);
            con = insertParameters(con, user);
            resMap = getResponse(con);
            //  System.out.println(resMap);
            Outuser = MapToUser(resMap);
            con.disconnect();
        }
        else{
            //System.out.println("Error in connection from login");
        }
        return Outuser;
    }

    public static GroupMember getUserInfo(GroupMember inputUser){
        //System.out.println("\nGetting User Info");
        GroupMember OutUser = new GroupMember();

        if(inputUser.id == 0){
            //  System.out.println("Missing user ID... returning");
            return OutUser;
        }
        // else{
        // System.out.println("user id from getUserInfo: " + inputUser.id);
        // }
        Map<String, Object> userMap = get("users/", inputUser, inputUser.id);
        //Map<String, Object> userMap = get("users/" + inputUser.id + "/", inputUser);
        // System.out.println("user Map from get and in getUserInfo: " + userMap);
        // System.out.println(userMap);
        OutUser = MapToUser(userMap);
        return OutUser;
    }


    public static Map<String, Object> get(String location, GroupMember inputUser, Integer... optionalHeader){

        HttpURLConnection con = optionalHeader.length > 0 ? connect("get/" + location + optionalHeader[0]) :  connect("get/" + location);
        Map<String, Object> resMap = new HashMap<>();
        if(con != null){
            Map<String, Object> params = new HashMap<>();
            switch(location){
                case "users/":
                case "users":
                    params = ParseUser(location, "GET", inputUser);
                    break;
                case "personaldebts":
                    params = ParsePDebt(location, "GET", inputUser.personalDebt);
                    break;
            }
            con = insertParameters(con, params);
            resMap = getResponse(con);
            //System.out.println(resMap);
        }
        else{
            //System.out.println("Error in connection");
        }
        con.disconnect();
        return resMap;
    }

    public static Map<String, Object> post(String location, GroupMember inputUser, Integer... optionalHeader){
        HttpURLConnection con = optionalHeader.length > 0 ? connect("post/" + location + optionalHeader[0]) :  connect("post/" + location);
        Map<String, Object> resMap = new HashMap<>();
        if(con != null){
            Map<String, Object> params = new HashMap<>();
            switch(location){
                case "logout":
                    //Intentional Fallthrough
                case "users/":
                case "users":
                    params = ParseUser(location, "POST", inputUser);
                    break;
                case "personaldebts":
                    params = ParsePDebt(location, "POST", inputUser.personalDebt);
                    break;
            }
            con = insertParameters(con, params);
            resMap = getResponse(con);
            //System.out.println(resMap);
        }
        else{
            //System.out.println("Error in connection");
        }
        con.disconnect();
        return resMap;
    }

    public static Map<String, Object> put(String location, GroupMember inputUser, Integer... optionalHeader){
        HttpURLConnection con = optionalHeader.length > 0 ? connect("post/" + location + optionalHeader[0]) :  connect("post/" + location);
        Map<String, Object> resMap = new HashMap<>();
        if(con != null){
            Map<String, Object> params = new HashMap<>();
            switch(location){
                case "users/":
                case "users":
                    params = ParseUser(location, "PUT", inputUser);
                    break;
                case "personaldebts":
                    params = ParsePDebt(location, "PUT", inputUser.personalDebt);
                    break;
            }
            con = insertParameters(con, params);
            resMap = getResponse(con);
            //System.out.println(resMap);
        }
        else{
            //System.out.println("Error in connection");
        }
        con.disconnect();
        return resMap;
    }

    public static Map<String, Object> deleteReq(String location,GroupMember inputUser, Integer... optionalHeader){
        HttpURLConnection con = optionalHeader.length > 0 ? connect("delete/" + location + optionalHeader[0]) :  connect("delete/" + location);
        Map<String, Object> resMap = new HashMap<>();
        if(con != null){
            Map<String, Object> params = new HashMap<>();
            switch(location){
                case "users/":
                case "users":
                    params = ParseUser(location, "DELETE", inputUser);
                    break;
                case "personaldebts":
                    params = ParsePDebt(location, "DELETE", inputUser.personalDebt);
                    break;
            }
            con = insertParameters(con, params);
            resMap = getResponse(con);
            //System.out.println(resMap);
        }
        else{
            //System.out.println("Error in connection");
        }
        con.disconnect();
        return resMap;
    }



    public static class ParameterStringBuilder {
        public static String getParamsString(Map<String, Object> params)
                throws UnsupportedEncodingException{
            StringBuilder result = new StringBuilder();

            for (Map.Entry<String, Object> entry : params.entrySet()) {
                result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
                result.append("=");
                result.append(URLEncoder.encode(entry.getValue().toString(), "UTF-8"));
                result.append("&");
            }

            String resultString = result.toString();
            return resultString.length() > 0
                    ? resultString.substring(0, resultString.length() - 1)
                    : resultString;
        }
    }
}


class PersonalDebts{
    Scanner scan = new Scanner(System.in);
    public int userID = -1;
    public int debtID = -1;
    public String type = "";
    public long amount = 0;
    public int lenderID = -1;
    public Request request = new Request();
    public String token = "";

    PersonalDebts(int id, String inputToken){
        if(id != 0){
            token = inputToken;
            userID = id;
        }
    }
}
//javac -classpath C:\Users\Dann\reactapp\src\commons-io-2.6.jar; requests.java


class Chores {

    public int choreID;
    public String chore;
    public boolean complete;
    public int userID;
    public int groupID;
    Scanner reader = new Scanner(System.in);

    public void randomAssign(int[] users) {
        //assume users is an array of the users in the data structure
        shuffleArray(users);
        int arrSize = users.length;
        for (int i = 0; i < arrSize; i++) {
            //assign user a chore. may need to update the user
            //class in the other file. Talk to Dann tomorrow
        }
    }

    static void shuffleArray(int[] ar)
    {
        Random rnd = ThreadLocalRandom.current();
        for (int i = ar.length - 1; i > 0; i--)
        {
            int index = rnd.nextInt(i + 1);
            // Simple swap
            int a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
    }


    public void createChore() {
        System.out.println("Please enter the chore you would like to create:");
        chore = reader.next();
        //post the chore
    }

    public void completeChore() {
        System.out.println("Has the chore been completed? (Y/N):");
        String answer = reader.next();
        if (answer == "Y") {
            complete = true;
        }
    }
}
