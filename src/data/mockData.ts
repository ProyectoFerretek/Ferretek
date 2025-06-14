import {
    Producto,
    Cliente,
    Venta,
    EstadisticaVenta,
    Categoria,
    Notificacion,
    Usuario,
    UsuarioFirebase,
} from "../types";

import { dbFirestore } from "../lib/firebase/Firebase";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
	getCountFromServer,
} from "firebase/firestore";

// Categorías de productos
export const categorias: Categoria[] = [
    { id: "1", nombre: "Herramientas", icono: "tool", cantidad: 48 },
    { id: "2", nombre: "Pinturas", icono: "paintbrush", cantidad: 32 },
    { id: "3", nombre: "Electricidad", icono: "zap", cantidad: 56 },
    { id: "4", nombre: "Plomería", icono: "droplets", cantidad: 37 },
    { id: "5", nombre: "Materiales", icono: "box", cantidad: 29 },
    { id: "6", nombre: "Jardín", icono: "flower", cantidad: 18 },
];

// Productos destacados
export const productos: Producto[] = [
    {
        id: "1",
        nombre: "Taladro Inalámbrico 18V",
        descripcion:
            "Taladro recargable con batería de larga duración y maletín",
        precio: 59990,
        categoria: "1",
        stock: 0,
        imagen: "src/assets/images/Taladro.webp",
        destacado: true,
    },
    {
        id: "2",
        nombre: "Set de Destornilladores (10 pcs)",
        descripcion: "Juego de destornilladores precisión diferentes tamaños",
        precio: 12990,
        categoria: "1",
        stock: 23,
        imagen: "src/assets/images/Taladro.webp",
        destacado: true,
    },
    {
        id: "3",
        nombre: "Pintura Látex Blanco 1GL",
        descripcion: "Pintura lavable de alta cobertura para interiores",
        precio: 18990,
        categoria: "2",
        stock: 42,
        imagen: "src/assets/images/Taladro.webp",
        destacado: false,
    },
    {
        id: "4",
        nombre: 'Sierra Circular 7 1/4"',
        descripcion: "Sierra eléctrica para cortes precisos en madera",
        precio: 49990,
        categoria: "1",
        stock: 8,
        imagen: "src/assets/images/Taladro.webp",
        destacado: true,
    },
    {
        id: "5",
        nombre: "Cable Eléctrico 12AWG (10m)",
        descripcion: "Cable flexible para instalaciones domésticas",
        precio: 8990,
        categoria: "3",
        stock: 2,
        imagen: "src/assets/images/Taladro.webp",
        destacado: false,
    },
    {
        id: "6",
        nombre: 'Llave Ajustable 10"',
        descripcion: "Llave de alta resistencia para múltiples usos",
        precio: 7990,
        categoria: "1",
        stock: 19,
        imagen: "src/assets/images/Taladro.webp",
        destacado: false,
    },
    {
        id: "7",
        nombre: "Manguera de Jardín 15m",
        descripcion: "Manguera reforzada con conectores incluidos",
        precio: 15990,
        categoria: "6",
        stock: 12,
        imagen: "src/assets/images/Taladro.webp",
        destacado: true,
    },
    {
        id: "8",
        nombre: "Cemento 25kg",
        descripcion: "Cemento de alta resistencia para obras",
        precio: 6990,
        categoria: "5",
        stock: 34,
        imagen: "src/assets/images/Taladro.webp",
        destacado: false,
    },
];

// Clientes recientes
export const clientes: Cliente[] = [
    {
        id: "1",
        nombre: "Juan Pérez",
        email: "juan.perez@gmail.com",
        telefono: "+56 9 1234 5678",
        direccion: "Av. Providencia 1234, Santiago",
        compras: 8,
        ultimaCompra: "2025-04-15",
    },
    {
        id: "2",
        nombre: "María González",
        email: "maria.gon@outlook.com",
        telefono: "+56 9 8765 4321",
        direccion: "Los Leones 567, Providencia",
        compras: 12,
        ultimaCompra: "2025-04-18",
    },
    {
        id: "3",
        nombre: "Carlos Rodríguez",
        email: "crodriguez@empresa.cl",
        telefono: "+56 9 5555 7777",
        direccion: "Av. Las Condes 789, Las Condes",
        compras: 5,
        ultimaCompra: "2025-04-10",
    },
    {
        id: "4",
        nombre: "Ana Silva",
        email: "ana.silva@gmail.com",
        telefono: "+56 9 3333 2222",
        direccion: "Irarrázaval 890, Ñuñoa",
        compras: 3,
        ultimaCompra: "2025-04-16",
    },
];

// Ventas recientes
export const ventas: Venta[] = [
    {
        id: "1",
        fecha: "2025-04-19T14:35:00",
        cliente: "1",
        productos: [
            { id: "1", cantidad: 1, precioUnitario: 59990 },
            { id: "5", cantidad: 2, precioUnitario: 8990 },
        ],
        total: 77970,
        metodoPago: "Tarjeta de crédito",
        estado: "completada",
    },
    {
        id: "2",
        fecha: "2025-04-18T10:15:00",
        cliente: "2",
        productos: [
            { id: "3", cantidad: 3, precioUnitario: 18990 },
            { id: "8", cantidad: 5, precioUnitario: 6990 },
        ],
        total: 91920,
        metodoPago: "Efectivo",
        estado: "completada",
    },
    {
        id: "3",
        fecha: "2025-04-18T16:20:00",
        cliente: "4",
        productos: [
            { id: "7", cantidad: 1, precioUnitario: 15990 },
            { id: "2", cantidad: 1, precioUnitario: 12990 },
        ],
        total: 28980,
        metodoPago: "Tarjeta de débito",
        estado: "completada",
    },
    {
        id: "4",
        fecha: "2025-04-19T09:45:00",
        cliente: "3",
        productos: [{ id: "4", cantidad: 1, precioUnitario: 49990 }],
        total: 49990,
        metodoPago: "Transferencia",
        estado: "pendiente",
    },
];

// Estadísticas de ventas últimos 7 días
export const estadisticasVentas: EstadisticaVenta[] = [
    { fecha: "2025-04-13", ventas: 245000 },
    { fecha: "2025-04-14", ventas: 312000 },
    { fecha: "2025-04-15", ventas: 287000 },
    { fecha: "2025-04-16", ventas: 356000 },
    { fecha: "2025-04-17", ventas: 298000 },
    { fecha: "2025-04-18", ventas: 421000 },
    { fecha: "2025-04-19", ventas: 352000 },
];

// Notificaciones
export const notificaciones: Notificacion[] = [
    {
        id: "1",
        mensaje: "Stock bajo de Taladro Inalámbrico 18V (5 unidades)",
        tipo: "alerta",
        fecha: "2025-04-19T08:30:00",
        leida: false,
    },
    {
        id: "2",
        mensaje: "Nueva orden #4 pendiente de entrega",
        tipo: "info",
        fecha: "2025-04-19T09:45:00",
        leida: false,
    },
    {
        id: "3",
        mensaje: "Actualización de precios completada",
        tipo: "info",
        fecha: "2025-04-18T17:15:00",
        leida: true,
    },
    {
        id: "4",
        mensaje: "Error al procesar pago de orden #5",
        tipo: "error",
        fecha: "2025-04-19T11:20:00",
        leida: false,
    },
];

// Usuarios del sistema
// export const usuarios: Usuario[] = [
//   {
//     id: '1',
//     nombre: 'Administrador Principal',
//     email: 'admin@ferremarket.com',
//     rol: 'admin',
//     estado: 'activo',
//     fechaCreacion: '2024-01-15T10:00:00',
//     ultimaModificacion: '2025-04-19T14:30:00',
//     ultimoAcceso: '2025-04-19T15:45:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   },
//   {
//     id: '2',
//     nombre: 'Carlos Mendoza',
//     email: 'carlos.mendoza@ferremarket.com',
//     rol: 'admin',
//     estado: 'activo',
//     fechaCreacion: '2024-02-20T09:15:00',x
//     ultimaModificacion: '2025-04-18T16:20:00',
//     ultimoAcceso: '2025-04-19T08:30:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   },
//   {
//     id: '3',
//     nombre: 'Ana Rodríguez',
//     email: 'ana.rodriguez@ferremarket.com',
//     rol: 'usuario',
//     estado: 'activo',
//     fechaCreacion: '2024-03-10T11:30:00',
//     ultimaModificacion: '2025-04-17T10:45:00',
//     ultimoAcceso: '2025-04-19T12:15:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   },
//   {
//     id: '4',
//     nombre: 'Luis García',
//     email: 'luis.garcia@ferremarket.com',
//     rol: 'usuario',
//     estado: 'activo',
//     fechaCreacion: '2024-04-05T14:20:00',
//     ultimaModificacion: '2025-04-16T09:30:00',
//     ultimoAcceso: '2025-04-18T17:20:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   },
//   {
//     id: '5',
//     nombre: 'María Fernández',
//     email: 'maria.fernandez@ferremarket.com',
//     rol: 'usuario',
//     estado: 'inactivo',
//     fechaCreacion: '2024-01-30T16:45:00',
//     ultimaModificacion: '2025-04-10T11:15:00',
//     ultimoAcceso: '2025-04-10T11:15:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   },
//   {
//     id: '6',
//     nombre: 'Roberto Silva',
//     email: 'roberto.silva@ferremarket.com',
//     rol: 'usuario',
//     estado: 'activo',
//     fechaCreacion: '2024-05-12T13:10:00',
//     ultimaModificacion: '2025-04-19T08:45:00',
//     ultimoAcceso: '2025-04-19T14:20:00',
//     avatar: 'src/assets/images/Taladro.webp'
//   }
// ];

// export const usuarios: Usuario[] = [];

//   {
//     id: '6',
//     nombre: 'Llave Ajustable 10"',
//     descripcion: 'Llave de alta resistencia para múltiples usos',
//     precio: 7990,
//     categoria: '1',
//     stock: 19,
//     imagen: 'src/assets/images/Taladro.webp',
//     destacado: false
//   },

// DASHBOARD

export const calcularValorInventario = async () => {
    var totalValor = 0;
    const productosCollection = collection(dbFirestore, "productos");
    const productosSnapshot = await getDocs(productosCollection);
    productosSnapshot.forEach((doc) => {
        const productoData = doc.data() as Producto;
        const valorProducto = productoData.precio * (productoData.stock || 0);
        totalValor += valorProducto;
    });
    return totalValor;
};

export const calcularStockTotal = async () => {
    var totalProductos = 0;
    const productosCollection = collection(dbFirestore, "productos");
    const productosSnapshot = await getDocs(productosCollection);
    productosSnapshot.forEach((doc) => {
        const productoData = doc.data() as Producto;
        totalProductos += productoData.stock || 0;
    });
    return totalProductos;
};

// export const calcularProductosPorCategoria = async (categoriaId: string) => {
// 	const productosCollection = collection(dbFirestore, "productos");
// 	const q = query(productosCollection, where("categoria", "==", categoriaId));
// 	const productosSnapshot = await getDocs(q);
	
// 	return productosSnapshot.size;
// };

export const calcularProductosPorCategoria = async (categoriaId: string): Promise<number> => {
	// Input validation
	if (!categoriaId || typeof categoriaId !== 'string' || categoriaId.trim() === '') {
		throw new Error('categoriaId must be a non-empty string');
	}

	try {
		const productosCollection = collection(dbFirestore, "productos");
		const q = query(productosCollection, where("categoria", "==", categoriaId.trim()));
		
		// Use getCountFromServer for better performance - only gets count, not all documents
		const snapshot = await getCountFromServer(q);
		
		return snapshot.data().count;
	} catch (error) {
		console.error(`Error calculating products for category ${categoriaId}:`, error);
		throw new Error(`Failed to calculate products for category: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
};

export const agregarProducto = async (producto: Producto) => {
    const productosCollection = collection(dbFirestore, "productos");
    const docRef = await addDoc(productosCollection, {
        sku: producto.sku,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        imagen: producto.imagen,
        destacado: producto.destacado,
    });

    console.log("Producto agregado con ID:", docRef.id);
};

export const actualizarProducto = async (id: string, producto: Producto) => {
    const productoDoc = doc(dbFirestore, "productos", id);
    await updateDoc(productoDoc, {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        imagen: producto.imagen,
        destacado: producto.destacado,
    });
};

export const eliminarProducto = async (id: string) => {
    const productoDoc = doc(dbFirestore, "productos", id);
    await deleteDoc(productoDoc);
};

export const obtenerProductos = async (): Promise<Producto[]> => {
    const productosCollection = collection(dbFirestore, "productos");
    const productosSnapshot = await getDocs(productosCollection);
    const productosList: Producto[] = [];

    productosSnapshot.forEach((doc) => {
        const productoData = doc.data() as Producto;
        productosList.push({
            id: doc.id,
            sku: productoData.sku,
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            precio: productoData.precio,
            categoria: productoData.categoria,
            stock: productoData.stock,
            imagen: productoData.imagen || "src/assets/images/Taladro.webp",
            destacado: productoData.destacado || false,
        });
    });

    return productosList;
};

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
    const usuariosCollection = collection(dbFirestore, "usuarios");
    const usuariosSnapshot = await getDocs(usuariosCollection);

    const usuariosList: Usuario[] = [];
    usuariosSnapshot.forEach((doc) => {
        const usuarioData = doc.data() as Usuario;
        usuariosList.push({
            id: doc.id,
            uid: usuarioData.uid,
            nombre: usuarioData.nombre,
            email: usuarioData.email,
            rol: usuarioData.rol,
            estado: usuarioData.estado,
            fechaCreacion: usuarioData.fechaCreacion,
            ultimaModificacion: usuarioData.ultimaModificacion,
            ultimoAcceso: usuarioData.ultimoAcceso,
            avatar: usuarioData.avatar || "src/assets/images/Taladro.webp",
        });
    });

    return usuariosList;
};

export const obtenerUsuarioPorId = async (
    id: string
): Promise<Usuario | null> => {
    const usuarioDoc = doc(dbFirestore, "usuarios", id);
    const usuarioSnapshot = await getDoc(usuarioDoc);

    if (usuarioSnapshot.exists()) {
        const usuarioData = usuarioSnapshot.data() as Usuario;
        return usuarioData;
    }
    return null;
};

export const agregarUsuario = async (usuario: UsuarioFirebase) => {
    const usuariosCollection = collection(dbFirestore, "usuarios");
    await addDoc(usuariosCollection, {
        uid: usuario.uid,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
        fechaCreacion: usuario.fechaCreacion,
        ultimaModificacion: usuario.ultimaModificacion,
        ultimoAcceso: usuario.ultimoAcceso,
        avatar: usuario.avatar || "src/assets/images/Taladro.webp",
    });
};

export const eliminarUsuario = async (id: string) => {
    const usuarioDoc = doc(dbFirestore, "usuarios", id);
    await deleteDoc(usuarioDoc);
};
