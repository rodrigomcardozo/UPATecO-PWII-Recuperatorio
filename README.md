# Recuperatorio final · Programación Web II · UPATecO

Proyecto académico de React que incluye:

- Formulario de contacto con **EmailJS** y validación HTML5.
- Mapa embebido de **UPATecO, sede Pereyra Rozas, Salta**, junto al formulario.
- Diseño responsive para computadoras y celulares.
- Configuración de publicación automática en GitHub Pages.

> Esta página es una demostración académica. No constituye un canal oficial de UPATecO.

## 1. Abrir y ejecutar el proyecto

1. Extraer el archivo ZIP y abrir la carpeta `UPATecO-PWII-Recuperatorio` en Visual Studio Code.
2. Abrir una terminal de **CMD** dentro de VS Code (Terminal > New Terminal).
3. Escribir `npm install` y presionar Enter.
4. Escribir `npm run dev` y presionar Enter.
5. Abrir la dirección local que muestra Vite, habitualmente `http://localhost:5173/`.

## 2. Verificar EmailJS (identificadores ya configurados)

Los identificadores públicos del servicio, la plantilla y la clave pública **ya están incluidos** en `src/config.js`.

1. Entrar al panel de https://dashboard.emailjs.com/ con tu cuenta.
2. Verificar que el servicio `service_fmfsthk` esté conectado a Gmail.
3. Verificar que la plantilla `template_smlk9dd` tenga el destinatario **rodrigomcardozo93@gmail.com**.
4. En el asunto (*Subject*) de la plantilla: `Consulta desde web: {{subject}}`.
5. En el contenido (*Content*) de la plantilla:

   ```
   Nueva consulta desde el formulario web

   Nombre: {{from_name}}
   Correo de respuesta: {{reply_to}}
   Motivo: {{subject}}

   Mensaje:
   {{message}}
   ```

6. Si aparece el campo *Reply To*, escribir `{{reply_to}}`.
7. En la web local, completar y enviar un mensaje de prueba. Comprobar la confirmación y que haya llegado al correo; revisar spam.

**Importante:** configurar los datos del destinatario en la plantilla de EmailJS. El correo de destino no se decide en el navegador.

**No ingresar contraseñas ni claves privadas en el código.** Los identificadores de `src/config.js` son públicos y están diseñados para ejecutarse en el navegador.

Si EmailJS tiene restringidos los dominios permitidos, autorizar la dirección de tu GitHub Pages una vez publicada.

## 3. Subir a GitHub desde Visual Studio Code

1. En VS Code, entrar a **Source Control** (ícono de bifurcación en la barra izquierda).
2. Elegir **Initialize Repository**, si todavía no se inicializó.
3. Preparar los cambios con el símbolo **+** y escribir un mensaje como `Entrega recuperatorio Programación Web II`.
4. Seleccionar **Commit**.
5. Elegir **Publish Branch** o **Publish to GitHub**. Crear un **repositorio público**. Usar, por ejemplo, `UPATecO-PWII-Recuperatorio`.
6. Confirmar que el repositorio existe en `https://github.com/TU_USUARIO/UPATecO-PWII-Recuperatorio`.

Alternativa por terminal CMD, si se prefiere:

```
git init
git add .
git commit -m "Entrega recuperatorio Programacion Web II"
git branch -M main
```

Después se crea un repositorio vacío en GitHub y se copian los comandos de vinculación que ofrece GitHub.

## 4. Publicar la página en GitHub Pages

1. Entrar al repositorio en GitHub.
2. Ir a **Settings > Pages**.
3. En **Build and deployment > Source**, elegir **GitHub Actions**.
4. Ir a **Actions** y buscar el proceso **Publicar en GitHub Pages**. Si no se inició, usar **Run workflow**.
5. Cuando aparezca el resultado exitoso, abrir la URL que muestra el apartado **Pages** o el proceso de despliegue.

La URL pública suele tener este formato:

`https://TU_USUARIO.github.io/UPATecO-PWII-Recuperatorio/`

**No se debe asumir que funciona hasta abrirla y verificar el formulario y el mapa.**

## 5. Qué entregar en el aula virtual

Copiar ambos enlaces en un bloque de notas de la plataforma:

```
Recuperatorio TP Final - Programación Web II
Repositorio GitHub: https://github.com/TU_USUARIO/UPATecO-PWII-Recuperatorio
Página web publicada: https://TU_USUARIO.github.io/UPATecO-PWII-Recuperatorio/
```

Reemplazar `TU_USUARIO` y, si corresponde, el nombre del repositorio.

## Estructura del proyecto

- `src/App.jsx`: formulario, lógica de envío, mapa y contenido de la página.
- `src/styles.css`: estilos responsive.
- `src/config.js`: los tres identificadores públicos de EmailJS (ya cargados).
- `src/main.jsx`: inicio de React.
- `.github/workflows/deploy.yml`: publicación automática con GitHub Actions.
- `vite.config.js`: configuración de Vite para funcionar en GitHub Pages.

## Fuente de la ubicación

UPATecO: https://upateco.edu.ar/contacto/
