/*
	Iber-STRategia — envío del formulario de contacto.

	============================ IMPORTANTE ============================
	Solución PROVISIONAL para poder publicar la web sin servidor: al enviar
	el formulario se abre el cliente de correo del visitante con el mensaje
	ya redactado. Funciona en cualquier alojamiento estático, pero NO deja
	registro de las solicitudes y depende de que el visitante tenga un
	cliente de correo configurado.

	Antes de dar la web por definitiva, sustituir por un envío real:
	  1. Dar de alta un endpoint de formularios (el propio hosting, un
	     servicio de formularios o un pequeño script en el servidor).
	  2. En contacto.html, poner ese endpoint en action="" y method="post".
	  3. Borrar la carga de este archivo en contacto.html.
	  4. Añadir una protección antispam (captcha o campo trampa).
	  5. Firmar el contrato de encargado de tratamiento con ese proveedor
	     y añadirlo a la lista de encargados de privacidad.html.
	====================================================================
*/

(function () {
	'use strict';

	var DESTINO = 'Iber-STRategia@gmail.com';

	var formulario = document.getElementById('formulario-contacto');
	if (!formulario) { return; }

	var aviso = document.getElementById('aviso-formulario');

	function mostrarAviso(texto) {
		if (!aviso) { return; }
		aviso.textContent = texto;
		aviso.hidden = false;
	}

	function valor(nombre) {
		var campo = formulario.elements[nombre];
		return campo && campo.value ? campo.value.trim() : '';
	}

	formulario.addEventListener('submit', function (evento) {
		evento.preventDefault();

		if (!formulario.checkValidity()) {
			formulario.reportValidity();
			return;
		}

		var asunto = 'Web · ' + (valor('asunto') || 'Consulta') +
			(valor('empresa') ? ' · ' + valor('empresa') : '');

		var cuerpo = [
			'Nombre: ' + valor('nombre'),
			'Empresa: ' + (valor('empresa') || '(no indicada)'),
			'Correo: ' + valor('email'),
			'Teléfono: ' + (valor('telefono') || '(no indicado)'),
			'Motivo: ' + (valor('asunto') || '(no indicado)'),
			'Comunicaciones comerciales: ' +
				(formulario.elements['comercial'] && formulario.elements['comercial'].checked ? 'sí' : 'no'),
			'',
			'Mensaje:',
			valor('mensaje'),
			'',
			'---',
			'Enviado desde el formulario de iber-strategia.es'
		].join('\n');

		window.location.href = 'mailto:' + DESTINO +
			'?subject=' + encodeURIComponent(asunto) +
			'&body=' + encodeURIComponent(cuerpo);

		mostrarAviso('Se ha abierto tu programa de correo con el mensaje preparado. ' +
			'Si no se ha abierto, escríbenos directamente a ' + DESTINO + '.');
	});
})();
