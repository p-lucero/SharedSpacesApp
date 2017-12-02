package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

//TODO: implement functionable buttons with working activities, implement "add more" button

public class DashboardFragment extends Fragment implements View.OnClickListener{

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //return inflater.inflate(R.layout.dashboard_fragment, container, false);

        View v = inflater.inflate(R.layout.dashboard_fragment, container, false);

        Button b = (Button) v.findViewById(R.id.button2);
        b.setOnClickListener(this);
        return v;

    }

        @Override
        public void onClick(View v) {
            switch (v.getId()) {
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

