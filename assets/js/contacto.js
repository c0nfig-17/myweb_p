/*
	Iber-STRategia — formulario de contacto.

	============================ IMPORTANTE ============================
	Este formulario NO envía nada todavía. Valida los campos, simula el
	envío y muestra el mensaje de confirmación, pero el contenido NO llega
	a ningún buzón: se pierde.

	Es una decisión temporal para que la web se pueda enseñar con el
	formulario funcionando de cara al visitante. Mientras siga así, la
	confirmación incluye a propósito el correo y el teléfono directos,
	para que quien escriba tenga una vía real de contacto.

	Para dejarlo definitivo:
	  1. Dar de alta un endpoint de formularios (el propio hosting, un
	     servicio de formularios o un script en el servidor).
	  2. En contacto.html, poner ese endpoint en action="" y method="post".
	  3. Sustituir simularEnvio() por el envío real (fetch al endpoint) y
	     mostrar el mismo mensaje solo cuando la respuesta sea correcta.
	  4. Añadir una protección antispam (captcha o campo trampa).
	  5. Firmar el contrato de encargado de tratamiento con ese proveedor
	     y añadirlo a la lista de encargados de privacidad.html.
	====================================================================
*/

(function () {
	'use strict';

	var RETARDO = 700;   // Milisegundos de espera simulada antes de confirmar.

	var formulario = document.getElementById('formulario-contacto');
	if (!formulario) { return; }

	var confirmacion = document.getElementById('confirmacion-contacto');
	var error = document.getElementById('error-formulario');
	var consentimiento = formulario.elements['privacidad'];
	var boton = formulario.querySelector('input[type="submit"]');
	var textoBoton = boton ? boton.value : 'Enviar mensaje';

	function mostrarError(texto) {
		if (!error) { return; }
		error.textContent = texto;
		error.hidden = false;
	}

	function ocultarError() {
		if (error) { error.hidden = true; }
	}

	/*
		La plantilla oculta las casillas de verificación (opacity 0, z-index -1)
		y dibuja la marca sobre la etiqueta. Un control invisible no es
		enfocable, así que reportValidity() no puede mostrar su globo de aviso:
		el navegador se limita a bloquear el envío en silencio y el visitante se
		queda mirando un botón que no hace nada. Por eso el consentimiento se
		valida y se avisa aquí a mano.
	*/
	function faltaAlgo() {
		if (formulario.checkValidity()) { return false; }

		var primerInvalido = formulario.querySelector(':invalid');
		if (primerInvalido && primerInvalido !== consentimiento) {
			formulario.reportValidity();
		} else {
			mostrarError('Para poder enviar el mensaje tienes que aceptar la Política de Privacidad.');
		}
		return true;
	}

	function simularEnvio() {
		// Aquí irá la llamada real al servidor cuando haya endpoint.
		return new Promise(function (resolver) {
			window.setTimeout(resolver, RETARDO);
		});
	}

	function mostrarConfirmacion() {
		if (!confirmacion) { return; }
		formulario.hidden = true;
		confirmacion.hidden = false;
		// Lleva el foco al mensaje para que también lo anuncien los
		// lectores de pantalla, no solo quien lo ve.
		confirmacion.setAttribute('tabindex', '-1');
		confirmacion.focus();
		confirmacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	if (consentimiento) {
		consentimiento.addEventListener('change', function () {
			if (consentimiento.checked) { ocultarError(); }
		});
	}

	formulario.addEventListener('submit', function (evento) {
		evento.preventDefault();

		if (faltaAlgo()) { return; }
		ocultarError();

		if (boton) {
			boton.disabled = true;
			boton.value = 'Enviando…';
		}

		simularEnvio().then(function () {
			if (boton) {
				boton.disabled = false;
				boton.value = textoBoton;
			}
			formulario.reset();
			mostrarConfirmacion();
		});
	});
})();
