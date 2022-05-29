import Layout from "./components/layout/Layout";
import "./css/style.css";
import { AuthProvider } from "./context/AuthContext";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Holidaze</title>
        <meta
          name="description"
          content="Welcome to Holidaze, the place to find your next stay in Bergen. Find hotels, apartments, houses, cabins and hostels for every occasion."
        />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Layout />
    </AuthProvider>
  );
}
