package com.sharedspaces.sharedspaces;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

import java.util.ArrayList;

public class ChoreActivity extends AppCompatActivity {

    public int choreID;
    public String chore;
    public boolean complete;
    public int userID;
    public int groupID;
    Scanner reader = new Scanner(System.in);
    ChoreHelper ChoreHelper;
    ArrayAdapter<String> mAdapter;
    ListView chrTask;
    //private Toolbar mToolbar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chore);
        ChoreHelper = new ChoreHelper(this);
        chrTask = (ListView)findViewById(R.id.chrTask);
        loadTaskList();

    }

    private void loadTaskList() {
        ArrayList<String> taskList = ChoreHelper.getList();
        if(mAdapter==null){
            mAdapter = new ArrayAdapter<String>(this,R.layout.chorehelper,R.id.task_title,taskList);
            chrTask.setAdapter(mAdapter);
        }else {
            mAdapter.clear();
            mAdapter.addAll(taskList);
            //mAdapter.notifyDataSetChanged();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.list,menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.action_add_task:
                final EditText taskEditText = new EditText(this);
                AlertDialog dialog = new AlertDialog.Builder(this)
                        .setTitle("Add New Chore")
                        .setMessage("What needs to be done?")
                        .setView(taskEditText)
                        .setPositiveButton("Add", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                String task = String.valueOf(taskEditText.getText());
                                ChoreHelper.insertTask(task);
                                loadTaskList();
                            }
                        })
                        .setNegativeButton("Cancel",null)
                        .create();
                dialog.show();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void deleteTask(View view){
        View parent = (View)view.getParent();
        TextView taskTextView = (TextView)parent.findViewById(R.id.task_title);
        String task = String.valueOf(taskTextView.getText());
        ChoreHelper.delTask(task);
        loadTaskList();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void randomAssign(int[] users) {
        //assume users is an array of the users in the data structure
        shuffleArray(users);
        int arrSize = users.length;
        for (int i = 0; i < arrSize; i++) {
            //assign user a chore. may need to update the user
            //class in the other file. Talk to Dann tomorrow
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    static void shuffleArray(int[] ar)
    {
        // If running on Java 6 or older, use `new Random()` on RHS here
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




