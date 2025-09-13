// Configuración temporal sin Firebase - para que funcione la app
// TODO: Configurar Firebase correctamente

// Funciones de autenticación simuladas
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    // Simular registro exitoso
    console.log('Usuario registrado exitosamente (simulado):', email);
    return { success: true, user: { email, uid: 'simulated_uid' } };
  } catch (error: any) {
    console.error('Error al registrar usuario:', error.message);
    return { success: false, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Simular login exitoso
    console.log('Usuario inició sesión exitosamente (simulado):', email);
    return { success: true, user: { email, uid: 'simulated_uid' } };
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    return { success: false, error: error.message };
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

