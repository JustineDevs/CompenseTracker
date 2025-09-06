/**
 * Monitoring and Error Tracking Service
 * Integrates with Sentry for production error tracking
 */

interface ErrorContext {
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
  tags?: Record<string, string>;
}

class MonitoringService {
  private isInitialized = false;
  private sentry: any = null;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if (typeof window === 'undefined') return; // Server-side rendering

    try {
      // Dynamically import Sentry only on client side
      const Sentry = await import('@sentry/nextjs');
      
      if (process.env.NODE_ENV === 'production') {
        Sentry.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          environment: process.env.NODE_ENV,
          tracesSampleRate: 0.1,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
          integrations: [
            new Sentry.Replay({
              maskAllText: false,
              blockAllMedia: false,
            }),
          ],
        });

        this.sentry = Sentry;
        this.isInitialized = true;
      }
    } catch (error) {
      console.warn('Failed to initialize Sentry:', error);
    }
  }

  /**
   * Capture an exception/error
   */
  captureException(error: Error, context?: ErrorContext) {
    if (this.sentry && this.isInitialized) {
      this.sentry.captureException(error, {
        tags: {
          component: context?.component || 'unknown',
          action: context?.action || 'unknown',
        },
        user: {
          id: context?.userId,
        },
        extra: context?.metadata,
      });
    }
  }

  /**
   * Capture a message
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    if (this.sentry && this.isInitialized) {
      this.sentry.captureMessage(message, level, {
        tags: {
          component: context?.component || 'unknown',
          action: context?.action || 'unknown',
        },
        user: {
          id: context?.userId,
        },
        extra: context?.metadata,
      });
    }
  }

  /**
   * Set user context for error tracking
   */
  setUser(userId: string, email?: string, username?: string) {
    if (this.sentry && this.isInitialized) {
      this.sentry.setUser({
        id: userId,
        email,
        username,
      });
    }
  }

  /**
   * Clear user context
   */
  clearUser() {
    if (this.sentry && this.isInitialized) {
      this.sentry.setUser(null);
    }
  }

  /**
   * Add breadcrumb for debugging
   */
  addBreadcrumb(message: string, category: string, level: 'info' | 'warning' | 'error' = 'info', data?: any) {
    if (this.sentry && this.isInitialized) {
      this.sentry.addBreadcrumb({
        message,
        category,
        level,
        data,
        timestamp: Date.now() / 1000,
      });
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: PerformanceMetric) {
    if (this.sentry && this.isInitialized) {
      this.sentry.addBreadcrumb({
        message: `Performance: ${metric.name}`,
        category: 'performance',
        level: 'info',
        data: {
          value: metric.value,
          unit: metric.unit,
          tags: metric.tags,
        },
        timestamp: Date.now() / 1000,
      });
    }
  }

  /**
   * Track user actions
   */
  trackAction(action: string, component: string, metadata?: Record<string, any>) {
    this.addBreadcrumb(`User action: ${action}`, 'user-action', 'info', {
      action,
      component,
      ...metadata,
    });
  }

  /**
   * Track API calls
   */
  trackApiCall(endpoint: string, method: string, statusCode: number, duration: number, error?: Error) {
    const level = statusCode >= 400 ? 'error' : 'info';
    
    this.addBreadcrumb(`API ${method} ${endpoint}`, 'api-call', level, {
      endpoint,
      method,
      statusCode,
      duration,
      error: error?.message,
    });

    this.trackPerformance({
      name: `api.${endpoint.replace(/\//g, '.')}`,
      value: duration,
      unit: 'ms',
      tags: {
        method,
        status: statusCode.toString(),
      },
    });
  }

  /**
   * Track compensation calculations
   */
  trackCalculation(input: any, breakdown: any, duration: number, error?: Error) {
    this.trackAction('compensation_calculation', 'calculator', {
      inputKeys: Object.keys(input),
      hasPersonalDetails: !!input.personalDetails,
      grossPay: breakdown?.grossPay,
      trueCostToCompany: breakdown?.trueCostToCompany,
      duration,
      error: error?.message,
    });

    this.trackPerformance({
      name: 'compensation.calculation',
      value: duration,
      unit: 'ms',
      tags: {
        hasPersonalDetails: input.personalDetails ? 'true' : 'false',
        success: error ? 'false' : 'true',
      },
    });
  }

  /**
   * Track AI email generation
   */
  trackEmailGeneration(templateType: string, duration: number, success: boolean, error?: Error) {
    this.trackAction('email_generation', 'email-generator', {
      templateType,
      duration,
      success,
      error: error?.message,
    });

    this.trackPerformance({
      name: 'ai.email_generation',
      value: duration,
      unit: 'ms',
      tags: {
        templateType,
        success: success.toString(),
      },
    });
  }

  /**
   * Track page views
   */
  trackPageView(page: string, metadata?: Record<string, any>) {
    this.trackAction('page_view', 'navigation', {
      page,
      ...metadata,
    });
  }

  /**
   * Get current session ID
   */
  getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
}

// Export singleton instance
export const monitoring = new MonitoringService();

// Export types
export type { ErrorContext, PerformanceMetric };
