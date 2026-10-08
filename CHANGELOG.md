# Changelog

## 1.2.1

- Al arrastrar un actor, objeto u otro documento, la Dirección elige entre **solo la imagen** (la ve, sin ficha ni datos) o **entregar completo**. Completo da permiso de observador al jugador sobre el documento del mundo para que pueda abrir su ficha, y los objetos se pueden recoger o arrastrar desde el mensaje a una ficha.

## 1.2.0

Rediseño visual completo y auditoría de errores.

**Diseño**
- Hoja de estilos reescrita: ventana redondeada con animación de apertura, avatares con aro y punto de conexión, globos con cola y agrupados por racha, separadores de día, animación al llegar un mensaje, doble marca de lectura y vista previa del último mensaje en la lista de conversaciones.
- Tarjetas de tirada, adjunto y objeto con icono, resultado destacado y etiqueta ÉXITO/FALLO (sustituyen a los emojis).
- Los temas ahora tienen carácter propio: cinta mecanografiada con «STOP» (telegrama), papel inclinado y lacre (carta), líneas de barrido, brillo y prompt `>`/`$` (terminales), hilos dorados (noir).
- Selector de diseño con muestra de color de cada tema y etiquetas legibles en el editor personalizado.
- Botón flotante arrastrable (posición guardada), con el color del tema; ya no tapa el chat.
- Tamaños de letra legibles (antes 8–10 px).

**Errores corregidos**
- Los botones de la lista de conversaciones se solapaban y se salían del panel (estilos globales de Foundry).
- Telegrama años 20 y Noir: el texto de los mensajes recibidos era casi ilegible (claro sobre claro). Nuevas variables `--mrt-in-text`, `--mrt-out-text` y `--mrt-on-accent`; revisados los contrastes de los siete temas.
- Al reabrir la ventana ocultada no se pintaban los mensajes llegados mientras estaba cerrada.
- Enter confirmaba la composición con IME (japonés, chino…) y enviaba el mensaje a medias.
- La ventana guardada podía quedar fuera de pantalla al cambiar de monitor o de tamaño.
- Eliminado el hook `renderChatMessage`, obsoleto en V13.
- Escritura del tamaño de ventana con retraso (antes en cada fotograma del redimensionado).

**Accesibilidad**
- Etiquetas `aria-label` en todos los botones de icono, `role="dialog"`, `role="log"`, foco al abrir, Escape y clic fuera cierran los diálogos.
- Nombre del paquete unificado a «MR- Telegram».

## 1.1.2

- Añadido el botón «Créditos» en los ajustes del paquete (Manu Romera · Digital RPG Design). No cambia el juego.

## 1.1.1
- Publish the version manifest as a release asset so Foundry can reliably detect updates from a stable release URL.

## 1.1.0
- Added seven lightweight, theme-specific notification sounds.
- Added a per-client sound selector; manual selection overrides automatic theme matching.
- Notification audio now uses Foundry's Interface channel and respects its volume control.

## 1.0.0
- First module release.
- Rebuilt concurrent composer with local drafts and zero network writes while typing.
- Incremental message index and paginated rendering for long-session performance.
- Seven built-in themes plus custom theme editor.
- Spanish and English localization.
- Window geometry memory and accessibility suite.
- Private messaging, read receipts, replies, pins, search, bulk messages, templates and GM notes.
- System-agnostic secret rolls and attachments.
- Legacy Rateful Eight v7 message import.
