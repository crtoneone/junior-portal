import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      name: 'JuniorPortal API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/api/auth/*',
        jobs: '/api/jobs',
        applications: '/api/applications',
        candidates: '/api/candidates',
        employers: '/api/employers',
        notifications: '/api/notifications',
        admin: '/api/admin',
      },
    };
  }
}
