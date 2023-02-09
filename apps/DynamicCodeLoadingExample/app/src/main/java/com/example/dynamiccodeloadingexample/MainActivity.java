package com.example.dynamiccodeloadingexample;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import dalvik.system.DexClassLoader;

public class MainActivity extends AppCompatActivity {

    static String TAG = "DYNAMIC_CODE_LOADING_EXAMPLE";

    public void loadAndRunCode(View view) {
        Context context = getApplicationContext();

        String path = context.getFilesDir().getAbsolutePath();
        Log.i(TAG, "PATH: " + path);

        String apkPath = path + "/dynamic-code.apk";

        final DexClassLoader classLoader = new DexClassLoader(apkPath, context.getCacheDir().getAbsolutePath(), null, this.getClass().getClassLoader());

        Class<?> cls = null;
        try {
            Log.i(TAG, "Loading class");
            cls = classLoader.loadClass("com.example.dynamiccodeloadingexample.StringFns");
        } catch (Exception e) {
            Log.i(TAG, "Error loading class: " + e.getMessage());
            e.printStackTrace();
        }

        Method countLettersMethod = null;
        try {
            Log.i(TAG, "Loading method");
            countLettersMethod = cls.getMethod("countLetters", String.class);
        } catch (NoSuchMethodException e) {
            Log.i(TAG, "No such method!");
            e.printStackTrace();
        }

        // first parameter (Class) is null because the method is static
        int result = 0;
        try {
            Log.i(TAG, "Invoking method");
            result = (int) countLettersMethod.invoke(null, "Hello");
        } catch (IllegalAccessException e) {
            Log.i(TAG, "Illegal Access");
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            Log.i(TAG, "Invocation Target Exception");
            e.printStackTrace();
        }

        Log.i(TAG, "Answer: " + result);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}