console.log("Script loaded successfully ");
Java.perform(function x() {
    console.log("Inside java perform function");
    var main_activity
    Java.choose("com.example.dynamiccodeloadingexample.MainActivity", {
        onMatch: function(instance) {
            console.log("Found MainActivity: " + instance);
            main_activity = instance;
        },
        onComplete: function() {}
    });

    // Listen to DexClassLoader 
    main_activity.DexClassLoader.implementation = function(dexPath, optimizedDirectory, librarySearchPath, parent) {
        console.log("DexClassLoader called");
        console.log("Dex Path: " + dexPath);
        console.log("Optimized Directory: " + optimizedDirectory);
        console.log("Library Search Path: " + librarySearchPath);
        console.log("Parent: " + parent);
        return this.DexClassLoader(dexPath, optimizedDirectory, librarySearchPath, parent);
    }
});