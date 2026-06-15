import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import type { ReactNode } from "react";

interface Props {

  children: ReactNode;

  role?: "Buyer" | "Seller";

}

const ProtectedRoute = ({

  children,

  role,

}: Props) => {

  const {

    isAuthenticated,

    loading,

    user,

  } = useAuth();

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  // Not logged in

  if (!isAuthenticated) {

    return (

      <Navigate

        to="/login"

        replace

      />

    );

  }

  // Role mismatch

  if (

    role &&

    user?.role !== role

  ) {

    return (

      <Navigate

        to="/"

        replace

      />

    );

  }

  return <>{children}</>;

};

export default ProtectedRoute;