import ProtectedPage from "@/components/ProtectedPage";

const ProtectedRoute = () => {
  return (
    <div>
      {
        // The protected page component uses our useAuth hook to check if the user is authenticated
      }
      <ProtectedPage>
        <h1>Protected Route</h1>
      </ProtectedPage>
    </div>
  );
};

export default ProtectedRoute;
