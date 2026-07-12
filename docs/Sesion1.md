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

### Siguiente sesión sugerida

Para la **Sesión 3** podemos implementar:

1. Vista dedicada del carrito (detalle, incrementar/decrementar, eliminar).
2. Persistencia local con `localStorage`.
3. Flujo básico de checkout.

