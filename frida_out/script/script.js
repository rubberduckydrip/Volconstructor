var mainactivity = Java.use("com.example.dynamiccodeloadingexample.MainActivity");
  mainactivity.onStart.overload().implementation = function() {
    send("MainActivity.onStart() HIT!!!");
    var ret = this.onStart.overload().call(this);
  };