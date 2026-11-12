#!/usr/bin/env bash
# Servidor local para MobiRent Honduras
PORT=8888
cd "$(dirname "$0")" || exit 1
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "tu-ip-local")

echo "=========================================================="
echo "  🚀 MobiRent Honduras - Servidor Iniciado"
echo "=========================================================="
echo "  💻 En tu computadora abre:"
echo "     http://localhost:$PORT"
echo ""
echo "  📱 En tu celular (misma red Wi-Fi) abre:"
echo "     http://$IP:$PORT"
echo "=========================================================="
echo "  Presiona Ctrl + C para detener."
echo "=========================================================="

python3 -m http.server $PORT
