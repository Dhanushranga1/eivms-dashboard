// components/VehicleTelemetryComponent.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Thermometer, Battery, Gauge } from 'lucide-react';

interface TelemetryData {
  vehicle_id: string;
  speed: number;
  rpm: number;
  coolant_temp: number;
  battery_voltage: number;
  gps_lat: number;
  gps_lng: number;
  timestamp?: string;
}

export default function VehicleTelemetryComponent() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws/telemetry');
    
    ws.onopen = () => {
      console.log('Connected to telemetry WebSocket');
      setConnectionStatus('connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Add timestamp if not present
        if (!data.timestamp) {
          data.timestamp = new Date().toISOString();
        }
        setTelemetry(data);
        console.log('Received telemetry:', data);
      } catch (error) {
        console.error('Error parsing telemetry data:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('Disconnected from telemetry WebSocket');
      setConnectionStatus('disconnected');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('disconnected');
    };
    
    setWebsocket(ws);
    
    // Cleanup on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // If we don't have telemetry data yet
  if (!telemetry) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-900">Live Vehicle Telemetry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">
              {connectionStatus === 'connecting' && 'Connecting to vehicle...'}
              {connectionStatus === 'connected' && 'Waiting for telemetry data...'}
              {connectionStatus === 'disconnected' && 'Disconnected from telemetry server'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-blue-900 flex justify-between items-center">
          <span>Live Vehicle Telemetry: {telemetry.vehicle_id}</span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Live
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Speed */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <Gauge className="text-blue-600 mr-2" size={18} />
              <h4 className="font-medium text-blue-800">Speed</h4>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-blue-900">{telemetry.speed.toFixed(1)}</p>
              <p className="ml-1 text-blue-700">km/h</p>
            </div>
          </div>
          
          {/* RPM */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <Activity className="text-purple-600 mr-2" size={18} />
              <h4 className="font-medium text-purple-800">RPM</h4>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-purple-900">{telemetry.rpm}</p>
              <p className="ml-1 text-purple-700">rpm</p>
            </div>
          </div>
          
          {/* Temperature */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <Thermometer className="text-red-600 mr-2" size={18} />
              <h4 className="font-medium text-red-800">Coolant</h4>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-red-900">{telemetry.coolant_temp.toFixed(1)}</p>
              <p className="ml-1 text-red-700">°C</p>
            </div>
          </div>
          
          {/* Battery */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Battery className="text-green-600 mr-2" size={18} />
              <h4 className="font-medium text-green-800">Battery</h4>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-green-900">{telemetry.battery_voltage.toFixed(1)}</p>
              <p className="ml-1 text-green-700">V</p>
            </div>
          </div>
        </div>
        
        {/* Last update time */}
        <div className="text-right text-xs text-gray-500">
          Last updated: {new Date(telemetry.timestamp || '').toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}