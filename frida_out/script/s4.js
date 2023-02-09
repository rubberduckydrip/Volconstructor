var targetProcess = "com.example.dynamiccodeloadingexample";

setImmediate(function() {
  Process.enumerateProcesses(function(process) {
    if (process.name.indexOf(targetProcess) !== -1) {
      console.log("[+] Found process: " + process.name + " (" + process.pid + ")");
      attach(process.pid);
    }
  });
});