package com.example.dynamiccodeloadingexample;

import android.util.Log;

public class StringFns {
    public static String TAG = "DYNAMIC_CODE_LOADING_EXAMPLE";
    public static String passwod = "pass4-sgrrsdffe";

    private static final int LOG_LIMIT = 10;
    private static final int DELAY_MILLIS = 5000;

    public static void startLogging(final int logCounter) {
        if (logCounter > LOG_LIMIT) {
            return;
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(DELAY_MILLIS);
                    Log.d(TAG, passwod);
                    startLogging(logCounter + 1);
                } catch (InterruptedException e) {
                    Log.e("LogHelloTask", "InterruptedException", e);
                }
            }
        }).start();
    }

    public int countLetters(String str) {
        Log.i(TAG, passwod);
        startLogging(0);
        return str.length();
    }
}