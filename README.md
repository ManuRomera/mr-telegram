# M.R.- Telegram

**Foundry VTT v13 + v14 · System agnostic · Español / English**

M.R.- Telegram turns the former “The Rateful Eight · Private Telegraph v7” macro into an always-on Foundry module designed for any game system.

## English

### What it fixes
- **True concurrent typing:** drafts are stored locally in the browser and never call `User#setFlag` while typing. One user typing cannot force another user's UI to re-render.
- **No composer re-render on incoming messages:** message hooks update only the thread/sidebar. The textarea, caret and draft remain untouched.
- **Much better long-session performance:** module messages are indexed once and maintained incrementally. The UI renders only the latest configurable block of messages and loads older history on demand.
- **Automatic startup:** no macro execution after reload is required.

### Included features
- Private GM ↔ player channels, offline delivery and unread counters.
- Floating receiver, replies, pins, search, GM global search, private bulk send, quick templates and private GM notes.
- Secret system-agnostic rolls with optional Dice So Nice visualization only for the GM and controlled reveal.
- Optional Mausritter adapter: STR/DEX/WIL saves with normal/advantage/disadvantage while keeping the core module system-agnostic.
- Item/document/image/link attachments; Items can be claimed into the player's actor.
- Persistent drafts, read state and Sent/Delivered/Read status.
- Window position and size memory.
- Accessibility: A/A+/A++, high contrast, reading mode and reduced motion.
- Themes: Modern messenger, 1920s telegram, Letter, Green phosphor terminal, Amber terminal, Noir, Clean light and a custom theme editor.
- One module for Foundry v13 and v14.
- Spanish and English localization through `lang/es.json` and `lang/en.json`.
- One-time import of the old `world.r8SecretCommsV3` message flags when a GM first enables the module.

### Install
Copy the `mr-telegram` folder into `Data/modules/`, restart Foundry, enable **M.R.- Telegram** in Manage Modules, then open it from the floating envelope button or with **Ctrl+Shift+M**.

## Español

### Qué corrige
- **Escritura simultánea real:** los borradores se guardan localmente en el navegador y escribir no ejecuta `User#setFlag`. Un usuario escribiendo ya no provoca re-renderizados en los demás.
- **El compositor no se vuelve a dibujar al recibir mensajes:** los hooks actualizan solamente historial y avisos. El textarea, el cursor y el borrador permanecen intactos.
- **Rendimiento en sesiones largas:** los mensajes se indexan una sola vez y el índice se mantiene de forma incremental. Solo se dibuja el bloque reciente configurado y el historial antiguo se carga bajo demanda.
- **Arranque automático:** ya no hay que ejecutar una macro después de recargar Foundry.

### Funciones
- Canales privados Dirección ↔ jugador, mensajes offline y no leídos.
- Receptor flotante, respuestas, mensajes fijados, búsqueda, búsqueda global del GM, envío múltiple, plantillas y notas privadas.
- Tiradas secretas universales con Dice So Nice opcional y revelado controlado.
- Adaptador Mausritter opcional: salvaciones STR/DEX/WIL normal/ventaja/desventaja sin acoplar el núcleo a ese sistema.
- Adjuntos de Items, documentos, imágenes y enlaces; los Items pueden recogerse en la ficha.
- Borradores persistentes, estado de lectura y Enviado/Recibido/Leído.
- Memoria de posición y tamaño de ventana.
- Accesibilidad: A/A+/A++, alto contraste, lectura máxima y reducción de movimiento.
- Diseños: mensajería moderna, telegrama años 20, carta, fósforo verde, terminal ámbar, noir, claro y editor de tema personalizado.
- Un solo módulo para Foundry v13 y v14.
- Español e inglés mediante `lang/es.json` y `lang/en.json`.
- Importación única del historial antiguo marcado con `world.r8SecretCommsV3` cuando el GM activa el módulo por primera vez.

### Instalación
Copia la carpeta `mr-telegram` en `Data/modules/`, reinicia Foundry, activa **M.R.- Telegram** en Administrar módulos y ábrelo con el botón flotante del sobre o **Ctrl+Shift+M**.

## Manifest
`https://raw.githubusercontent.com/ManuRomera/mr-telegram/main/module.json`
