import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow specific methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allow specific headers
  });

  app.setGlobalPrefix('/api');
  
  const config = new DocumentBuilder()
    .setTitle('Doncarlo API')
    .setDescription('Doncarlo description')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT' 
      },
      'accessToken',
    ) 
    .addTag('users') // Optional - Add tags for grouping API endpoints
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document); // Setup Swagger path
  
  await app.listen(8080);
}

bootstrap();
