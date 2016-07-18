(function($){
	var quaggaRunning = false;
	$(document).on('turbolinks:load', function() {
		if(! $(document.documentElement).hasClass("native-app")){
			$(".button-collapse").sideNav();
			$("form[method=GET]").submit(function(event){
				event.preventDefault();
				Turbolinks.visit($(this).attr("action") + "?" + $(this).serialize());
			});
		}
		Materialize.updateTextFields();
		if(quaggaRunning){
			quaggaRunning=false;
		}
		if($("#barcode-scanner-viewport").length){
			$.ajax({
				  url: "https://serratus.github.io/quaggaJS/examples/js/quagga.min.js",
				  dataType: "script",
				  cache: true,
				}).fail(function(){
					alert("failed to load QuaggaJS");
				}).done(function(){
					Quagga.init({
					    inputStream : {
					      name : "Live",
					      type : "LiveStream",
					      target: document.querySelector('#barcode-scanner-viewport')    // Or '#yourElement' (optional)
					    },
					    decoder : {
					      readers : ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
					    }
					  }, function(err) {
					      if (err) {
					          console.log(err);
					          return
					      }
					      console.log("Initialization finished. Ready to start");
					      Quagga.start();
					      quaggaRunning = true;
					  });
					Quagga.onDetected(function(data){
						Quagga.stop();
						Turbolinks.visit("/catalog/search.cmd?keyword=" + data.codeResult.code);
					});
				});
		}
	});
})(jQuery); // end of jQuery name space
