import Layout from "./components/layout/Layout";
import './scss/style.scss';
import { AuthProvider } from "./context/AuthContext";

export default function App() {
 return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
 );
}
