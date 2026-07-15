markdown_content = """# Control Flow (El Catálogo)

En esta primera sesión sentaremos las bases de la arquitectura, configuraremos nuestras variables globales y PrimeNG, modelaremos los datos y construiremos nuestra primera vista reactiva utilizando Signals.

## Paso 1: Configurar las Variables Globales (Environments)

Tu archivo Markdown está listo
[file-tag: code-generated-file-0-1783122046447334881]

He generado nuevamente el archivo **`sesion1.md`** consolidando **toda la documentación exactamente como la compartiste**, sin omitir ninguna sección ni fragmento de código. 

### 📦 Contenido incluido dentro del archivo:
1. **Introducción y objetivos de la Sesión 1:** Arquitectura, variables globales, PrimeNG, modelado de datos y Signals.
2. **Paso 1:** Configuración de Variables Globales y creación de `environment.ts`.
3. **Paso 1.5:** Configuración de PrimeNG con el tema "Aura" y el cliente HTTP con `withFetch()` en `app.config.ts`, incluyendo la nota importante sobre `primeicons.css` en `angular.json`.
4. **Paso 2:** Modelado de datos en TypeScript y la creación de `product.interface.ts` con la propiedad simulada de `stock`.
5. **Paso 3:** Implementación del servicio `ProductService` utilizando `rxjs` para el consumo de FakeStoreAPI y simulación de inventario.
6. **Paso 4:** Creación de la vista reactiva en `CatalogoComponent` consumiendo `toSignal`, junto con su plantilla HTML estilizada con Tailwind CSS y componentes de PrimeNG (`p-rating`, `p-button` con control flow `@for` y `@if`).
7. **Paso 5:** Configuración de enrutamiento en `app.routes.ts` y la directiva `<router-outlet>`.
8. **Verificación importante:** Solución al error de pantalla en blanco importando `RouterOutlet` en `app.component.ts`.

El archivo está formateado con jerarquía clara de títulos (`#`, `##`, `###`) y bloques de código con resaltado de sintaxis listos para su uso en tu proyecto. Puedes descargarlo directamente desde el enlace superior.

## Sesión 2: Interactividad y Estado Global (El Carrito)

En esta sesión, el objetivo es darle vida al catálogo, permitiendo que el usuario interactúe con la información y que la aplicación recuerde sus decisiones.

### Objetivos de la sesión

1. Construir una navegación superior (Navbar) con acceso visual al estado del carrito.
2. Implementar estado global con Signals usando un `CartService`.
3. Conectar el botón **Agregar** del catálogo para actualizar el carrito en tiempo real.
4. Agregar filtros reactivos por categoría y por búsqueda de texto.

### Paso 1: Header y Navegación (Navbar)

Creamos un componente de layout reutilizable en:

- `src/app/shared/components/navbar/navbar.ts`
- `src/app/shared/components/navbar/navbar.html`
- `src/app/shared/components/navbar/navbar.css`

Este componente muestra:

- Nombre de la tienda.
- Ícono del carrito.
- Badge con cantidad de productos agregados.
- Subtotal dinámico del carrito.

Además, lo integramos en el shell principal de la app:

- `src/app/app.ts`: importar `Navbar` en `imports`.
- `src/app/app.html`: renderizar `<app-navbar></app-navbar>` antes de `<router-outlet>`.

### Paso 2: Estado Global con Signals (`CartService`)

Creamos `src/app/features/catalogo/services/cart.ts` para centralizar el estado del carrito en toda la aplicación.

El servicio define:

- `items`: señal de solo lectura con los ítems del carrito.
- `totalItems`: `computed()` para sumar cantidades.
- `subtotal`: `computed()` para sumar precio por cantidad.
- `add(product)`: agrega un nuevo producto o incrementa su cantidad.
- `clear()`: vacía el carrito.

Con esto, cualquier componente puede leer y reaccionar al estado global sin pasar props entre componentes.

### Paso 3: Actualización en Tiempo Real (Catálogo -> Carrito)

En `src/app/features/catalogo/components/catalogo/catalogo.ts` inyectamos `CartService` y conectamos el botón **Agregar**.

Flujo:

1. El usuario hace clic en **Agregar**.
2. Se llama `agregarProducto(producto.id)`.
3. El método valida stock disponible.
4. Se ejecuta `cartService.add(producto)`.
5. El badge del Navbar se actualiza automáticamente gracias a signals.

### Paso 4: Filtros Reactivos (Categorías + Búsqueda)

Ampliamos `ProductService` con el endpoint de categorías:

- `getCategories()` -> `GET /products/categories`

En `CatalogoComponent` agregamos:

- `categorias`: señal con el listado de categorías.
- `categoriaSeleccionada`: signal para filtro activo (`Todas` por defecto).
- `busqueda`: signal para filtro de texto.
- `productosFiltrados`: `computed()` que combina ambos filtros sobre el catálogo.

En la plantilla `catalogo.html` implementamos:

- Botonera superior para categorías (incluye **Todas**).
- Campo de búsqueda reactivo en tiempo real.
- Render de tarjetas usando `@for (producto of productosFiltrados())`.
- Estado vacío con mensaje cuando no hay coincidencias.

### Archivos modificados en esta sesión

- `src/app/app.ts`
- `src/app/app.html`
- `src/app/features/catalogo/services/product.ts`
- `src/app/features/catalogo/components/catalogo/catalogo.ts`
- `src/app/features/catalogo/components/catalogo/catalogo.html`
- `src/app/shared/components/navbar/navbar.ts`
- `src/app/shared/components/navbar/navbar.html`
- `src/app/shared/components/navbar/navbar.css`
- `src/app/features/catalogo/services/cart.ts`

### Resultado esperado

1. La app muestra un Navbar fijo superior.
2. El ícono del carrito muestra badge con cantidad en tiempo real.
3. El subtotal cambia conforme se agregan productos.
4. El catálogo se puede filtrar por categoría.
5. La búsqueda filtra por título o descripción sin recargar la página.

## Sesión 3: Vista de Carrito, Persistencia y Checkout Básico

En esta sesión llevamos el flujo de compra al siguiente nivel, agregando una vista dedicada del carrito, persistencia local y un checkout funcional de alcance inicial.

### Objetivos de la sesión

1. Construir una vista dedicada del carrito con detalle y edición de cantidades.
2. Persistir el estado del carrito con `localStorage`.
3. Implementar un flujo básico de checkout con validación mínima.

### Paso 1: Evolución del `CartService`

Se amplió `src/app/features/catalogo/services/cart.ts` para soportar operaciones completas:

1. `increment(productId)`: aumenta la cantidad de un ítem.
2. `decrement(productId)`: reduce la cantidad y elimina el ítem si llega a 0.
3. `remove(productId)`: elimina un producto específico del carrito.
4. `clear()`: vacía el carrito.

Además, se agregó persistencia local:

1. Carga inicial desde `localStorage` al crear el servicio.
2. Guardado automático de cambios del carrito usando `effect()`.
3. Sanitización básica de datos persistidos para evitar estados inválidos.

### Paso 2: Vista dedicada del carrito

Se creó el componente:

- `src/app/features/catalogo/components/carrito/carrito.ts`
- `src/app/features/catalogo/components/carrito/carrito.html`
- `src/app/features/catalogo/components/carrito/carrito.css`

Esta vista incluye:

1. Listado de productos agregados.
2. Controles para incrementar/decrementar cantidad por ítem.
3. Acción para eliminar productos del carrito.
4. Botón para vaciar carrito.
5. Resumen de compra (productos, subtotal, envío, total).
6. Estado vacío con acceso de regreso al catálogo.

### Paso 3: Checkout básico

Se creó el componente:

- `src/app/features/catalogo/components/checkout/checkout.ts`
- `src/app/features/catalogo/components/checkout/checkout.html`
- `src/app/features/catalogo/components/checkout/checkout.css`

El flujo implementado permite:

1. Capturar datos mínimos del comprador con `ReactiveForms`.
2. Validar nombre, correo, dirección y ciudad.
3. Mostrar resumen del pedido antes de confirmar.
4. Confirmar compra y limpiar el carrito.
5. Mostrar estado de éxito tras completar checkout.

### Paso 4: Rutas y navegación

Se actualizaron rutas para habilitar el flujo de compra completo:

- `src/app/app.routes.ts`

Nuevas rutas:

1. `/carrito`
2. `/checkout`

También se conectó el ícono del carrito del navbar para navegar a `/carrito`:

- `src/app/shared/components/navbar/navbar.html`

### Archivos modificados y creados en esta sesión

1. `src/app/features/catalogo/services/cart.ts`
2. `src/app/app.routes.ts`
3. `src/app/shared/components/navbar/navbar.html`
4. `src/app/features/catalogo/components/carrito/carrito.ts`
5. `src/app/features/catalogo/components/carrito/carrito.html`
6. `src/app/features/catalogo/components/carrito/carrito.css`
7. `src/app/features/catalogo/components/checkout/checkout.ts`
8. `src/app/features/catalogo/components/checkout/checkout.html`
9. `src/app/features/catalogo/components/checkout/checkout.css`

### Resultado esperado

1. El usuario puede entrar a una vista dedicada del carrito.
2. Puede incrementar, decrementar y eliminar ítems.
3. El contenido del carrito se conserva al recargar el navegador.
4. Puede completar un checkout básico con confirmación de compra.

### Nota

La **Sesión 4** (inicio de sesión y guards) queda pendiente y no fue implementada en este avance.

## Sesión 4: Inicio de Sesión y Guards de Rutas (Plan)

Esta sesión se documenta como siguiente etapa para cerrar seguridad de navegación y control de acceso.

### Objetivos de la sesión

1. Implementar login/logout básico con estado global reactivo.
2. Proteger rutas privadas con guards.
3. Restringir la ruta de login cuando el usuario ya tenga sesión activa.
4. Mantener persistencia de sesión entre recargas.

### Paso 1: Crear estado de autenticación

1. Crear `AuthService` con signals para manejar usuario y estado autenticado.
2. Definir métodos `login()`, `logout()` y `isAuthenticated()`.
3. Guardar y recuperar sesión desde `localStorage`.

### Paso 2: Crear vista de login

1. Crear componente de login con `ReactiveForms`.
2. Validar correo y contraseña.
3. Mostrar mensajes de error para credenciales inválidas.
4. Redirigir al catálogo o al checkout según flujo de navegación.

### Paso 3: Implementar guards

1. Crear `AuthGuard`: permite rutas privadas solo a usuarios autenticados.
2. Crear `GuestGuard`: bloquea `/login` si el usuario ya inició sesión.
3. Redirigir según corresponda (`/login` o `/`).

### Paso 4: Integrar rutas protegidas

1. Marcar rutas privadas con `canActivate`.
2. Proteger como mínimo `carrito` y `checkout`.
3. Mantener login como ruta pública inicial para usuario sin sesión.

### Paso 5: Ajustar navbar y experiencia de usuario

1. Mostrar botón de cerrar sesión cuando exista sesión activa.
2. Mostrar acceso a iniciar sesión cuando no haya sesión.
3. Mantener consistencia visual y de navegación con el resto de la app.

### Archivos sugeridos para esta sesión

1. `src/app/features/auth/services/auth.ts`
2. `src/app/features/auth/components/login/login.ts`
3. `src/app/features/auth/components/login/login.html`
4. `src/app/features/auth/components/login/login.css`
5. `src/app/core/guards/auth.guard.ts`
6. `src/app/core/guards/guest.guard.ts`
7. `src/app/app.routes.ts`
8. `src/app/shared/components/navbar/navbar.ts`
9. `src/app/shared/components/navbar/navbar.html`

### Resultado esperado

1. Usuario sin sesión no puede acceder a rutas protegidas.
2. Usuario con sesión puede navegar a carrito y checkout.
3. La sesión se mantiene al recargar la app.
4. El flujo de login/logout queda integrado al navbar y rutas.

