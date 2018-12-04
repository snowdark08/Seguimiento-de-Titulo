/**
 * 
 */
var app = angular.module('seguimientoApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.controller('seguimientoCtrl', function($scope, $http) {
	 $scope.isCollapsed = true;
	var parametros = {
		    codigoZona:"01",
		    codigoOficina:"01",
		    anioTitulo:"2018",
		    numeroTitulo:"12345678",
		    ip:"172.18.1.35",
		    userApp:"extranet",
		    userCrea:"11111",
		    status:"A"
		}
	
	var url = "http://172.18.1.35:7777/tracer/api/consultaTitulo";
	
	$scope.datosSeguimiento = null;
	$scope.montoTotal = null;
	$scope.postdata = function() {

		//Call the services

		$http.post(url, JSON.stringify(parametros)).then(
				function(response) {

					if (response.data){

						$scope.msg = "Post Data Submitted Successfully!";
						console.log($scope.msg);
						$scope.datosSeguimiento = response.data;
						var sumMonto = 0;
						
						for(var i = 0; i< $scope.datosSeguimiento.lstPagos.length;i++){
							console.log($scope.datosSeguimiento.lstPagos[i].montoRecibo);
							sumMonto += parseFloat($scope.datosSeguimiento.lstPagos[i].montoRecibo);
						}
						$scope.montoTotal = sumMonto;
					}					
				}, function(response) {

					$scope.msg = "Service not Exists";
					console.log($scope.msg);
					$scope.statusval = response.status;

					$scope.statustext = response.statusText;

					$scope.headers = response.headers();

				});
		
		
	};
	
	

	
//    $scope.datosSeguimiento = {
//    	    "codigoRespuesta": "0000",
//    	    "descripcionRespuesta": "Se muestran los resultados correctamente.",
//    	    "lstTitulo": [
//    	        {
//    	            "tipoRegistro": "REGISTRO DE PROPIEDAD INMUEBLE",
//    	            "partidaMatriz": "12345678",
//    	            "actoRegistral": "RECTIFICACION",
//    	            "fechaHoraPresentacion": "11/04/2018 11:18:00",
//    	            "lugarPresentacion": "LIMA",
//    	            "fechaVencimiento": "27/12/2018",
//    	            "nombrePresentante": "SORIANO CONDE VDA DE MOSCOSO, ERNESTINA RENE",
//    	            "documentoPresentante": "DNI - 06997585",
//    	            "estadoActual": "INSCRITO"
//    	        }
//    	    ],
//    	    "lstParticipantes": [
//    	        {
//    	            "codTipoParticipante": "01",
//    	            "desTipoParticipante": "PN",
//    	            "nombresRazonSocial": "CONDE ROJAS MARINA"
//    	        }
//    	    ],
//    	    "lstPagos": [
//    	        {
//    	            "codSedePago": "01",
//    	            "desSedePago": "LIMA",
//    	            "numeroRecibo": "171-00010812",
//    	            "montoRecibo": "40.00",
//    	            "fechaRecibo": "11/04/2018"
//    	        }
//    	    ]
//    	}
});