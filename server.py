#!/usr/bin/env python3
"""
Jinglebot.com Local Development Server
Simple HTTP server to run the website locally for development and testing.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class JinglebotServer:
    def __init__(self, port=8080):
        self.port = port
        self.host = 'localhost'
        
    def start(self):
        """Start the development server"""
        try:
            # Change to the directory containing the website files
            web_dir = Path(__file__).parent
            os.chdir(web_dir)
            
            # Create server
            handler = http.server.SimpleHTTPRequestHandler
            
            # Custom handler to serve index.html by default
            class CustomHandler(handler):
                def do_GET(self):
                    if self.path == '/':
                        self.path = '/index.html'
                    elif self.path == '/server':
                        self.path = '/server.html'
                    return super().do_GET()
            
            with socketserver.TCPServer(("", self.port), CustomHandler) as httpd:
                print("🤖 Jinglebot.com Development Server")
                print("=" * 50)
                print(f"🌐 Server running at: http://{self.host}:{self.port}")
                print(f"📁 Serving files from: {web_dir}")
                print("=" * 50)
                print("📋 Available URLs:")
                print(f"   🏠 Main Website: http://{self.host}:{self.port}")
                print(f"   🔧 Server Info:  http://{self.host}:{self.port}/server")
                print("=" * 50)
                print("💡 Press Ctrl+C to stop the server")
                print("🚀 Opening website in your default browser...")
                
                # Auto-open browser
                try:
                    webbrowser.open(f'http://{self.host}:{self.port}')
                except:
                    print("⚠️  Could not open browser automatically")
                
                # Start server
                httpd.serve_forever()
                
        except KeyboardInterrupt:
            print("\n👋 Server stopped by user")
            sys.exit(0)
        except OSError as e:
            if e.errno == 48:  # Address already in use
                print(f"❌ Port {self.port} is already in use!")
                print(f"💡 Try a different port: python server.py --port 8081")
            else:
                print(f"❌ Error starting server: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            sys.exit(1)

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Jinglebot.com Development Server')
    parser.add_argument('--port', '-p', type=int, default=8080, 
                      help='Port to run the server on (default: 8080)')
    
    args = parser.parse_args()
    
    server = JinglebotServer(port=args.port)
    server.start()

if __name__ == '__main__':
    main()