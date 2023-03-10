console.log("[*] Hello World!");

recv('path', function onMessage(message) { 
  console.log("[*] Received poke message: " + message.payload);
  const path = message.payload;

  // Waits an amount of time to allow the dex file to be loaded
  setTimeout(function() {
    var counter = 0;
    // Iterate over all loaded modules to find the one that contains the class
    Process.enumerateModules({
      onMatch: function (module) {
        // Check if the module name contains "dex"
        console.log("[*] Checking module " + module.name);
        if (module.name.includes("dex")) {
          var base = module.base;
          var size = module.size;
          console.log("[*] Found module " + module.name + " at " + base + " with size " + size);
          
          // Dump the module
          console.log("[*] Dumping " + module.name);
          var ranges = Process.enumerateRangesSync({protection: 'r--', coalesce: true});
          for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (range.base.equals(ptr(module.base))) {
              var filename = path + module.name + "_" + range.base.toString() + ".bin";
              console.log("[*] Writing " + range.size + " bytes to " + filename);
              var fd = new File(filename, 'wb');
              fd.write(Memory.readByteArray(range.base, range.size));
              fd.flush();
              fd.close();
              console.log("[*] Done!");
              // Send the path of the dumped module
              send(filename);
              break;
            }
          }
        }
      },
      onComplete: function () {
        console.log("[*] Module enumeration complete");
      }
    });

  }, 5000);
});





