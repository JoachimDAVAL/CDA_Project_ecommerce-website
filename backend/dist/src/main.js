"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 Backend NestJS démarré');
    console.log(`📡 API disponible sur http://localhost:${port}`);
    console.log(`📊 Routes disponibles :`);
    console.log(`   - GET  http://localhost:${port}/models`);
    console.log(`   - GET  http://localhost:${port}/models/:id`);
    console.log(`   - GET  http://localhost:${port}/models/:id/stats`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}
bootstrap();
//# sourceMappingURL=main.js.map