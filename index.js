const { readdirSync, rmSync, renameSync, mkdirSync } = require("fs");
const { join } = require("path");

const puppeteer = require("puppeteer");

// const { codigosCasas, codigosTerrenos } = require("./propiedades");

// const codigosCasas = ["LR3", "LR4", "C46", "C47", "C48", "LR5", "ED4", "C49"];
const codigosTerrenos = ["T56", "T57", "T58"];

// Listar todas las carpetas en la carpeta: carpetas-de-archivos

// console.log("Listar todas las carpetas en la carpeta: carpetas-de-archivos");

// const carpets = readdirSync(join(__dirname, "pdfs"));
// const carpets = readdirSync(join(__dirname, "carpetas-de-archivos"));

// Para cada carpeta, ver los archivos
// carpets.forEach((carpet) => {
//   console.log(`Archivos en la carpeta: ${carpet}`);
//   const files = readdirSync(join(__dirname, "carpetas-de-archivos", carpet));
//   const onlyJpegFiles = files.filter((file) => file.endsWith(".jpeg"));

//   // Eliminar los archivos que no sean .jpeg o .txt y si es carpeta, también eliminar
//   files.forEach((file) => {
//     const archivoesTXT = file.endsWith(".txt");
//     if (!onlyJpegFiles.includes(file) && !archivoesTXT) {
//       console.log(`Eliminar archivo: ${carpet}/${file}`);
//       rmSync(join(__dirname, "carpetas-de-archivos", carpet, file));
//     }
//   });
// });

// Para cada carpeta, ver los archivos
// carpets.forEach((carpet) => {
//   console.log(`Archivos en la carpeta: ${carpet}`);
//   const files = readdirSync(join(__dirname, "carpetas-de-archivos", carpet));
//   const extensionesAFiltrar = [".jpeg", ".jpg", ".png", ".HEIC"];
//   const onlyJpegFiles = files.filter((file) => {
//     return extensionesAFiltrar.some((extension) => file.endsWith(extension));
//   });

//   //   A todos los archivos .jpeg, renombrar con el número de index + 1
//   onlyJpegFiles.forEach((file, index) => {
//     const newFileName = `${index + 1}.jpeg`;
//     console.log(
//       `Renombrar archivo: ${carpet}/${file} a ${carpet}/${newFileName}`
//     );
//     renameSync(
//       join(__dirname, "carpetas-de-archivos", carpet, file),
//       join(__dirname, "carpetas-de-archivos", carpet, newFileName)
//     );
//   });
// });

// const dominio = "https://aloha-documents.netlify.app";
const dominio = "http://localhost:4321";

const RUTA_CASAS = `${dominio}/casas/`;
const RUTA_TERRENOS = `${dominio}/terrenos/`;

// Hacer fetch a cada codigo de casa, realizar una impresion como pdf y guardar el pdf en una carpeta
// codigosCasas.forEach(async (codigo) => {
//   // Iniciar el browser de puppeteer
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`${RUTA_CASAS}${codigo}`);
//   // Crear una carpeta con el nombre del codigo
//   // mkdirSync(join(__dirname, "pdfs", codigo));
//   // Imprimir la pagina como pdf

//   const rutaPdf = join(__dirname, "pdfs", `${codigo}.pdf`);

//   await page.pdf({
//     path: rutaPdf,
//     format: "LETTER",
//     printBackground: true,
//     margin: { top: "40px", left: "40px", right: "40px" },
//     timeout: 0,
//   });

//   console.log(`Se ha creado el archivo: ${rutaPdf}`);

//   // Crear un archivo pdf con el nombre del codigo
//   await browser.close();
// });

const arrayDeArrayCodigosDeTerrenos20En20 = codigosTerrenos.reduce(
  (acc, codigo, index) => {
    const indexArray = Math.floor(index / 10);
    if (!acc[indexArray]) {
      acc[indexArray] = [];
    }
    acc[indexArray].push(codigo);
    return acc;
  },
  []
);

// Hacer fetch a cada codigo de casa, realizar una impresion como pdf y guardar el pdf en una carpeta
arrayDeArrayCodigosDeTerrenos20En20.forEach(async (codigos) => {
  codigos.forEach(async (codigo) => {
    // Iniciar el browser de puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${RUTA_TERRENOS}${codigo}`, {
      timeout: 0,
    });
    // Crear una carpeta con el nombre del codigo
    // mkdirSync(join(__dirname, "pdfs", codigo));
    // Imprimir la pagina como pdf

    const rutaPdf = join(__dirname, "pdfs", `${codigo}.pdf`);

    await page.pdf({
      path: rutaPdf,
      format: "LETTER",
      printBackground: true,
      margin: { top: "40px", left: "40px", right: "40px" },
      timeout: 0,
    });
    console.log(`Se ha creado el archivo: ${rutaPdf}`);

    // Crear un archivo pdf con el nombre del codigo
    await browser.close();
  });
  console.log("Se han creado los pdfs de 20 terrenos");
});

// Para cada carpeta, copiar el pdf a la carpeta anterior
// carpets.forEach((carpet) => {
//   const files = readdirSync(join(__dirname, "pdfs", carpet));
//   files.forEach((file) => {
//     const rutaOrigen = join(__dirname, "pdfs", carpet, file);
//     const rutaDestino = join(__dirname, "pdfs", file);
//     renameSync(rutaOrigen, rutaDestino);
//   });
//   rmSync(join(__dirname, "pdfs", carpet), { recursive: true });
// });

// Para cada carpeta, cambiar la extensión de jpeg o .jpg
// carpets.forEach((carpet) => {
//   console.log(`Archivos en la carpeta: ${carpet}`);
//   const files = readdirSync(join(__dirname, "carpetas-de-archivos", carpet));
//   console.log(files);
//   const fileTypesToFilter = [".jpeg", ".jpg", ".png", ".HEIC"];
//   const onlyFilterFiles = files.filter((file) =>
//     fileTypesToFilter.some((fileType) => file.endsWith(fileType))
//   );

//   // A todos los archivos .jpeg, renombrar con el número de index + 1
//   onlyFilterFiles.forEach((file, index) => {
//     const newFileName = `${index + 1}.jpg`;
//     console.log(
//       `Renombrar archivo: ${carpet}/${file} a ${carpet}/${newFileName}`
//     );
//     renameSync(
//       join(__dirname, "carpetas-de-archivos", carpet, file),
//       join(__dirname, "carpetas-de-archivos", carpet, newFileName)
//     );
//   });
// });
