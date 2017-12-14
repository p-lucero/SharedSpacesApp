package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.Toast;

//TODO: implement functionable buttons with working activities, implement "add more" button

public class DashboardFragment extends Fragment implements View.OnClickListener {

    GridLayout mainGrid;
    GridLayout mainGrid2;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //return inflater.inflate(R.layout.dashboard_fragment, container, false);

        View v = inflater.inflate(R.layout.dashboard_fragment, container, false);
        /*mainGrid = (GridLayout) v.findViewById(R.id.mainGrid);

        setSingleEvent(mainGrid);
        setSingleEvent(mainGrid2);*/
        Button b1 = (Button) v.findViewById(R.id.button1);
        Button b2 = (Button) v.findViewById(R.id.button2);
        Button b3 = (Button) v.findViewById(R.id.button3);
        Button b4 = (Button) v.findViewById(R.id.button4);
        b1.setOnClickListener(this);
        b2.setOnClickListener(this);
        b3.setOnClickListener(this);
        b4.setOnClickListener(this);
        return v;

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {

            //case R.id.button1:

                /*Intent intent1 = new Intent(getActivity(), .class);
                startActivity(intent1);

                break;*/

            case R.id.button2:

                Intent intent2 = new Intent(getActivity(),GroceryList.class);
                startActivity(intent2);

                break;

            //case R.id.button3:

                /*Intent intent3 = new Intent(getActivity(),.class);
                startActivity(intent3);

                break;*/

            case R.id.button4:

                Intent intent4 = new Intent(getActivity(),MainActivity.class);
                startActivity(intent4);

                break;
        }
    }

}

    /*private void setSingleEvent(GridLayout mainGrid) {

        for (int i = 0; i < mainGrid.getChildCount(); i++) {
            CardView cardView = (CardView) mainGrid.getChildAt(i);
            final int finalI = i;
            cardView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    Intent i = new Intent(getActivity(), MainActivity.class);
                    startActivity(i);

                }
            });
        }
    }*/

        /*Button grocery = (Button) findViewById(R.id.button2);
        grocery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(DashboardFragment.class,GroceryList.class);
                startActivity(intent);

            }
        });



    }*/

