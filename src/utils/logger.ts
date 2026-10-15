// src/utils/logger.ts
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message: message,
      ...meta,
    };
    console.log(JSON.stringify(logEntry));
  }
};