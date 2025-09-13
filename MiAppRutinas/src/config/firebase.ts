// Configuración temporal sin Firebase - para que funcione la app
// TODO: Configurar Firebase correctamente

// Base de datos simulada de usuarios (se actualiza dinámicamente)
let validUsers: { [key: string]: string } = {
  'usuario@test.com': '123456',
  'admin@test.com': 'admin123',
  'test@ejemplo.com': 'password123',
  'demo@demo.com': 'demo123'
};

// Funciones de autenticación simuladas
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    // Verificar si el usuario ya existe
    if (validUsers[email]) {
      return { 
        success: false, 
        error: 'Este email ya está registrado. Intenta con otro email.' 
      };
    }

    // Agregar el nuevo usuario a la base de datos simulada
    validUsers[email] = password;
    
    console.log('Usuario registrado exitosamente (simulado):', email);
    console.log('Usuarios actuales:', Object.keys(validUsers));
    
    return { success: true, user: { email, uid: 'simulated_uid' } };
  } catch (error: any) {
    console.error('Error al registrar usuario:', error.message);
    return { success: false, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Verificar si el usuario existe (usando la variable global validUsers)
    if (!validUsers[email]) {
      return { 
        success: false, 
        error: 'Usuario no encontrado. Verifica tu email.' 
      };
    }

    // Verificar si la contraseña es correcta
    if (validUsers[email] !== password) {
      return { 
        success: false, 
        error: 'Contraseña incorrecta. Intenta nuevamente.' 
      };
    }

    // Login exitoso
    console.log('Usuario inició sesión exitosamente (simulado):', email);
    return { success: true, user: { email, uid: 'simulated_uid' } };
    
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    return { success: false, error: 'Error inesperado. Intenta nuevamente.' };
  }
};

export const signOut = async () => {
  try {
    // Simular logout exitoso
    console.log('Usuario cerró sesión exitosamente (simulado)');
    return { success: true };
  } catch (error: any) {
    console.error('Error al cerrar sesión:', error.message);
    return { success: false, error: error.message };
  }
};

// Escuchar cambios en el estado de autenticación (simulado)
export const onAuthStateChanged = (callback: (user: any) => void) => {
  // Simular que no hay usuario autenticado inicialmente
  callback(null);
  return () => {}; // función de cleanup
};

