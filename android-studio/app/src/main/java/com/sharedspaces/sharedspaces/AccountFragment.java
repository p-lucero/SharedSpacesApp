package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

/**
 * TODO: implement account settings, user profile,
 * TODO: user's groups they are currently in, a way to invite others to group?
 */


public class AccountFragment extends Fragment implements View.OnClickListener {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //return inflater.inflate(R.layout.account_fragment, container, false);
        View v = inflater.inflate(R.layout.account_fragment, container, false);
        Button b1 = (Button) v.findViewById(R.id.button1);
        b1.setOnClickListener(this);
        return v;
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {

            case R.id.button1:

                Intent intent1 = new Intent(getActivity(), LoginActivity.class);
                startActivity(intent1);

                break;
        }
    }

}
