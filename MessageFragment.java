package com.sharedspaces.sharedspaces;

import android.app.AlertDialog;
import android.app.Fragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;

//TODO: implement chat system and info on who is in group

public class MessageFragment extends Fragment implements View.OnClickListener {


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View v = inflater.inflate(R.layout.message_fragment, container, false);

        Button groupChat = (Button) v.findViewById(R.id.button1);
        groupChat.setOnClickListener(this);
        return v;
    }

    @Override
    public void onClick(View v){
        switch(v.getId()){
            case R.id.button1:
                Intent intent = new Intent(getActivity(),ChatLog.class);
                startActivity(intent);

                break;
        }
    }



}
