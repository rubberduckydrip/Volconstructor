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

        // load the apk
        String apkPath = path + "/dynamic-code.apk";
        Log.i(TAG, "Looking for apk at: " + apkPath);

        ClassLoader classLoader = new DexClassLoader(apkPath, context.getCacheDir().getAbsolutePath(), null, this.getClass().getClassLoader());

        // load the class
        Class<?> cls = null;
        try {
            Log.i(TAG, "Loading class");
            cls = classLoader.loadClass("com.example.dynamiccodeloadingexample.StringFns");
        } catch (Exception e) {
            Log.i(TAG, "Error loading class: " + e.getMessage());
            e.printStackTrace();
        }

        // create an instance of the class
        Object instance = null;
        try {
            Log.i(TAG, "Creating instance");
            instance = cls.newInstance(); // or call a constructor
        } catch (InstantiationException | IllegalAccessException e) {
            Log.i(TAG, "Error creating instance: " + e.getMessage());
            e.printStackTrace();
        }

        // load the method
        Method countLettersMethod = null;
        try {
            Log.i(TAG, "Loading method");
            countLettersMethod = cls.getMethod("countLetters", String.class);
        } catch (NoSuchMethodException e) {
            Log.i(TAG, "No such method!");
            e.printStackTrace();
        }

        // invoke the method
        int result = 0;
        try {
            Log.i(TAG, "Invoking method");
            // first parameter (Object) is null when the method is static
            result = (int) countLettersMethod.invoke(instance, "Hello"); // pass instance instead of null
        } catch (IllegalAccessException | InvocationTargetException e) {
            Log.i(TAG, "Error invoking method: " + e.getMessage());
            e.printStackTrace();
        }

        // suggest removal from memory
//        Log.i(TAG, "Suggesting removal from memory");
//        countLettersMethod = null;
//        instance = null;
//        cls = null;
//        classLoader = null;
//        System.gc();


        // print the result
        Log.i(TAG, "Answer: " + result);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        HelloWorld helloWorld = new HelloWorld();
        helloWorld.sayHello();
    }
}