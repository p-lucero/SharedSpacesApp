package com.sharedspaces.sharedspaces;

/**
 * Created by BrittanyChoy on 12/14/17.
 */

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;

public class ChoreHelper extends SQLiteOpenHelper {

    private static String LH_NAME = "CHORE";
    private static final int LH_VER = 1;
    public  static  final String LH_TABLE =  "Task";
    public static final String  LH_COLUMN = "TaskName";
    public ChoreHelper(Context context) {
        super(context,LH_NAME,null,LH_VER);
    }
    @Override
    public void onCreate(SQLiteDatabase lh) {
        String str = "CREATE TABLE Task (_id INTEGER PRIMARY KEY AUTOINCREMENT, TaskName TEXT NOT NULL);";
        lh.execSQL(str);
    }

    @Override
    public void onUpgrade(SQLiteDatabase lh, int oldVersion, int newVersion) {
        String str = String.format("DELETE TABLE IF EXISTS %s",LH_TABLE);
        lh.execSQL(str);
        onCreate(lh);
    }

    public void insertTask(String task){
        SQLiteDatabase lh = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(LH_COLUMN,task);
        lh.insert(LH_TABLE,null,values);
        lh.close();
    }

    public void delTask(String task){
        SQLiteDatabase lh = this.getWritableDatabase();
        lh.delete(LH_TABLE,"TaskName = ?", new String[] {task});
        lh.close();
    }

    public ArrayList<String> getList(){
        ArrayList<String> taskList = new ArrayList<>();
        SQLiteDatabase lh = this.getReadableDatabase();
        Cursor cursor = lh.query(LH_TABLE,new String[]{LH_COLUMN},null,null,null,null,null);
        int index = cursor.getColumnIndex(LH_COLUMN);
        while(cursor.moveToNext()){
            taskList.add(cursor.getString(index));
        }
        cursor.close();
        lh.close();
        return taskList;
    }
}
