// Detalles de las ventas, y mostrar también el precio del artículo y el de las compras.
db.ventas.aggregate(
    [
        {
            $lookup: {
                from: "almacen",
                localField: "detalle.codigo",
                foreignField: "codigo",
                as: "productos"
            }
        },
        {
            $set: {
                producto: {$arrayElemAt: ["$productos", 0]}
            }
        },
        {
            $project: {
                _id:0,
                codigoCompra: "$codigo",
                dia: {$dayOfMonth: "$fecha"},
                mes: { $month: "$fecha" },
                ano: { $year: "$fecha" },
                cliente: 1,
                codigoProducto: "$detalle.codigo",
                Producto: "$producto.nombre",
                cantidadComprada: "$detalle.cantidad",
                precioProducto: "$producto.precio",
                totalCompra: {$multiply: ["$detalle.cantidad", "$producto.precio"]}
            }
        }
    ]
).pretty()

//Beneficio de venta le ha sacado la empresa de electrónica en las ventas.
db.ventas.aggregate(
    [
        {
            $unwind: "$detalle"
        },
        {
            $lookup: {
                from: "almacen",
                localField: "detalle.codigo",
                foreignField: "codigo",
                as: "productos"
            }
        },
        {
            $set: {
                producto: {$arrayElemAt: ["$productos", 0]}
            }
        },
        {
            $project: {
                _id:0,
                codigoCompra: "$codigo",
                dia: {$dayOfMonth: "$fecha"},
                mes: { $month: "$fecha" },
                ano: { $year: "$fecha" },
                cliente: 1,
                Producto: "$producto.nombre",
                cantidadComprada: "$detalle.cantidad",
                precioProducto: "$producto.precio",
                precioFabricacion: "$producto.coste",
                BeneficioIndividual: { $subtract: [ "$producto.precio", "$producto.coste"  ] },
                BeneficioTotalCompra: {
                    $multiply: [ {
                     $subtract: [ "$producto.precio", "$producto.coste" ] } , "$detalle.cantidad"]
                    }
            }
        }
    ]
).pretty()


// Sacar los datos de ventas de fecha despues de 2019 y con el precio total de Compra superior a 50000. Mostrar datos generales de la venta y el total.
db.ventas.aggregate(
    [
        { $match:  { fecha: { $gt: new Date("2019-12-31") } }},
{
    $unwind: "$detalle"
},

{
    $lookup: {
        from: "almacen",
        localField: "detalle.codigo",
        foreignField: "codigo",
        as: "productos"
    }
},
{
    $set: {
        producto: {$arrayElemAt: ["$productos", 0]}
    }
},
{
    $group: {
        _id: {
            codigoCompra: "$codigo",
            dia: { $dayOfMonth: "$fecha" },
            mes: { $month: "$fecha" },
            ano: { $year: "$fecha" },
            Tienda: "$cliente"
        },
        Compra: {
            $push: {
                codigo: "$detalle.codigo", 
                producto: "$producto.nombre",
                cantidad: "$detalle.cantidad",
                precio: "$producto.precio",
                PrecioTotal: {$multiply: ["$detalle.cantidad", "$producto.precio"]},
            }       
        }
    
    }
},
{
        $match: {
        "Compra.PrecioTotal": { 
            $gt: 50000 
        }
    }}
]).pretty()


//Calcular el Iva de las Ventas de 2021
db.ventas.aggregate(
    [
        { $match:  { fecha: { $gt: new Date("2020-12-31") } }},
{
    $unwind: "$detalle"
},

{
    $lookup: {
        from: "almacen",
        localField: "detalle.codigo",
        foreignField: "codigo",
        as: "productos"
    }
},
{
    $set: {
        producto: {$arrayElemAt: ["$productos", 0]}
    }
},
{
    $group: {
        _id: {
            codigoCompra: "$codigo",
            dia: { $dayOfMonth: "$fecha" },
            mes: { $month: "$fecha" },
            ano: { $year: "$fecha" },
            Tienda: "$cliente"
        },
        Compra: {
            $push: {
                codigo: "$detalle.codigo", 
                producto: "$producto.nombre",
                cantidad: "$detalle.cantidad",
                precio: "$producto.precio",
                PrecioTotal: {$multiply: ["$detalle.cantidad", "$producto.precio"]},
                IVA: {
                    $multiply: [ {
                     $multiply: [ "$producto.precio", "$producto.coste" ] } , 0.12]
                    }
            }       
        }
    
    }
},

]).pretty()
