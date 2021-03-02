
db.almacen.drop()
db.almacen.insertMany([
    {codigo: "01", nombre:'Ordenadores', precio: 100, coste: 50, cantidadAlmacen: 1900, fabricacionmanual: false},
    {codigo: "02", nombre:'Portatiles', precio: 200, coste: 60, cantidadAlmacen: 2210,fabricacionmanual: true},
    {codigo: "03", nombre:'Movil', precio: 80, coste: 40, cantidadAlmacen: 2050,fabricacionmanual: false},
    {codigo: "04", nombre:'Tablet', precio: 85, coste: 50, cantidadAlmacen: 3200, fabricacionmanual: false}
])

db.ventas.drop()
db.ventas.insertMany([
    {codigo: '001', fecha: new Date("2019-12-20"), 
    cliente: "Mediamark", detalle: {codigo: "04", cantidad:200}},
    {codigo: '002', fecha: new Date("2019-12-30"), 
    cliente: "Mediamark", detalle: {codigo: "03", cantidad:100}},
    {codigo: '004', fecha: new Date("2019-12-31"), 
    cliente: "ElCorteIngles", detalle: {codigo: "01", cantidad:300}},
    {codigo: '005', fecha: new Date("2020-01-02"), 
    cliente: "ElCorteIngles", detalle: {codigo: "02", cantidad:500}},
    {codigo: '006', fecha: new Date("2020-01-05"), 
    cliente: "Mediamark", detalle: {codigo: "04", cantidad:200}},
    {codigo: '007', fecha: new Date("2020-01-10"), 
    cliente: "Mediamark", detalle: {codigo: "02", cantidad:300}},
    {codigo: '008', fecha: new Date("2020-01-22"), 
    cliente: "ElCorteIngles", detalle: {codigo: "04", cantidad:200}},
    {codigo: '009', fecha: new Date("2020-02-22"), 
    cliente: "Worten", detalle: {codigo: "03", cantidad:500}},
    {codigo: '010', fecha: new Date("2020-03-02"), 
    cliente: "Fnac", detalle: {codigo: "04", cantidad:100}},
    {codigo: '011', fecha: new Date("2020-03-02"), 
    cliente: "Mediamark", detalle: {codigo: "01", cantidad:200}},
    {codigo: '012', fecha: new Date("2020-02-22"), 
    cliente: "ElCorteIngles", detalle: {codigo: "02", cantidad:250}},
    {codigo: '013', fecha: new Date("2021-01-22"), 
    cliente: "Fnac", detalle: {codigo: "03", cantidad:100}},
    {codigo: '014', fecha: new Date("2021-01-22"), 
    cliente: "Worten", detalle: {codigo: "03", cantidad:20}},
    {codigo: '015', fecha: new Date("2021-01-22"), 
    cliente: "Fnac", detalle: {codigo: "04", cantidad:200}},
    {codigo: '016', fecha: new Date("2021-01-30"), 
    cliente: "Worten", detalle: {codigo: "02", cantidad:50}},
]) 