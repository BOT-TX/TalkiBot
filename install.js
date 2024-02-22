const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Ingresa el token de acceso a Telegram: ', (telegramToken) => {
    rl.question('Ingresa el lenguaje del bot: ', (botLanguage) => {
        rl.question('Ingresa la URL de la base de datos: ', (databaseUrl) => {
            rl.close();
            const config = {
                token: telegramToken,
                language: botLanguage,
                mongodb: databaseUrl
            };
            fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
            process.env.token = telegramToken;
            process.env.language = botLanguage;
            process.env.mongodb = databaseUrl;
            exec('npm install', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al instalar dependencias: ${error}`);
                    return;
                }
                console.log(`Dependencias instaladas exitosamente: ${stdout}`);
                exec('npm run start', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error al ejecutar npm start: ${error}`);
                        return;
                    }
                    console.log(`npm start ejecutado exitosamente: ${stdout}`);
                    console.log('El paquete se ha instalado correctamente.');
                });
            });
        });
    });
});