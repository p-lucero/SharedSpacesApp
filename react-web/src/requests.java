
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.io.DataOutputStream;
import java.net.URLEncoder;
import java.util.*;

//import org.apache.commons.httpCLient.*;

import java.lang.StringBuilder;
import org.apache.commons.io.IOUtils;

import org.json.*;

//Hello World
class Request {
	
	public static void main(String args[]){

    	Map<String, Object> parameters = new HashMap<>();
    	parameters.put("first", "Dann");
    	parameters.put("last", "P");
    	parameters.put("email", "dann.parache@gmail.cob");
    	parameters.put("password", "abc123");
    	parameters.put("token", "a98ec5b6-edba-4c25-80c9-83771fa42eb9");
    	parameters.put("phoneNumber", 8);
    	parameters.put("userID", 1021);
    	parameters.put("stayLoggedIn", true);

    	post("users", parameters);
    	//get("users", parameters);
    	//login(parameters);

    }

    private static HttpURLConnection connect(String requestType, String headerInput){
    	try{
	    	String header = headerInput;
	        URL url = new URL("http://18.216.3.210/api/" + header);
	        HttpURLConnection con = (HttpURLConnection) url.openConnection();
	        con.setRequestMethod(requestType);
	        System.out.println("Starting to connect");
	        return con;
    	} catch(IOException e){
    		System.out.println("Error in \'connect\' -- " + e.toString());
    		return null;
    	}
    }

    private static Map<String, Object> ParseUser(String location, String type, Map<String, Object> inputUser){
/*    	Map<String, Object> user;
    	user = inputUser;
    	switch(type){
    		case "POST":
    			user = inputUser;
				break;
			case "GET":
				user = inputUser;
				break;
			case "PUT":
				user = inputUser;
				break;
			case "DELETE":
				user = inputUser;
				break;
    	}
    	*/
    	return inputUser;
    }

    private static HttpURLConnection insertParameters(HttpURLConnection con, Map<String, Object> user){
    	try{
		   	con.setDoOutput(true);
			DataOutputStream out = new DataOutputStream(con.getOutputStream());	
			out.writeBytes(ParameterStringBuilder.getParamsString(user));
			out.flush();
			out.close();
			System.out.println("Map: " + user);
			return con;
		} catch(IOException e){
			System.out.println("Error in \'ParseUser\' -- " + e.toString());
			return(con);
		}
    }

    private static String getResponse(HttpURLConnection con){
    	try{
			System.out.println("resCode: " + con.getResponseCode());

			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer responseContent = new StringBuffer();
			while ((inputLine = in.readLine()) != null){
				responseContent.append(inputLine);
			}
			in.close();

			return(responseContent.toString());
		} catch(IOException e){
			System.out.println("Error in \'getResponse\' -- " + e.toString());
			return("Error");
		}
    }

    private static Map<String, Object> convertResponse(String res){
    	String response = res;
		res = response.substring(1, res.length()-1);
		String[] keyValuePairs = res.split(",");
		Map<String, Object> map = new HashMap<>();

		for(String pair : keyValuePairs){
			String[] entry = pair .split(":");
			map.put(entry[0].trim(), entry[1].trim());
		}

		return(map);

    }

    public static String login(Map<String, Object> inputUser){
    	HttpURLConnection con = connect("POST", "login");
    	if(con != null){
    		Map<String, Object> user = ParseUser("login", "POST", inputUser);
    		con = insertParameters(con, user);
    		String res = getResponse(con);
    		if(res != "Error"){
    			Map<String, Object> resMap = convertResponse(res); 
    			System.out.println("Map: " + resMap);
    		}
    		else{
    			System.out.println("Error in response");
    		}
    	}
    	else{
    		System.out.println("Error in connection");
    	}
    	con.disconnect();
    	return("leaving login");
    }

    public static String get(String location, Map<String, Object> inputUser){
    	HttpURLConnection con = connect("GET", location);
    	if(con != null){
    		Map<String, Object> user = ParseUser(location, "GET", inputUser);
    		con = insertParameters(con, user);
    		String res = getResponse(con);
    		if(res != "Error"){
    			Map<String, Object> resMap = convertResponse(res); 
    			System.out.println("Map: " + resMap);
    		}
    		else{
    			System.out.println("Error in response");
    		}
    	}
    	else{
    		System.out.println("Error in connection");
    	}
    	con.disconnect();
    	return("leaving get");
    }

    public static String post(String location, Map<String, Object> inputUser){
    	HttpURLConnection con = connect("POST", location);
    	if(con != null){
    		Map<String, Object> user = ParseUser(location, "POST", inputUser);
    		con = insertParameters(con, user);
    		String res = getResponse(con);
    		if(res != "Error"){
    			Map<String, Object> resMap = convertResponse(res); 
    			System.out.println("Map: " + resMap);
    		}
    		else{
    			System.out.println("Error in response");
    		}
    	}
    	else{
    		System.out.println("Error in connection");
    	}
    	con.disconnect();
    	return("leaving post");

    }

    public static String put(String location, Map<String, Object> inputUser){
    	HttpURLConnection con = connect("PUT", location);
    	if(con != null){
    		Map<String, Object> user = ParseUser(location, "PUT", inputUser);
    		con = insertParameters(con, user);
    		String res = getResponse(con);
    		if(res != "Error"){
    			Map<String, Object> resMap = convertResponse(res); 
    			System.out.println("Map: " + resMap);
    		}
    		else{
    			System.out.println("Error in response");
    		}
    	}
    	else{
    		System.out.println("Error in connection");
    	}
    	con.disconnect();
    	return("leaving put");

    }

    public static String delete(String location, Map<String, Object> inputUser){
    	HttpURLConnection con = connect("DELETE", location);
    	if(con != null){
    		Map<String, Object> user = ParseUser(location, "DELETE", inputUser);
    		con = insertParameters(con, user);
    		String res = getResponse(con);
    		if(res != "Error"){
    			Map<String, Object> resMap = convertResponse(res); 
    			System.out.println("Map: " + resMap);
    		}
    		else{
    			System.out.println("Error in response");
    		}
    	}
    	else{
    		System.out.println("Error in connection");
    	}
    	con.disconnect();
    	return("leaving DELETE");


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
