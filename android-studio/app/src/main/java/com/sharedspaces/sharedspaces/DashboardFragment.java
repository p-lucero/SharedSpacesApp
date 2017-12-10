package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

//TODO: implement functionable buttons with working activities, implement "add more" button

public class DashboardFragment extends Fragment implements View.OnClickListener{

    private Toolbar mToolbar;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //return inflater.inflate(R.layout.dashboard_fragment, container, false);

        View v = inflater.inflate(R.layout.dashboard_fragment, container, false);

        Button b1 = (Button) v.findViewById(R.id.button1);
        Button b2 = (Button) v.findViewById(R.id.button2);
        b1.setOnClickListener(this);
        b2.setOnClickListener(this);
        return v;

    }

        @Override
        public void onClick(View v) {
            switch (v.getId()) {

                case R.id.button1:

                    Intent i = new Intent(getActivity(),MainActivity.class);
                    startActivity(i);

                    break;

                case R.id.button2:

                    Intent intent = new Intent(getActivity(),GroceryList.class);
                    startActivity(intent);

                    break;
            }
        }

        /*Button grocery = (Button) findViewById(R.id.button2);
        grocery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(DashboardFragment.class,GroceryList.class);
                startActivity(intent);

            }
        });*/



    }

