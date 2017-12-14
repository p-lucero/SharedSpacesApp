package com.sharedspaces.sharedspaces;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.net.wifi.p2p.WifiP2pManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.TimerTask;
import java.util.Timer;

/**
 * Created by Nick on 12/5/2017.
 */

public class ChatLog extends AppCompatActivity{

    ListHelper ListHelper;
    ArrayAdapter<String> mAdapter;
    ListView lstTask;
    Timer timer = new Timer();

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlog);
    }

    /*private void loadTaskList() {
        ArrayList<String> taskList = ListHelper.getTaskList();
        if (mAdapter == null) {
            mAdapter = new ArrayAdapter<String>(getActivity(), R.layout.listhelper, R.id.task_title, taskList);
            lstTask.setAdapter(mAdapter);
        } else {
            mAdapter.clear();
            mAdapter.addAll(taskList);
            //mAdapter.notifyDataSetChanged();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        final EditText taskEditText = new EditText(getActivity());
        switch (item.getItemId()){
            case R.id.action_add_task:
                AlertDialog dialog = new AlertDialog.Builder(getActivity())
                        .setTitle("New message")
                        .setMessage("Enter username")
                        .setView(taskEditText)
                        .setPositiveButton("Add", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                String task = String.valueOf(taskEditText.getText());
                                ListHelper.insertNewTask(task);
                                loadTaskList();
                            }
                        })
                        .setNegativeButton("Cancel", null)
                        .create();
                dialog.show();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }*/

    //pass message to send message through server and to recipient
    public void send(String message){

    }

    //timer that updates the chat log in order to view new messages
    private void update(){

    }
}
