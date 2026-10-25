/**
 * CONTROL PRO - SISTEMA DE GESTIÓN DE NEGOCIO
 * Prototipo interactivo en Vanilla JavaScript
 * Persistencia en localStorage & Datos Demo
 */

// ========================================================
// 1. DATOS INICIALES (DEMO DATA)
// ========================================================
const DEMO_PRODUCTS = [
  { id: 'p1', codigo: 'PROD-001', nombre: 'Blusa Casual de Lino', categoria: 'Ropa', precioCompra: 120, precioVenta: 250, stock: 18, stockMin: 5 },
  { id: 'p2', codigo: 'PROD-002', nombre: 'Pantalón Jean Slim Fit', categoria: 'Ropa', precioCompra: 220, precioVenta: 480, stock: 4, stockMin: 6 }, // Stock bajo
  { id: 'p3', codigo: 'PROD-003', nombre: 'Vestido Floral Verano', categoria: 'Ropa', precioCompra: 250, precioVenta: 550, stock: 2, stockMin: 4 }, // Stock bajo
  { id: 'p4', codigo: 'PROD-004', nombre: 'Zapatos Sandalias Plataforma', categoria: 'Calzado', precioCompra: 300, precioVenta: 680, stock: 12, stockMin: 3 },
  { id: 'p5', codigo: 'PROD-005', nombre: 'Cartera de Cuero Sintético', categoria: 'Accesorios', precioCompra: 180, precioVenta: 390, stock: 8, stockMin: 3 },
  { id: 'p6', codigo: 'PROD-006', nombre: 'Aretes de Acero Inoxidable', categoria: 'Joyería', precioCompra: 40, precioVenta: 120, stock: 25, stockMin: 8 },
  { id: 'p7', codigo: 'PROD-007', nombre: 'Perfume Floral 100ml', categoria: 'Cosméticos', precioCompra: 280, precioVenta: 620, stock: 1, stockMin: 3 } // Stock crítico
];

const DEMO_SALES = [
  {
    id: 's-101',
    ticket: 'TICK-0101',
    fecha: '2026-10-25 14:30',
    cliente: 'María Fernanda López',
    telefono: '555-432-1122',
    metodo: 'Efectivo',
    total: 800,
    costo: 370,
    items: [{ id: 'p1', nombre: 'Blusa Casual de Lino', cantidad: 1, precio: 250 }, { id: 'p3', nombre: 'Vestido Floral Verano', cantidad: 1, precio: 550 }],
    estado: 'Pagado'
  },
  {
    id: 's-102',
    ticket: 'TICK-0102',
    fecha: '2026-10-25 11:15',
    cliente: 'Carlos Estrada',
    telefono: '555-889-4433',
    metodo: 'Transferencia',
    total: 680,
    costo: 300,
    items: [{ id: 'p4', nombre: 'Zapatos Sandalias Plataforma', cantidad: 1, precio: 680 }],
    estado: 'Pagado'
  },
  {
    id: 's-103',
    ticket: 'TICK-0103',
    fecha: '2026-10-24 18:20',
    cliente: 'Patricia Benítez',
    telefono: '555-776-9900',
    metodo: 'Crédito',
    total: 1030,
    costo: 470,
    items: [{ id: 'p2', nombre: 'Pantalón Jean Slim Fit', cantidad: 1, precio: 480 }, { id: 'p3', nombre: 'Vestido Floral Verano', cantidad: 1, precio: 550 }],
    estado: 'A Crédito (Pendiente)'
  },
  {
    id: 's-104',
    ticket: 'TICK-0104',
    fecha: '2026-10-23 16:45',
    cliente: 'Laura Montes',
    telefono: '555-112-9988',
    metodo: 'Tarjeta',
    total: 510,
    costo: 220,
    items: [{ id: 'p5', nombre: 'Cartera de Cuero Sintético', cantidad: 1, precio: 390 }, { id: 'p6', nombre: 'Aretes de Acero Inoxidable', cantidad: 1, precio: 120 }],
    estado: 'Pagado'
  },
  {
    id: 's-105',
    ticket: 'TICK-0105',
    fecha: '2026-10-22 13:10',
    cliente: 'Guadalupe Santos',
    telefono: '555-334-7711',
    metodo: 'Crédito',
    total: 1240,
    costo: 560,
    items: [{ id: 'p7', nombre: 'Perfume Floral 100ml', cantidad: 2, precio: 620 }],
    estado: 'A Crédito (Pendiente)'
  }
];

const DEMO_DEBTORS = [
  {
    id: 'd-1',
    cliente: 'Patricia Benítez',
    telefono: '555-776-9900',
    concepto: 'Pantalón Jean + Vestido Floral (Ticket #0103)',
    montoOriginal: 1030,
    totalAbonado: 300,
    saldoPendiente: 730,
    fecha: '2026-10-24',
    estado: 'Pendiente',
    abonos: [
      { fecha: '2026-10-24', monto: 300, metodo: 'Efectivo' }
    ]
  },
  {
    id: 'd-2',
    cliente: 'Guadalupe Santos',
    telefono: '555-334-7711',
    concepto: '2 Perfumes Florales (Ticket #0105)',
    montoOriginal: 1240,
    totalAbonado: 240,
    saldoPendiente: 1000,
    fecha: '2026-10-22',
    estado: 'Pendiente',
    abonos: [
      { fecha: '2026-10-22', monto: 240, metodo: 'Transferencia' }
    ]
  },
  {
    id: 'd-3',
    cliente: 'Sofía Navarrete',
    telefono: '555-667-1234',
    concepto: 'Cartera y Zapatos de plataforma',
    montoOriginal: 1070,
    totalAbonado: 1070,
    saldoPendiente: 0,
    fecha: '2026-10-15',
    estado: 'Liquidado',
    abonos: [
      { fecha: '2026-10-15', monto: 500, metodo: 'Efectivo' },
      { fecha: '2026-10-20', monto: 570, metodo: 'Transferencia' }
    ]
  }
];

// ========================================================
// 2. ESTADO GLOBAL & PERSISTENCIA
// ========================================================
const state = {
  products: JSON.parse(localStorage.getItem('cp_products')) || DEMO_PRODUCTS,
  sales: JSON.parse(localStorage.getItem('cp_sales')) || DEMO_SALES,
  debtors: JSON.parse(localStorage.getItem('cp_debtors')) || DEMO_DEBTORS,
  currentView: 'dashboard'
};

function saveState() {
  localStorage.setItem('cp_products', JSON.stringify(state.products));
  localStorage.setItem('cp_sales', JSON.stringify(state.sales));
  localStorage.setItem('cp_debtors', JSON.stringify(state.debtors));
  updateBadgesAndKPIs();
}

function resetToDemoData() {
  if (confirm('¿Deseas restaurar todos los datos demo de prueba? Se reiniciarán productos, ventas y deudas.')) {
    state.products = [...DEMO_PRODUCTS];
    state.sales = [...DEMO_SALES];
    state.debtors = [...DEMO_DEBTORS];
    saveState();
    renderAllViews();
    showToast('Datos demo restaurados con éxito', 'info');
  }
}

// ========================================================
// 3. UTILIDADES DE FORMATO & CÁLCULOS
// ========================================================
const formatMoney = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr;
};

// ========================================================
// 4. GESTIÓN DE MODALES NATIVOS (<dialog>) CON LIGHT DISMISS
// ========================================================
function setupModalLightDismiss(dialog) {
  // Fallback para navegadores que aún no soportan closedby="any"
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (isDialogContent) return;
      dialog.close();
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  }
}

// ========================================================
// 5. RENDERIZADO DE VISTAS (SPA)
// ========================================================
function switchView(viewName) {
  state.currentView = viewName;
  
  // Cambiar clases en menú
  document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(item => {
    if (item.dataset.view === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Cambiar secciones
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Título dinámico
  const titleMap = {
    dashboard: { title: 'Panel General', sub: 'Resumen en tiempo real del estado de tu negocio' },
    ventas: { title: 'Ventas & Facturación', sub: 'Historial de tickets y registro de ventas' },
    inventario: { title: 'Control de Inventario', sub: 'Existencias, precios de compra/venta y alertas de stock bajo' },
    deudores: { title: '¿Quién me debe? (Cuentas por Cobrar)', sub: 'Control de fiados, abonos y deudas pendientes' },
    reportes: { title: 'Reportes & Ventas del Mes', sub: 'Ingresos totales, ganancias netas y análisis de ventas' }
  };

  const meta = titleMap[viewName] || titleMap.dashboard;
  document.getElementById('current-view-title').textContent = meta.title;
  document.getElementById('current-view-subtitle').textContent = meta.sub;

  // Cerrar sidebar en móvil al seleccionar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-backdrop').classList.remove('active');

  // Redibujar gráfico si es dashboard o reportes
  if (viewName === 'dashboard') {
    setTimeout(drawSalesChart, 50);
  } else if (viewName === 'reportes') {
    renderReportsView();
  }
}

// ========================================================
// 6. DASHBOARD & KPIS
// ========================================================
function updateBadgesAndKPIs() {
  // Total ventas de este mes
  const totalVentasMes = state.sales.reduce((acc, s) => acc + s.total, 0);
  const totalCostoMes = state.sales.reduce((acc, s) => acc + (s.costo || (s.total * 0.5)), 0);
  const gananciaNeta = totalVentasMes - totalCostoMes;

  // Cuentas por cobrar (Solo las pendientes)
  const totalPorCobrar = state.debtors
    .filter(d => d.estado === 'Pendiente')
    .reduce((acc, d) => acc + d.saldoPendiente, 0);

  const totalClientesDeudores = state.debtors.filter(d => d.estado === 'Pendiente').length;

  // Stock
  const stockTotal = state.products.reduce((acc, p) => acc + Number(p.stock), 0);
  const stockBajoCount = state.products.filter(p => Number(p.stock) <= Number(p.stockMin)).length;

  // Actualizar DOM KPIs
  document.getElementById('kpi-ventas-mes').textContent = formatMoney(totalVentasMes);
  document.getElementById('kpi-ventas-count').textContent = `${state.sales.length} ventas registradas`;

  document.getElementById('kpi-ganancia-mes').textContent = formatMoney(gananciaNeta);

  document.getElementById('kpi-por-cobrar').textContent = formatMoney(totalPorCobrar);
  document.getElementById('kpi-deudores-count').textContent = `${totalClientesDeudores} cliente(s) con saldo pendiente`;

  document.getElementById('kpi-stock-total').textContent = `${stockTotal} unidades`;
  document.getElementById('kpi-stock-alert').textContent = `${stockBajoCount} por agotarse`;

  // Badges del sidebar
  document.getElementById('badge-total-ventas').textContent = state.sales.length;
  document.getElementById('badge-stock-bajo').textContent = stockBajoCount;
  document.getElementById('badge-deudores').textContent = totalClientesDeudores;

  // Cuentas por cobrar en la vista de deudores
  document.getElementById('deudores-total-monto').textContent = formatMoney(totalPorCobrar);
  document.getElementById('deudores-total-personas').textContent = totalClientesDeudores;
  const totalRecuperado = state.debtors.reduce((acc, d) => acc + d.totalAbonado, 0);
  document.getElementById('deudores-total-cobrado').textContent = formatMoney(totalRecuperado);

  renderDashboardLists();
}

function renderDashboardLists() {
  // Lista rápida de deudores urgentes en Dashboard
  const listEl = document.getElementById('dashboard-debtors-list');
  const pendingDebtors = state.debtors.filter(d => d.estado === 'Pendiente');

  if (pendingDebtors.length === 0) {
    listEl.innerHTML = `<div class="p-4 text-center text-muted" style="padding: 1.5rem;">🎉 ¡Excelente! No tienes deudas pendientes por cobrar.</div>`;
  } else {
    listEl.innerHTML = pendingDebtors.slice(0, 4).map(d => `
      <div class="quick-debtor-item">
        <div>
          <div class="quick-debtor-name">${escapeHTML(d.cliente)}</div>
          <div class="quick-debtor-concept">${escapeHTML(d.concepto)}</div>
        </div>
        <div>
          <div class="quick-debtor-amount">${formatMoney(d.saldoPendiente)}</div>
          <button class="btn btn-sm btn-outline mt-1" onclick="abrirModalAbono('${d.id}')">Abonar</button>
        </div>
      </div>
    `).join('');
  }

  // Últimas ventas del Dashboard
  const salesTableBody = document.getElementById('dashboard-recent-sales');
  if (state.sales.length === 0) {
    salesTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2rem;">No hay ventas registradas aún. Haz clic en "+ Nueva Venta"</td></tr>`;
  } else {
    salesTableBody.innerHTML = state.sales.slice(0, 5).map(s => {
      const itemsDesc = s.items ? s.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ') : 'Venta directa';
      const isCredito = s.metodo === 'Crédito';
      return `
        <tr>
          <td><strong>${s.ticket}</strong></td>
          <td>${s.fecha}</td>
          <td>${escapeHTML(s.cliente || 'Público General')}</td>
          <td><small class="text-muted">${escapeHTML(itemsDesc)}</small></td>
          <td><span class="badge ${isCredito ? 'badge-warning' : 'badge-accent'}">${s.metodo}</span></td>
          <td><strong>${formatMoney(s.total)}</strong></td>
          <td><span class="badge ${isCredito ? 'badge-danger' : 'badge-success'}">${s.estado}</span></td>
        </tr>
      `;
    }).join('');
  }
}

// ========================================================
// 7. GRÁFICA DE VENTAS (HTML5 CANVAS NATIVO Y FLUIDO)
// ========================================================
function drawSalesChart() {
  const canvas = document.getElementById('salesChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  // Datos simulados de los últimos 7 días
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Hoy'];
  const values = [1200, 1850, 1400, 2400, 2100, 3200, state.sales.reduce((a, s) => a + s.total, 0) || 1900];

  const maxVal = Math.max(...values, 4000);
  const paddingBottom = 40;
  const paddingTop = 30;
  const paddingLeft = 50;
  const paddingRight = 20;

  const chartHeight = height - paddingBottom - paddingTop;
  const chartWidth = width - paddingLeft - paddingRight;

  ctx.clearRect(0, 0, width, height);

  // Líneas de cuadrícula suaves
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    // Etiqueta de valor Y
    ctx.fillStyle = isDark ? '#9ca3af' : '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    const labelVal = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(`$${labelVal}`, paddingLeft - 8, y + 4);
  }

  // Coordenadas de los puntos
  const points = values.map((val, index) => {
    const x = paddingLeft + (chartWidth / (days.length - 1)) * index;
    const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
    return { x, y, val, label: days[index] };
  });

  // Área con gradiente debajo de la curva
  const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  gradient.addColorStop(0, 'rgba(79, 70, 229, 0.35)');
  gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    // Curva bezier suave
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cpX, prev.y, cpX, curr.y, curr.x, curr.y);
  }
  ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
  ctx.lineTo(points[0].x, height - paddingBottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Línea principal
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cpX, prev.y, cpX, curr.y, curr.x, curr.y);
  }
  ctx.strokeStyle = '#4f46e5';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Puntos interactivos y etiquetas de días
  points.forEach((p) => {
    // Círculo
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Etiqueta del día X
    ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.label, p.x, height - 15);
  });
}

// Redibujar gráfica en resize de pantalla
window.addEventListener('resize', () => {
  if (state.currentView === 'dashboard') {
    drawSalesChart();
  }
});

// ========================================================
// 8. VISTA VENTAS (POS & HISTORIAL)
// ========================================================
function renderSalesView() {
  const tbody = document.getElementById('sales-table-body');
  const searchFilter = document.getElementById('search-sales-input').value.toLowerCase();
  const methodFilter = document.getElementById('filter-sales-method').value;

  const filtered = state.sales.filter(s => {
    const matchSearch = (s.cliente || '').toLowerCase().includes(searchFilter) ||
                        (s.ticket || '').toLowerCase().includes(searchFilter);
    const matchMethod = methodFilter === 'todos' || s.metodo === methodFilter;
    return matchSearch && matchMethod;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding: 2rem;">No se encontraron ventas con los filtros aplicados.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(s => {
    const itemsDesc = s.items ? s.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ') : 'Venta';
    const isCredito = s.metodo === 'Crédito';
    return `
      <tr>
        <td><strong>${s.ticket}</strong></td>
        <td>${s.fecha}</td>
        <td>
          <div class="font-medium">${escapeHTML(s.cliente || 'Público General')}</div>
          <small class="text-muted">${escapeHTML(s.telefono || 'Sin teléfono')}</small>
        </td>
        <td><small class="text-muted">${escapeHTML(itemsDesc)}</small></td>
        <td><span class="badge ${isCredito ? 'badge-warning' : 'badge-accent'}">${s.metodo}</span></td>
        <td><strong>${formatMoney(s.total)}</strong></td>
        <td><span class="badge ${isCredito ? 'badge-danger' : 'badge-success'}">${s.estado}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="verTicket('${s.id}')">🧾 Ver Ticket</button>
        </td>
      </tr>
    `;
  }).join('');
}

function verTicket(saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) return;

  document.getElementById('ticket-numero').textContent = `Ticket #${sale.ticket}`;
  document.getElementById('ticket-fecha').textContent = `Fecha: ${sale.fecha}`;
  document.getElementById('ticket-cliente').textContent = sale.cliente || 'Público General';
  document.getElementById('ticket-metodo').textContent = sale.metodo;
  document.getElementById('ticket-total-val').textContent = formatMoney(sale.total);

  const estadoBadge = document.getElementById('ticket-estado-val');
  estadoBadge.textContent = sale.estado;
  estadoBadge.className = `badge ${sale.metodo === 'Crédito' ? 'badge-danger' : 'badge-success'}`;

  const itemsContainer = document.getElementById('ticket-items-list');
  if (sale.items && sale.items.length > 0) {
    itemsContainer.innerHTML = sale.items.map(item => `
      <div class="ticket-row">
        <span>${item.cantidad}x ${escapeHTML(item.nombre)}</span>
        <span>${formatMoney(item.precio * item.cantidad)}</span>
      </div>
    `).join('');
  } else {
    itemsContainer.innerHTML = `<div class="ticket-row"><span>1x Venta general</span><span>${formatMoney(sale.total)}</span></div>`;
  }

  openModal('modal-ticket');
}

// Llenar select de productos para el modal de nueva venta
function populateSaleProductSelect() {
  const select = document.getElementById('pos-producto-select');
  select.innerHTML = '<option value="">-- Elige un producto del inventario --</option>';

  state.products.forEach(p => {
    const isOutOfStock = p.stock <= 0;
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.nombre} (${formatMoney(p.precioVenta)}) - [Stock: ${p.stock}]`;
    opt.disabled = isOutOfStock;
    select.appendChild(opt);
  });
}

// Manejar cambios en el modal de nueva venta
function setupSaleFormEvents() {
  const prodSelect = document.getElementById('pos-producto-select');
  const qtyInput = document.getElementById('pos-cantidad');
  const priceInput = document.getElementById('pos-precio-unitario');
  const stockHint = document.getElementById('pos-stock-disponible-hint');
  const totalDisplay = document.getElementById('pos-total-calculado');
  const metodoSelect = document.getElementById('pos-metodo-pago');
  const creditoAviso = document.getElementById('pos-credito-aviso');
  const reqCliente = document.getElementById('pos-req-cliente');
  const clienteInput = document.getElementById('pos-cliente-nombre');

  function calculatePosTotal() {
    const prodId = prodSelect.value;
    const qty = parseInt(qtyInput.value) || 0;
    const prod = state.products.find(p => p.id === prodId);

    if (prod) {
      priceInput.value = prod.precioVenta;
      stockHint.textContent = `Stock disponible: ${prod.stock} unidades`;
      if (qty > prod.stock) {
        stockHint.innerHTML = `<strong class="text-danger">¡Atención! Solo hay ${prod.stock} disponibles.</strong>`;
      }
      totalDisplay.textContent = formatMoney(prod.precioVenta * qty);
    } else {
      priceInput.value = '';
      stockHint.textContent = 'Stock disponible: -';
      totalDisplay.textContent = '$0.00';
    }
  }

  prodSelect.addEventListener('change', calculatePosTotal);
  qtyInput.addEventListener('input', calculatePosTotal);

  metodoSelect.addEventListener('change', () => {
    if (metodoSelect.value === 'Crédito') {
      creditoAviso.classList.remove('hidden');
      reqCliente.classList.remove('hidden');
      clienteInput.required = true;
      clienteInput.focus();
    } else {
      creditoAviso.classList.add('hidden');
      reqCliente.classList.add('hidden');
      clienteInput.required = false;
    }
  });

  // Enviar formulario de venta
  document.getElementById('form-nueva-venta').addEventListener('submit', (e) => {
    e.preventDefault();

    const prodId = prodSelect.value;
    const qty = parseInt(qtyInput.value) || 1;
    const prod = state.products.find(p => p.id === prodId);

    if (!prod) {
      showToast('Por favor selecciona un producto válido', 'error');
      return;
    }

    if (qty > prod.stock) {
      showToast(`No hay suficiente inventario. Quedan ${prod.stock} unidades.`, 'error');
      return;
    }

    const metodo = metodoSelect.value;
    const cliente = clienteInput.value.trim() || 'Público General';
    const telefono = document.getElementById('pos-cliente-telefono').value.trim();
    const total = prod.precioVenta * qty;
    const costo = (prod.precioCompra || (prod.precioVenta * 0.5)) * qty;

    const ticketNumber = `TICK-${String(state.sales.length + 101).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Descontar inventario
    prod.stock -= qty;

    // Registrar venta
    const newSale = {
      id: `s-${Date.now()}`,
      ticket: ticketNumber,
      fecha: formattedDate,
      cliente: cliente,
      telefono: telefono,
      metodo: metodo,
      total: total,
      costo: costo,
      items: [{ id: prod.id, nombre: prod.nombre, cantidad: qty, precio: prod.precioVenta }],
      estado: metodo === 'Crédito' ? 'A Crédito (Pendiente)' : 'Pagado'
    };

    state.sales.unshift(newSale);

    // Si es a crédito, registrar automáticamente en "Quién me debe"
    if (metodo === 'Crédito') {
      const newDebtor = {
        id: `d-${Date.now()}`,
        cliente: cliente,
        telefono: telefono || 'Sin teléfono',
        concepto: `${qty}x ${prod.nombre} (Ticket #${ticketNumber})`,
        montoOriginal: total,
        totalAbonado: 0,
        saldoPendiente: total,
        fecha: formattedDate.split(' ')[0],
        estado: 'Pendiente',
        abonos: []
      };
      state.debtors.unshift(newDebtor);
      showToast(`Venta a crédito guardada. Se añadió a "¿Quién me debe?"`, 'info');
    } else {
      showToast(`¡Venta #${ticketNumber} registrada exitosamente!`, 'success');
    }

    saveState();
    closeModal('modal-nueva-venta');
    document.getElementById('form-nueva-venta').reset();
    renderAllViews();

    // Preguntar si desea ver/imprimir el ticket
    setTimeout(() => {
      verTicket(newSale.id);
    }, 300);
  });
}

// ========================================================
// 9. VISTA INVENTARIO
// ========================================================
function renderInventoryView() {
  const tbody = document.getElementById('inventory-table-body');
  const searchFilter = document.getElementById('search-product-input').value.toLowerCase();
  const categoryFilter = document.getElementById('filter-product-category').value;
  const onlyLowStock = document.getElementById('filter-only-low-stock').checked;

  // Llenar categorías únicas en el selector de filtro
  const categories = ['todas', ...new Set(state.products.map(p => p.categoria).filter(Boolean))];
  const catSelect = document.getElementById('filter-product-category');
  const currentSelectedCat = catSelect.value;
  catSelect.innerHTML = categories.map(c => `<option value="${c}">${c === 'todas' ? 'Todas las categorías' : c}</option>`).join('');
  catSelect.value = currentSelectedCat || 'todas';

  const filtered = state.products.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchFilter) ||
                        p.codigo.toLowerCase().includes(searchFilter);
    const matchCategory = categoryFilter === 'todas' || p.categoria === categoryFilter;
    const matchLowStock = onlyLowStock ? p.stock <= p.stockMin : true;
    return matchSearch && matchCategory && matchLowStock;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding: 2rem;">No se encontraron productos con los criterios de búsqueda.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const margen = p.precioVenta > 0 ? Math.round(((p.precioVenta - p.precioCompra) / p.precioVenta) * 100) : 0;
    let badgeClass = 'badge-success';
    let estadoTexto = 'Disponible';

    if (p.stock <= 0) {
      badgeClass = 'badge-danger';
      estadoTexto = 'Agotado';
    } else if (p.stock <= p.stockMin) {
      badgeClass = 'badge-warning';
      estadoTexto = 'Stock Bajo';
    }

    return `
      <tr>
        <td><code>${escapeHTML(p.codigo)}</code></td>
        <td>
          <div class="font-medium">${escapeHTML(p.nombre)}</div>
        </td>
        <td><span class="badge badge-accent">${escapeHTML(p.categoria || 'General')}</span></td>
        <td>${formatMoney(p.precioCompra)}</td>
        <td><strong>${formatMoney(p.precioVenta)}</strong></td>
        <td><span class="text-success font-medium">${margen}%</span></td>
        <td>
          <strong style="font-size: 1.05rem;">${p.stock}</strong>
          <small class="text-muted">(Min: ${p.stockMin})</small>
        </td>
        <td><span class="badge ${badgeClass}">${estadoTexto}</span></td>
        <td>
          <div class="stock-adjust-btns">
            <button class="btn-qty" title="Reducir 1 unidad" onclick="adjustProductStock('${p.id}', -1)">-</button>
            <button class="btn-qty" title="Aumentar 1 unidad" onclick="adjustProductStock('${p.id}', 1)">+</button>
          </div>
        </td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editarProducto('${p.id}')">Editar</button>
          <button class="btn btn-sm btn-outline text-danger" onclick="eliminarProducto('${p.id}')" title="Eliminar producto">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');
}

function adjustProductStock(productId, delta) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  const newStock = Math.max(0, prod.stock + delta);
  prod.stock = newStock;
  saveState();
  renderInventoryView();
  updateBadgesAndKPIs();
  showToast(`Stock actualizado para "${prod.nombre}": ${newStock} unidades`, 'info');
}

function editarProducto(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  document.getElementById('modal-prod-title').textContent = '✏️ Editar Producto';
  document.getElementById('prod-id').value = prod.id;
  document.getElementById('prod-codigo').value = prod.codigo;
  document.getElementById('prod-categoria').value = prod.categoria;
  document.getElementById('prod-nombre').value = prod.nombre;
  document.getElementById('prod-precio-compra').value = prod.precioCompra;
  document.getElementById('prod-precio-venta').value = prod.precioVenta;
  document.getElementById('prod-stock').value = prod.stock;
  document.getElementById('prod-stock-min').value = prod.stockMin;

  openModal('modal-producto');
}

function eliminarProducto(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  if (confirm(`¿Estás seguro de eliminar "${prod.nombre}" del inventario?`)) {
    state.products = state.products.filter(p => p.id !== productId);
    saveState();
    renderAllViews();
    showToast('Producto eliminado del inventario', 'info');
  }
}

function setupProductFormEvents() {
  document.getElementById('form-producto').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('prod-id').value;
    const codigo = document.getElementById('prod-codigo').value.trim();
    const categoria = document.getElementById('prod-categoria').value.trim() || 'General';
    const nombre = document.getElementById('prod-nombre').value.trim();
    const precioCompra = parseFloat(document.getElementById('prod-precio-compra').value) || 0;
    const precioVenta = parseFloat(document.getElementById('prod-precio-venta').value) || 0;
    const stock = parseInt(document.getElementById('prod-stock').value) || 0;
    const stockMin = parseInt(document.getElementById('prod-stock-min').value) || 3;

    if (id) {
      // Edición
      const prod = state.products.find(p => p.id === id);
      if (prod) {
        prod.codigo = codigo;
        prod.categoria = categoria;
        prod.nombre = nombre;
        prod.precioCompra = precioCompra;
        prod.precioVenta = precioVenta;
        prod.stock = stock;
        prod.stockMin = stockMin;
        showToast('Producto actualizado correctamente', 'success');
      }
    } else {
      // Nuevo
      const newProduct = {
        id: `p-${Date.now()}`,
        codigo,
        categoria,
        nombre,
        precioCompra,
        precioVenta,
        stock,
        stockMin
      };
      state.products.push(newProduct);
      showToast('¡Producto agregado al inventario con éxito!', 'success');
    }

    saveState();
    closeModal('modal-producto');
    document.getElementById('form-producto').reset();
    document.getElementById('prod-id').value = '';
    renderAllViews();
  });
}

// ========================================================
// 10. VISTA DEUDORES ("¿Quién me debe?")
// ========================================================
function renderDebtorsView() {
  const tbody = document.getElementById('debtors-table-body');
  const searchFilter = document.getElementById('search-debtors-input').value.toLowerCase();
  const statusFilter = document.getElementById('filter-debtor-status').value;

  const filtered = state.debtors.filter(d => {
    const matchSearch = d.cliente.toLowerCase().includes(searchFilter) ||
                        (d.telefono || '').toLowerCase().includes(searchFilter);
    const matchStatus = statusFilter === 'todos' || d.estado === statusFilter;
    return matchSearch && matchStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted" style="padding: 2rem;">No se encontraron registros de deudas.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(d => {
    const isLiquidado = d.estado === 'Liquidado';
    return `
      <tr>
        <td>
          <div class="font-medium">${escapeHTML(d.cliente)}</div>
        </td>
        <td>
          <div>${escapeHTML(d.telefono || 'Sin teléfono')}</div>
          ${d.telefono && d.telefono !== 'Sin teléfono' ? `<a href="https://wa.me/${d.telefono.replace(/\D/g,'')}" target="_blank" class="link-btn text-sm">💬 WhatsApp</a>` : ''}
        </td>
        <td><small class="text-muted">${escapeHTML(d.concepto)}</small></td>
        <td>${d.fecha}</td>
        <td><strong>${formatMoney(d.montoOriginal)}</strong></td>
        <td class="text-success">${formatMoney(d.totalAbonado)}</td>
        <td>
          <strong class="${isLiquidado ? 'text-success' : 'text-danger'}" style="font-size: 1.05rem;">
            ${formatMoney(d.saldoPendiente)}
          </strong>
        </td>
        <td>
          <span class="badge ${isLiquidado ? 'badge-success' : 'badge-danger'}">
            ${isLiquidado ? 'Liquidado ✓' : 'Pendiente'}
          </span>
        </td>
        <td>
          ${!isLiquidado ? `
            <button class="btn btn-sm btn-primary" onclick="abrirModalAbono('${d.id}')">
              💰 Abonar
            </button>
          ` : `
            <span class="text-sm text-muted">Completado</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function abrirModalAbono(debtorId) {
  const debtor = state.debtors.find(d => d.id === debtorId);
  if (!debtor) return;

  document.getElementById('abono-deuda-id').value = debtor.id;
  document.getElementById('abono-cliente-nombre').textContent = debtor.cliente;
  document.getElementById('abono-saldo-badge').textContent = `Saldo pendiente: ${formatMoney(debtor.saldoPendiente)}`;
  document.getElementById('abono-concepto-desc').textContent = `Compra: ${debtor.concepto}`;
  
  const montoInput = document.getElementById('abono-monto');
  montoInput.value = '';
  montoInput.max = debtor.saldoPendiente;
  montoInput.placeholder = `Hasta ${formatMoney(debtor.saldoPendiente)}`;

  openModal('modal-abono');
}

function setupDebtorFormEvents() {
  // Formulario de Abono
  document.getElementById('form-abono').addEventListener('submit', (e) => {
    e.preventDefault();

    const debtorId = document.getElementById('abono-deuda-id').value;
    const monto = parseFloat(document.getElementById('abono-monto').value) || 0;
    const metodo = document.getElementById('abono-metodo').value;

    const debtor = state.debtors.find(d => d.id === debtorId);
    if (!debtor) return;

    if (monto <= 0) {
      showToast('Ingresa un monto válido mayor a 0', 'error');
      return;
    }

    if (monto > debtor.saldoPendiente) {
      showToast(`El monto no puede superar el saldo pendiente (${formatMoney(debtor.saldoPendiente)})`, 'error');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    debtor.totalAbonado += monto;
    debtor.saldoPendiente -= monto;
    if (!debtor.abonos) debtor.abonos = [];
    debtor.abonos.push({ fecha: dateStr, monto, metodo });

    if (debtor.saldoPendiente <= 0) {
      debtor.saldoPendiente = 0;
      debtor.estado = 'Liquidado';
      showToast(`🎉 ¡La deuda de ${debtor.cliente} ha sido liquidada en su totalidad!`, 'success');
    } else {
      showToast(`Abono de ${formatMoney(monto)} registrado. Saldo restante: ${formatMoney(debtor.saldoPendiente)}`, 'success');
    }

    saveState();
    closeModal('modal-abono');
    renderAllViews();
  });

  // Formulario de Nueva Deuda Directa
  document.getElementById('form-nueva-deuda').addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = document.getElementById('deuda-cliente').value.trim();
    const telefono = document.getElementById('deuda-telefono').value.trim();
    const concepto = document.getElementById('deuda-concepto').value.trim();
    const total = parseFloat(document.getElementById('deuda-total').value) || 0;
    const abonoInicial = parseFloat(document.getElementById('deuda-abono-inicial').value) || 0;

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const newDebtor = {
      id: `d-${Date.now()}`,
      cliente,
      telefono: telefono || 'Sin teléfono',
      concepto,
      montoOriginal: total,
      totalAbonado: abonoInicial,
      saldoPendiente: Math.max(0, total - abonoInicial),
      fecha: dateStr,
      estado: (total - abonoInicial <= 0) ? 'Liquidado' : 'Pendiente',
      abonos: abonoInicial > 0 ? [{ fecha: dateStr, monto: abonoInicial, metodo: 'Efectivo' }] : []
    };

    state.debtors.unshift(newDebtor);
    saveState();
    closeModal('modal-nueva-deuda');
    document.getElementById('form-nueva-deuda').reset();
    renderAllViews();
    showToast(`Cuenta por cobrar registrada para ${cliente}`, 'success');
  });
}

// ========================================================
// 11. VISTA REPORTES ("¿Cuánto vendo en el mes?")
// ========================================================
function renderReportsView() {
  const totalFacturado = state.sales.reduce((acc, s) => acc + s.total, 0);
  const totalCosto = state.sales.reduce((acc, s) => acc + (s.costo || (s.total * 0.5)), 0);
  const gananciaNeta = totalFacturado - totalCosto;

  document.getElementById('rep-total-ventas').textContent = formatMoney(totalFacturado);
  document.getElementById('rep-costo-mercancia').textContent = formatMoney(totalCosto);
  document.getElementById('rep-ganancia-neta').textContent = formatMoney(gananciaNeta);

  // Top productos vendidos
  const productSalesMap = {};
  state.sales.forEach(s => {
    if (s.items) {
      s.items.forEach(item => {
        if (!productSalesMap[item.nombre]) {
          productSalesMap[item.nombre] = { qty: 0, total: 0 };
        }
        productSalesMap[item.nombre].qty += item.cantidad;
        productSalesMap[item.nombre].total += (item.precio * item.cantidad);
      });
    }
  });

  const sortedProducts = Object.entries(productSalesMap).sort((a, b) => b[1].qty - a[1].qty);
  const topProductsContainer = document.getElementById('rep-top-products');

  if (sortedProducts.length === 0) {
    topProductsContainer.innerHTML = `<p class="text-muted text-sm">Aún no hay productos con ventas registradas.</p>`;
  } else {
    topProductsContainer.innerHTML = sortedProducts.slice(0, 5).map(([name, data], idx) => `
      <div class="top-product-row">
        <div>
          <strong>#${idx + 1} ${escapeHTML(name)}</strong>
          <div class="text-sm text-muted">${data.qty} unidad(es) vendidas</div>
        </div>
        <div class="text-right">
          <strong class="text-primary">${formatMoney(data.total)}</strong>
        </div>
      </div>
    `).join('');
  }

  // Desglose por método de pago
  const paymentMethodsMap = {
    'Efectivo': 0,
    'Transferencia': 0,
    'Tarjeta': 0,
    'Crédito': 0
  };

  state.sales.forEach(s => {
    paymentMethodsMap[s.metodo] = (paymentMethodsMap[s.metodo] || 0) + s.total;
  });

  const pmContainer = document.getElementById('rep-payment-methods');
  pmContainer.innerHTML = Object.entries(paymentMethodsMap).map(([method, amount]) => {
    const percentage = totalFacturado > 0 ? Math.round((amount / totalFacturado) * 100) : 0;
    return `
      <div class="payment-method-progress">
        <div class="pm-label">
          <span>${method}</span>
          <span>${formatMoney(amount)} (${percentage}%)</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================================
// 12. SISTEMA DE TOAST NOTIFICACIONES
// ========================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  toast.innerHTML = `<span>${iconMap[type] || 'ℹ️'}</span><span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Utilidad para prevenir inyecciones XSS en el HTML dinámico
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ========================================================
// 13. CONFIGURACIÓN DEL TEMA (LIGHT / DARK MODE)
// ========================================================
function setupThemeToggle() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const iconMoon = document.getElementById('theme-icon-moon');
  const iconSun = document.getElementById('theme-icon-sun');

  const savedTheme = localStorage.getItem('cp_theme') || 'light';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('cp_theme', nextTheme);
    if (state.currentView === 'dashboard') {
      drawSalesChart();
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      iconMoon.classList.add('hidden');
      iconSun.classList.remove('hidden');
      themeLabel.textContent = 'Modo Claro';
    } else {
      iconMoon.classList.remove('hidden');
      iconSun.classList.add('hidden');
      themeLabel.textContent = 'Modo Oscuro';
    }
  }
}

// ========================================================
// 14. INICIALIZACIÓN GENERAL & EVENT LISTENERS
// ========================================================
function renderAllViews() {
  updateBadgesAndKPIs();
  renderSalesView();
  renderInventoryView();
  renderDebtorsView();
  renderReportsView();
  populateSaleProductSelect();
}

document.addEventListener('DOMContentLoaded', () => {
  // Configurar modales nativos
  document.querySelectorAll('dialog.custom-modal').forEach(setupModalLightDismiss);

  // Botones de cierre de modal
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.dataset.closeModal);
    });
  });

  // Navegación Sidebar
  document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.dataset.view);
    });
  });

  // Enlaces directos dentro de tarjetas ("data-go")
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.go);
    });
  });

  // Botones para abrir modales
  const btnTopVenta = document.getElementById('btn-top-nueva-venta');
  const btnDashVenta = document.getElementById('btn-dash-nueva-venta');
  const btnAbrirVenta = document.getElementById('btn-abrir-modal-venta');

  [btnTopVenta, btnDashVenta, btnAbrirVenta].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        populateSaleProductSelect();
        openModal('modal-nueva-venta');
      });
    }
  });

  const btnTopProd = document.getElementById('btn-top-nuevo-producto');
  const btnAbrirProd = document.getElementById('btn-abrir-modal-producto');
  [btnTopProd, btnAbrirProd].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById('modal-prod-title').textContent = '📦 Agregar Nuevo Producto';
        document.getElementById('form-producto').reset();
        document.getElementById('prod-id').value = '';
        openModal('modal-producto');
      });
    }
  });

  document.getElementById('btn-nueva-deuda-directa').addEventListener('click', () => {
    openModal('modal-nueva-deuda');
  });

  // Botón Reiniciar Demo
  document.getElementById('btn-reset-demo').addEventListener('click', resetToDemoData);

  // Menú móvil
  const btnOpenSidebar = document.getElementById('btn-open-sidebar');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sidebar = document.getElementById('sidebar');

  if (btnOpenSidebar) {
    btnOpenSidebar.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarBackdrop.classList.add('active');
    });
  }

  if (btnCloseSidebar) {
    btnCloseSidebar.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('active');
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('active');
    });
  }

  // Filtros dinámicos en tiempo real
  document.getElementById('search-sales-input').addEventListener('input', renderSalesView);
  document.getElementById('filter-sales-method').addEventListener('change', renderSalesView);

  document.getElementById('search-product-input').addEventListener('input', renderInventoryView);
  document.getElementById('filter-product-category').addEventListener('change', renderInventoryView);
  document.getElementById('filter-only-low-stock').addEventListener('change', renderInventoryView);

  document.getElementById('search-debtors-input').addEventListener('input', renderDebtorsView);
  document.getElementById('filter-debtor-status').addEventListener('change', renderDebtorsView);

  // Configurar formularios
  setupSaleFormEvents();
  setupProductFormEvents();
  setupDebtorFormEvents();
  setupThemeToggle();

  // Imprimir reporte
  document.getElementById('btn-imprimir-reporte').addEventListener('click', () => {
    window.print();
  });

  // Render inicial
  renderAllViews();
  drawSalesChart();
});
