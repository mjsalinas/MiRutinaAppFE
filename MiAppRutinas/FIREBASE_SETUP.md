# Configuración de Firebase

## Pasos para configurar Firebase en tu proyecto:

### 1. Crear proyecto en Firebase Console
1. Ve a https://console.firebase.google.com/
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "MiRutinaApp")
4. Desactiva Google Analytics si no lo necesitas
5. Haz clic en "Crear proyecto"

### 2. Agregar aplicaciones al proyecto
1. En el panel de Firebase, haz clic en el ícono de Android
2. Ingresa el package name: `com.miapprutinas` (o el que tengas configurado)
3. Descarga el archivo `google-services.json` y colócalo en `android/app/`
4. Repite para iOS descargando `GoogleService-Info.plist` y colócalo en `ios/MiAppRutinas/`

### 3. Habilitar Authentication
1. En el panel de Firebase, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Correo electrónico/contraseña"
5. Haz clic en "Guardar"

### 4. Configurar reglas de seguridad (opcional)
En la pestaña "Reglas" de Authentication, puedes usar:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Ejecutar la aplicación
Una vez configurado todo, ejecuta:
```bash
cd android && ./gradlew clean
cd ..
npx react-native run-android
```

## Notas importantes:
- El archivo `google-services.json` debe estar en `android/app/`
- El archivo `GoogleService-Info.plist` debe estar en `ios/MiAppRutinas/`
- Los package names deben coincidir exactamente
- Si cambias el package name, actualiza también los archivos de configuración de Firebase

