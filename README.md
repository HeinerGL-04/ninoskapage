# 📊 ControlPro - Prototipo Interactivo de Gestión de Negocio

Este es el prototipo interactivo (HTML5, CSS3 moderno y JavaScript Vanilla) diseñado especialmente para la gestión y control integral de tu negocio.

---

## 🌟 ¿Qué incluye este diseño UX/UI?

El prototipo responde directamente a todas tus necesidades de control:

1. **Dashboard General (Vista 360°)**:
   - **Ventas del Mes**: Tarjeta KPI con el total de ingresos acumulados.
   - **Ganancia Neta Estimada**: Utilidad calculada descontando el costo de compra de la mercancía.
   - **¿Quién me debe? (Cuentas por Cobrar)**: Saldo total adeudado por clientes y acceso directo a deudas urgentes.
   - **Stock en Tiempo Real**: Unidades totales y aviso de productos por agotarse.
   - **Gráfica de Tendencia**: Evolución de ventas diarias con HTML5 Canvas.

2. **Módulo de Ventas & POS (Punto de Venta)**:
   - Registro de venta rápida con selector dinámico de productos.
   - Descuento automático de inventario al registrar una venta.
   - Modos de pago: **Efectivo**, **Transferencia**, **Tarjeta** o **A Crédito (Fiado)**.
   - Si se selecciona *A Crédito*, se enlaza automáticamente al módulo de deudores.
   - Generación de **Ticket/Comprobante de Venta** imprimible en formato térmico o PDF.

3. **Módulo de Inventario / Stock**:
   - Catálogo completo con Código/SKU, Categoría, Precio de Compra, Precio de Venta y Margen de ganancia en %.
   - **Alertas de Stock Bajo**: Indicadores visuales en amarillo (stock bajo) y rojo (agotado).
   - Botones rápidos `+` y `-` para ajustar el stock con un solo clic.
   - Buscador en tiempo real y filtro por categorías.
   - Modal para agregar y editar productos con validaciones.

4. **Módulo "¿Quién me debe?" (Control de Deudores)**:
   - Lista detallada con: Nombre del cliente, teléfono, concepto/artículos que se llevó, total de la deuda, total abonado y saldo pendiente.
   - Enlace directo para abrir chat de **WhatsApp** con el deudor para recordatorios.
   - Botón **"Abonar"**: Permite registrar pagos parciales actualizando el saldo al instante o liquidando la cuenta.
   - Botón para registrar una deuda o fiado directo sin pasar por venta de contado.

5. **Módulo de Reportes ("Ventas del Mes")**:
   - Desglose financiero: Total facturado, costo de mercancía y ganancia neta.
   - **Top 5 productos más vendidos**: Identifica cuáles son tus productos estrella.
   - **Ventas por método de pago**: Porcentaje y barra de progreso (Efectivo vs Transferencia vs Crédito).
   - Botón para imprimir reporte.

6. **Experiencia UX/UI Adicional**:
   - **Modo Oscuro / Modo Claro** integrado en el menú lateral.
   - **100% Responsivo**: Se adapta a teléfonos móviles, tabletas y computadoras.
   - **Persistencia en LocalStorage**: Si recargas la página o agregas un producto/venta, nada se pierde; queda guardado en tu navegador.
   - **Botón "Reiniciar Demo"**: Si pruebas agregando o borrando datos y quieres volver al estado inicial de ejemplo, puedes restaurarlo con un clic.

---

## 🚀 ¿Cómo abrir y probar la página?

Tienes dos opciones muy sencillas:

### Opción 1: Directamente desde el explorador de archivos
1. Ve a la carpeta de tu proyecto en el escritorio:  
   `sistema pagina ninoska`
2. Haz doble clic en el archivo `index.html`.
3. Se abrirá automáticamente en tu navegador preferido (Google Chrome, Edge, Firefox, Safari).

### Opción 2: Usando un servidor local (Opcional)
Si tienes Node.js o una extensión como *Live Server* en VS Code:
```bash
npx serve .
# o con python:
python -m http.server 8080
```
Luego abre `http://localhost:8080` en tu navegador.

---

## 🛠️ Próximos pasos para convertirlo en un Sistema Completo (Producción)

Cuando estés conforme con la apariencia y el flujo de pantallas:
1. **Base de Datos en la Nube**: Conectar con una base de datos segura (como Firebase Firestore, Supabase o PostgreSQL) para que puedas acceder desde tu celular o computadora en cualquier lugar.
2. **Autenticación y Roles**: Inicio de sesión con usuario y contraseña (administradora, empleados/cajeros con permisos limitados).
3. **Lector de Código de Barras**: Conectar una pistola lectora USB o la cámara del celular para registrar productos aún más rápido.
4. **Envío de Tickets por WhatsApp/Email**: Enviar el comprobante digital al cliente en PDF de manera automática.
