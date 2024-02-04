import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.getbaseline.reminders',
  appName: 'daily-reminders',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
