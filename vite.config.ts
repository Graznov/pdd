import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // server: {
  //   // Это позволит клиентским маршрутам работать при обновлении страницы
  //   historyApiFallback: true
  // }
})
