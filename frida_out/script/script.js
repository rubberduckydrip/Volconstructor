console.log("Hello World!");

var dir = "/data/user/0/com.example.dynamiccodeloadingexample/dumps/";

// Find class and use it
setTimeout(function() {
  var counter = 0;
  // Iterate over all loaded modules to find the one that contains the class
  Process.enumerateModules({
    onMatch: function (module) {
      console.log("Checking module " + module.name);
      if (module.name.includes("dex")) {
        var base = module.base;
        var size = module.size;
        console.log("Found module " + module.name + " at " + base + " with size " + size);
        
        console.log("[*] Dumping " + module.name);
        var ranges = Process.enumerateRangesSync({protection: 'r--', coalesce: true});
        for (var i = 0; i < ranges.length; i++) {
          var range = ranges[i];
          if (range.base.equals(ptr(module.base))) {
            var filename = dir + module.name + "_" + range.base.toString() + ".bin";
            console.log("[*] Writing " + range.size + " bytes to " + filename);
            var fd = new File(filename, 'wb');
            fd.write(Memory.readByteArray(range.base, range.size));
            fd.flush();
            fd.close();
            console.log("[*] Done!");
            send(filename);
            break;
          }
        }
      }
    },
    onComplete: function () {
      console.log("Module enumeration complete");
    }
  });

}, 5000);
