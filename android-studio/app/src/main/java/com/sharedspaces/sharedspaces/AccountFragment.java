package com.sharedspaces.sharedspaces;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

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
