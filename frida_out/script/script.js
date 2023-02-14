console.log("Hello World!");

// Printing all classes loaded by the app
// setTimeout(function() {
//   Java.enumerateLoadedClasses({
//     onMatch: function(className) {
//       console.log(className);
//     },
//     onComplete: function() {
//       console.log("Class enumeration complete");
//     }
//   });
// }, 5000);

// Find class and use it
setTimeout(function() {
  var className = "com.example.dynamiccodeloadingexample.HelloWorld";
  console.log("Finding class");

  var classFactory;
  // searching for class in all class loaders
  const classLoaders = Java.enumerateClassLoadersSync();
  for (const classLoader in classLoaders) {
    try {
      console.log( classLoaders[classLoader]);
      classLoaders[classLoader].findClass(className);
      classFactory=Java.ClassFactory.get( classLoaders[classLoader]);
      console.log("Class found in class loader");
      break;
    } catch (e) {
      console.log("Class not found in class loader");
      continue;
    }
  }

  // create reference to class
  var classToDump= classFactory.use(className);
  // works till here


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
            var filename = "/data/user/0/com.example.dynamiccodeloadingexample/files/" + module.name + "_" + range.base.toString() + ".bin";
            console.log("[*] Writing " + range.size + " bytes to " + filename);
            var fd = new File(filename, 'wb');
            fd.write(Memory.readByteArray(range.base, range.size));
            fd.flush();
            fd.close();
            console.log("[*] Done!");
            break;
          }
        }
      }
    },
    onComplete: function () {
      console.log("Module enumeration complete");
    }
  });
}, 10000);



// // Read the memory of the class
// console.log("Reading memory of class");
// var memArray = classToDump.class.getData().data.readByteArray(memRange);

// // Write the memory to a file
// console.log("Writing memory to file");
// var file = new File("com.example.dynamiccodeloadingexample.MainActivity.bin", "wb");
// file.write(memArray);
// file.flush();
// file.close();
