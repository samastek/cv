// Health check endpoint for monitoring application status

export const dynamic = 'force-static';

export async function GET() {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };

  try {
    return Response.json(healthcheck, { status: 200 });
  } catch {
    healthcheck.message = 'Error';
    healthcheck.status = 'unhealthy';
    return Response.json(healthcheck, { status: 503 });
  }
}
